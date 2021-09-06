import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"
import Providers from "next-auth/providers"
import client from "../../../lib/apolloClient"
import queries from "../../../lib/queries"

interface UserLoginData {
  provider: string,
  id: number | string,
  email: string,
  password: string
}

type JWTUserLoginData = { login: UserLoginData } & JWT

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.CLIENT_ID_GITHUB,
      clientSecret: process.env.CLIENT_SECRET_GITHUB
    })
  ],
  callbacks: {
    async signIn(user, account) {
      const provider = account.provider || "custom"
      user.login = {
        provider,
        id: account.id,
        email: user.email,
        password: "ah"
      }
      return true
    },
    redirect(_, baseUrl) {
      return baseUrl + "/profile"
    },
    async jwt(token: JWTUserLoginData, user) {
      if (user?.login) token.login = user?.login as UserLoginData
      return token
    },
    async session(session, userToken: JWTUserLoginData) {
      //Here I should get the actual user
      const userData = userToken.login
      console.log(userData)
      let user
      if (userData.provider !== "custom") {
        user = await client.mutate({
          mutation: queries.registerProvider, variables: {
            createUserProvidersEmail: userData.email ?? "", //Prevent NULL accident
            createUserProvidersProvider: userData.provider,
            createUserProvidersId: userData.id
          }
        })
      } else {
        // Aca iría el método personalizado
      }
      session.data = user?.data?.createUserProviders
      return session
    }
  }
})

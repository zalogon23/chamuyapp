import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"
import Providers from "next-auth/providers"
import client from "../../../lib/apolloClient"
import queries from "../../../lib/queries"

interface User {
  id: number,
  email: string,
  password: string,
  provider: "github" | "facebook" | "custom"
}

type JWTUser = JWT & { login: User }

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
    async jwt(token: JWT, user: JWTUser) {
      if (!token.id && user?.login) {
        const userData = user.login
        if (userData.provider !== "custom") {
          console.log("This is the used data on query: ", userData)
          //This is only with providers
          const createdUser = await client.mutate({
            mutation: queries.registerProvider,
            variables: {
              createUserProvidersEmail: userData.email || "",
              createUserProvidersId: userData.id,
              createUserProvidersProvider: userData.provider
            }
          })
          const id = createdUser?.data?.createUserProviders?.id || null
          if (id !== null) token.id = id
        } else {
          //This is the custom sign in process
        }
      }
      return token
    },
    async session(session, token: JWT) {
      //get user by id
      return session
    }
  }
})

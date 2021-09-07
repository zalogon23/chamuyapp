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
          //This is only with providers
          const signedUser = await client.mutate({
            mutation: queries.signInProvider,
            variables: {
              createUserProvidersEmail: userData.email || "",
              createUserProvidersId: userData.id,
              createUserProvidersProvider: userData.provider
            }
          })
          const id = signedUser?.data?.createUserProviders?.id || null
          if (id !== null) token.id = id
        } else {
          //This is the custom sign in process
        }
      }
      return token
    },
    async session(session, token: JWT) {
      if (token.id) session.data = await getUserByID(token.id as number)
      console.log("This is the receivde session by client!: ", session)
      return session

      async function getUserByID(id: number) {
        const user = await client.query({ query: queries.getUserByID, variables: { getUserByIdId: id } })
        if (!user) return ({ error: "There's no user with that ID" })
        const data = user?.data?.getUserByID
        return data
      }
    }
  }
})

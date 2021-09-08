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
    }),
    Providers.Credentials({
      name: "custom",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials, req) {
        return ({
          email: credentials.email,
          password: credentials.password,
          provider: "custom"
        })
      }
    })
  ],
  callbacks: {
    async signIn(user, account) {
      console.log("The received account from Sign In: ", account)
      console.log("The received user from Sign In: ", user)
      const provider = account.provider || user.provider
      user.login = {
        provider,
        id: account.id,
        email: user.email,
        password: user.password
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
          //Providers login
          const signedUser = await client.mutate({
            mutation: queries.loginProvider,
            variables: {
              getUserProvidersId: userData.id,
              getUserProvidersProvider: userData.provider
            }
          })
          const id = signedUser?.data?.getUserProviders?.id || null
          if (id !== null) token.id = id
        } else {
          //Custom login
          const signedUser = await client.query({
            query: queries.login,
            variables: {
              getUserByLoginEmail: user.email,
              getUserByLoginPassword: user.password
            }
          })
          const id = signedUser?.data?.getUserByLogin?.id || null
          if (id !== null) token.id = id
        }
      }
      return token
    },
    async session(session, token: JWT) {
      if (token.id) session.user = await getUserByID(token.id as number)
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

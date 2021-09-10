import { Session } from "next-auth";
import { useSession } from "next-auth/client";
import { createContext, ReactElement } from "react";
import { User } from "../components/Card";

interface Props {
  children: ReactElement | ReactElement[]
}

interface UserContext {
  session: Session | null,
  user: User & { images: string } | undefined,
  isLoggedOut: boolean,
  isLoggedIn: boolean
}

const userContext = createContext({} as UserContext)

export default function UserProvider({ children }: Props) {
  const [session] = useSession()
  const user = session?.user as User & { images: string } | undefined
  const isLoggedOut = session === null
  const isLoggedIn = session !== undefined && session !== null && !!user
  return (
    <userContext.Provider value={{ session, user, isLoggedIn, isLoggedOut }}>
      {children}
    </userContext.Provider>
  )
}
export { userContext }
import { Session } from "next-auth";
import { useSession } from "next-auth/client";
import { createContext, Dispatch, ReactElement, SetStateAction, useEffect, useState } from "react";

interface Props {
  children: ReactElement | ReactElement[]
}

interface AppUser {
  id: number,
  description: string,
  name: string,
  images: string,
  [props: string]: any
}

interface UserContext {
  session: Session | null,
  user: AppUser,
  isLoggedOut: boolean,
  isLoggedIn: boolean,
  setUser: Dispatch<SetStateAction<AppUser>>
}

const userContext = createContext({} as UserContext)

export default function UserProvider({ children }: Props) {
  const [session] = useSession()
  const [user, setUser] = useState(session?.user as AppUser)
  const isLoggedOut = session === null
  const isLoggedIn = session !== undefined && session !== null && !!user
  useEffect(() => {
    setUser(session?.user as AppUser)
  }, [session])
  return (
    <userContext.Provider value={{ session, user, isLoggedIn, isLoggedOut, setUser }}>
      {children}
    </userContext.Provider>
  )
}
export { userContext }
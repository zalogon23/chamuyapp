import { Session } from "next-auth";
import { useSession } from "next-auth/client";
import { createContext, Dispatch, ReactElement, SetStateAction, useEffect, useState } from "react";

interface Props {
  children: ReactElement | ReactElement[]
}

interface AppUser {
  id: number,
  description: string,
  age: number,
  name: string,
  images: string,
  x: number,
  y: number,
  minAgePreference: number,
  maxAgePreference: number,
  genderPreference: string,
  maxDistancePreference: number
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
  const [isLoggedOut, setIsLoggedOut] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {
    if (session?.user) {
      setUser(session.user as AppUser)
      setIsLoggedIn(true)
      setIsLoggedOut(false)
    }
    if (session === null) {
      setIsLoggedOut(true)
      setIsLoggedIn(false)
    }
  }, [session])
  return (
    <userContext.Provider value={{ session, user, isLoggedIn, isLoggedOut, setUser }}>
      {children}
    </userContext.Provider>
  )
}
export { userContext }
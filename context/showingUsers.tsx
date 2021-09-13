import { createContext, ReactElement, useContext, useEffect, useState } from "react";
import { User } from "../components/Card";
import client from "../lib/apolloClient";
import queries from "../lib/queries";
import { userContext } from "./user";


interface Props {
  children: ReactElement | ReactElement[]
}

interface Context {
  users: User[],
  currentUser: number,
  loading: boolean,
  like: { (): void },
  dislike: { (): void },
}

const showingUsersContext = createContext({} as Context)

export function ShowingUsersProvider({ children }: Props) {
  const { isLoggedIn, user } = useContext(userContext)
  const [currentUser, setCurrentUser] = useState(0)
  const loading = false
  const [users, setUsers] = useState([])
  useEffect(() => {
    console.log(user)
    if (!isLoggedIn || !user.id) return
    (async function () {
      const showingUsers = (await client.query({
        query: queries.getShowingUsers, variables: {
          getShowingUsersUserId: user.id
        }
      }))?.data?.getShowingUsers
      setUsers(showingUsers.map((user: User & { images: string }) => ({ ...user, images: JSON.parse(user.images) })))
    })()
  }, [isLoggedIn, user])
  return (
    <showingUsersContext.Provider value={{
      users,
      loading,
      currentUser,
      like,
      dislike
    }}>
      {children}
    </showingUsersContext.Provider>
  )

  function like(): void {
    console.log("You like this guy (talking with server...): ", users[currentUser])
    if (currentUser === users.length - 1) {
      console.log("Now it should fetch more users")
      //Fetches
      setCurrentUser(0)
    } else {
      setCurrentUser(currentUser + 1)
    }
  }

  function dislike(): void {
    console.log("You DISlike this guy (talking with server...): ", users[currentUser])
    if (currentUser === users.length - 1) {
      console.log("Now it should fetch more users")
      //Fetches
      setCurrentUser(0)
    } else {
      setCurrentUser(currentUser + 1)
    }
  }
}

export { showingUsersContext }
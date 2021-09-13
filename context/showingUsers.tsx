import { move } from "formik";
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
  const [users, setUsers] = useState([] as User[])
  useEffect(() => {
    console.log(user)
    if (!isLoggedIn || !user.id) return
    (async function () {
      const showingUsers = (await client.query({
        query: queries.getShowingUsers, variables: {
          getShowingUsersUserId: user.id
        }
      }))?.data?.getShowingUsers as User[]
      setUsers(showingUsers)
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

  async function like() {
    if (!user.id) return
    const showingUser = users[currentUser]
    const match = (await vote(true))?.data?.voteUser
    console.log("There was a match: ", match)
    move()
  }

  async function dislike() {
    if (!user.id) return
    const showingUser = users[currentUser]
    await vote(false)
    move()
  }

  function move() {
    if (currentUser === users.length - 1) {
      console.log("Now it should fetch more users")
      //Fetches
      setCurrentUser(0)
    } else {
      setCurrentUser(currentUser + 1)
    }
  }

  function vote(liked: boolean) {
    return client.mutate({
      mutation: queries.voteUser, variables: {
        voteUserLiked: liked,
        voteUserVotedId: users[currentUser],
        voteUserVoterId: user.id
      }
    })
  }
}

export { showingUsersContext }
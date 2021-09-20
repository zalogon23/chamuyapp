import { move } from "formik";
import { createContext, Dispatch, ReactElement, SetStateAction, useContext, useEffect, useState } from "react";
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
  searchUsers: { (): Promise<boolean> },
  match: boolean,
  setMatch: Dispatch<SetStateAction<boolean>>
}

const showingUsersContext = createContext({} as Context)

export function ShowingUsersProvider({ children }: Props) {
  const [match, setMatch] = useState(false)
  const { isLoggedIn, user } = useContext(userContext)
  const [currentUser, setCurrentUser] = useState(0)
  const loading = false
  const [voted, setVoted] = useState([] as number[])
  const [users, setUsers] = useState([] as User[])
  useEffect(() => {
    if (!isLoggedIn || !user?.id) {
      if (users.length) setUsers([])
      return
    }
    searchUsers()
  }, [user?.id])
  return (
    <showingUsersContext.Provider value={{
      setMatch,
      match,
      searchUsers,
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
    if (!user.id || voted.includes(users[currentUser].id)) return
    const showingUser = users[currentUser]
    const match = (await vote(true))?.data?.voteUser || false
    if (match) setMatch(true)
    await move()
  }

  async function dislike() {
    if (!user.id || voted.includes(users[currentUser].id)) return
    const showingUser = users[currentUser]
    await vote(false)
    await move()
  }

  async function move() {
    if (currentUser === users.length - 1) {
      const receivedMore = await searchUsers()
      setCurrentUser(0)
    } else {
      setCurrentUser(currentUser + 1)
    }
  }

  function vote(liked: boolean) {
    setVoted([...voted, users[currentUser].id])
    return client.mutate({
      mutation: queries.voteUser, variables: {
        voteUserLiked: liked,
        voteUserVotedId: users[currentUser].id,
        voteUserVoterId: user.id
      }
    })
  }

  async function searchUsers() {
    const showingUsers = (await client.query({
      query: queries.getShowingUsers, variables: {
        getShowingUsersUserId: user.id
      }
    }))?.data?.getShowingUsers as User[]
    setUsers(showingUsers)
    if (showingUsers.length) return true
    return false
  }
}

export { showingUsersContext }
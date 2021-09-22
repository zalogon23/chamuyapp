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
  match: false | User,
  setMatch: Dispatch<SetStateAction<false | User>>
}

const showingUsersContext = createContext({} as Context)

export function ShowingUsersProvider({ children }: Props) {
  const [match, setMatch] = useState(false as false | User)
  const { isLoggedIn, isLoggedOut, user } = useContext(userContext)
  const [currentUser, setCurrentUser] = useState(0)
  const [loading, setLoading] = useState(true)
  const [voted, setVoted] = useState([] as number[])
  const [users, setUsers] = useState([] as User[])
  useEffect(() => {
    if (!isLoggedIn || !user?.id) {
      if (users.length) setUsers([])
      return
    }
    searchUsers()
  }, [user?.id])
  useEffect(() => {
    if (isLoggedOut) {
      setLoading(false)
    }
  }, [isLoggedOut])

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
    const id = currentUser
    const showingUser = users[id]
    const match = (await vote(true))?.data?.voteUser || false
    if (match) setMatch(showingUser)
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
    setLoading(true)
    const showingUsers = ((await client.query({
      query: queries.getShowingUsers, variables: {
        getShowingUsersUserId: user.id
      }
    }))?.data?.getShowingUsers || []) as User[]
    setUsers(showingUsers)
    setLoading(false)
    if (showingUsers.length) return true
    return false
  }
}

export { showingUsersContext }
import { createContext, Dispatch, ReactElement, SetStateAction, useContext, useEffect, useState } from "react";
import client from "../lib/apolloClient";
import queries from "../lib/queries";
import { Match } from "../pages/messages";
import { userContext } from "./user";

interface Context {
  matchesMessages: Match[],
  setMatchesMessages: Dispatch<SetStateAction<Match[]>>,
  loading: boolean,
  refetchMessages: () => Promise<void>
}

const messagesContext = createContext({} as Context)

interface Props {
  children: ReactElement | ReactElement[]
}

export default function MessagesProvider({ children }: Props) {
  const { user, isLoggedIn, isLoggedOut } = useContext(userContext)
  const [loading, setLoading] = useState(true)
  const [matchesMessages, setMatchesMessages] = useState([] as Match[])

  useEffect(() => {
    if (isLoggedIn && user) {
      (async () => {
        await fetchMessages()
        setLoading(false)
      })()
    }
    if (isLoggedOut) {
      setLoading(false)
      setMatchesMessages([])
    }
  }, [isLoggedIn, isLoggedOut, user?.id])
  return (
    <messagesContext.Provider value={{ matchesMessages, refetchMessages: fetchMessages, setMatchesMessages, loading }}>
      {children}
    </messagesContext.Provider>
  )

  async function fetchMessages() {
    setLoading(true)
    const matchesGraphQL = (await client.query({
      query: queries.getMatches, variables: {
        getMatchesUserId: user.id
      }
    }))?.data?.getMatches as Match[] | undefined
    if (Array.isArray(matchesGraphQL)) {
      setMatchesMessages(matchesGraphQL)
    }
    setLoading(false)
  }
}

export { messagesContext }
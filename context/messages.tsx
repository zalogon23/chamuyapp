import { createContext, Dispatch, ReactElement, SetStateAction, useContext, useEffect, useState } from "react";
import client from "../lib/apolloClient";
import queries from "../lib/queries";
import { Match } from "../pages/messages";
import { userContext } from "./user";

interface Context {
  matchesMessages: Match[],
  setMatchesMessages: Dispatch<SetStateAction<Match[]>>,
  loading: boolean,
  refetchMessages: () => Promise<void>,
  notification: boolean
}

const messagesContext = createContext({} as Context)

interface Props {
  children: ReactElement | ReactElement[]
}

export default function MessagesProvider({ children }: Props) {
  const { user, isLoggedIn, isLoggedOut } = useContext(userContext)
  const [loading, setLoading] = useState(true)
  const [matchesMessages, setMatchesMessages] = useState([] as Match[])
  const [notification, setNotification] = useState(false)

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
  useEffect(() => {
    const notification = matchesMessages.find(match => somethingNew(match))
    if (notification) {
      setNotification(true)
    } else {
      setNotification(false)
    }
  }, [matchesMessages])
  return (
    <messagesContext.Provider value={{ notification, matchesMessages, refetchMessages: fetchMessages, setMatchesMessages, loading }}>
      {children}
    </messagesContext.Provider>
  )

  function somethingNew(match: Match) {
    if (!match.seen) return true
    if (JSON.parse(match.content)[0] === undefined) return false
    if (JSON.parse(match.content)[0].senderID === user.id) {
      return false
    } else if (!JSON.parse(match.content)[0].seen) {
      return true
    }
    return false
  }

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
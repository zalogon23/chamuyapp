import { createContext, Dispatch, ReactElement, SetStateAction, useContext, useEffect, useState } from "react";
import client from "../lib/apolloClient";
import queries from "../lib/queries";
import { Match } from "../pages/messages";
import { userContext } from "./user";

interface Context {
  matchesMessages: Match[],
  matchesNoMessages: Match[],
  setMatchesMessages: Dispatch<SetStateAction<Match[]>>,
  loading: boolean
}

const messagesContext = createContext({} as Context)

interface Props {
  children: ReactElement | ReactElement[]
}

export default function MessagesProvider({ children }: Props) {
  const { user, isLoggedIn, isLoggedOut } = useContext(userContext)
  const [loading, setLoading] = useState(true)
  const [matchesMessages, setMatchesMessages] = useState([] as Match[])
  const [matchesNoMessages, setMatchesNoMessages] = useState([] as Match[])

  useEffect(() => {
    if (isLoggedIn && user) {
      (async () => {
        const matchesGraphQL = (await client.query({
          query: queries.getMatches, variables: {
            getMatchesUserId: user.id
          }
        }))?.data?.getMatches as Match[] | undefined
        if (Array.isArray(matchesGraphQL)) {
          setMatchesNoMessages(matchesGraphQL.filter(match => JSON.parse(match.content).length < 1))
          setMatchesMessages(matchesGraphQL.filter(match => JSON.parse(match.content).length > 0))
        }
        setLoading(false)
      })()
    }
    if (isLoggedOut) {
      setLoading(false)
    }
  }, [isLoggedIn, isLoggedOut, user?.id])
  return (
    <messagesContext.Provider value={{ matchesMessages, matchesNoMessages, setMatchesMessages, loading }}>
      {children}
    </messagesContext.Provider>
  )
}

export { messagesContext }
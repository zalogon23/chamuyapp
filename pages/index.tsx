import type { NextPage } from 'next'
import Router from "next/router"
import { useContext, useEffect } from "react"
import MatchModal from "../components/MatchModal"
import CardsSlider from '../components/CardsSlider'
import { showingUsersContext } from "../context/showingUsers"
import { messagesContext } from '../context/messages'

const Home: NextPage = () => {
  const { match, setMatch } = useContext(showingUsersContext)
  const { refetchMessages } = useContext(messagesContext)
  useEffect(() => {
    if (match) {
      refetchMessages()
    }
  }, [match])
  return (
    <>
      <MatchModal
        open={Boolean(match)}
        name={match ? match.name : undefined}
        redirect={async () => {
          if (!match) return
          await Router.push(`/messages`)
          setMatch(false)
        }}
        reject={() => {
          setMatch(false)
        }}
        image={match ? JSON.parse(match.images)[0] : undefined} />
      <CardsSlider />
    </>
  )
}

export default Home

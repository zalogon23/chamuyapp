import type { NextPage } from 'next'
import Router from "next/router"
import { useContext } from "react"
import MatchModal from "../components/MatchModal"
import CardsSlider from '../components/CardsSlider'
import { showingUsersContext } from "../context/showingUsers"

const Home: NextPage = () => {
  const { match, setMatch } = useContext(showingUsersContext)
  return (
    <>
      <MatchModal
        open={Boolean(match)}
        name={match ? match.name : undefined}
        redirect={async () => {
          if (!match) return
          await Router.push(`/messages/${match.id}`)
          setMatch(false)
        }}
        reject={() => {
          setMatch(false)
          console.log(match)
        }}
        image={match ? JSON.parse(match.images)[0] : undefined} />
      <CardsSlider />
    </>
  )
}

export default Home

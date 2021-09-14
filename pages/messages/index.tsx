import { NextPage } from "next"
import { userContext } from "../../context/user"
import { ReactElement, useContext, useEffect, useState } from "react"
import Loading from "../../components/Loading"
import Router from "next/router"
import client from "../../lib/apolloClient"
import queries from "../../lib/queries"
import { User } from "../../components/Card"
import { Image } from "@chakra-ui/image"
import { Box, HStack } from "@chakra-ui/layout"
import { IconButton } from "@chakra-ui/button"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons"

const Messages: NextPage = () => {
  const { isLoggedIn, isLoggedOut, user } = useContext(userContext)
  const [matches, setMatches] = useState([] as User[])
  useEffect(() => {
    if (isLoggedOut) Router.replace("/login")
  }, [isLoggedOut])
  useEffect(() => {
    if (isLoggedIn && user) {
      (async () => {
        const matchesGraphQL = (await client.query({
          query: queries.getMatches, variables: {
            getMatchesUserId: user.id
          }
        }))?.data?.getMatches as User[] | undefined
        if (Array.isArray(matchesGraphQL)) setMatches(matchesGraphQL)
      })()
    }
  }, [isLoggedIn, user?.id])
  return (
    <>
      {
        isLoggedIn && matches[0]?.id ?
          <BubbleCarrousel>
            {
              matches.map(() => <MatchBubble user={matches[0]} />)
            }
          </BubbleCarrousel>
          :
          <Loading />
      }
    </>
  )
}

function MatchBubble({ user }: { user: User }): ReactElement {
  return (
    <>
      <Link href={`/messages/${user.id}`} passHref>
        <IconButton rounded="full" w="5rem" h="5rem" aria-label={`Ir al chat con ${user.name}`}>
          <Image rounded="full" w="5rem" h="5rem" fit="cover" src={JSON.parse(user.images)[0]} fallback={<Box rounded="full" w="5rem" h="5rem" bg="black" />} />
        </IconButton>
      </Link>

    </>
  )
}

function BubbleCarrousel({ children }: { children: ReactElement | ReactElement[] }) {
  const quantity = Array.isArray(children) ? children.length : 1
  const spacing = 1.2
  const bubbleW = 5
  const visibleBubbles = 3
  const px = 1.5
  const length = (quantity * bubbleW) + ((quantity - 1) * spacing) + 2 * px
  const slideWidth = length / quantity
  const [current, setCurrent] = useState(0)
  console.log(quantity)
  return (
    <Box w="100%" overflow="hidden" borderBottom="1px solid" borderBottomColor="gray.300" pos="relative">
      <IconButton rounded="full" pos="absolute" zIndex="dropdown" top="50%" transform="translateY(-50%)" left="0.5rem"
        onClick={() => { if (current > 0) setCurrent(current - 1) }}
        aria-label="Deslizar hacia la izquierda">
        <FontAwesomeIcon icon={faArrowLeft} />
      </IconButton>
      <IconButton rounded="full" pos="absolute" zIndex="dropdown" top="50%" transform="translateY(-50%)" right="0.5rem"
        onClick={() => { if (current < quantity - visibleBubbles) setCurrent(current + 1) }}
        aria-label="Deslizar hacia la derecha">
        <FontAwesomeIcon icon={faArrowRight} />
      </IconButton>
      <HStack transitionDuration="200ms" transform={`translateX(-${slideWidth * current}rem)`} w={`${length}rem`}
        spacing={`${spacing}rem`} px={`${px}rem`} py="3">
        {children}
      </HStack>
    </Box>
  )
}

export default Messages
import { NextPage } from "next"
import { userContext } from "../../context/user"
import { ReactElement, useContext, useEffect, useState } from "react"
import Loading from "../../components/Loading"
import Router from "next/router"
import client from "../../lib/apolloClient"
import queries from "../../lib/queries"
import { User } from "../../components/Card"
import { Image } from "@chakra-ui/image"
import { Box, HStack, Stack } from "@chakra-ui/layout"
import { IconButton } from "@chakra-ui/button"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { Avatar } from "@chakra-ui/avatar"
import Text from "../../components/Text"
import { Link as ChakraLink } from "@chakra-ui/react"
import { messagesContext } from "../../context/messages"
import Heading from "../../components/Heading"
import NoMessages from "../../components/NoMessages"
import SEOHead from "../../components/SEOHead"

export interface Match extends User {
  content: string,
  anotherID: number
}

const Messages: NextPage = () => {
  const { isLoggedIn, isLoggedOut } = useContext(userContext)
  const { matchesMessages, loading } = useContext(messagesContext)
  useEffect(() => {
    if (isLoggedOut) Router.replace("/login")
  }, [isLoggedOut])
  return (
    <>
      <SEOHead
        title="Tus Conversaciones"
        keywords="ligar chamuyar conversar mensajes romance choque y fuga pareja sexo casual amor conocer hobbies gustos"
        description="Revisa tus mensajes y fomenta el interés de tus nuevas amistades."
      />
      {
        loading ?
          <Loading />
          :
          isLoggedIn && (matchesMessages?.length)
            ?
            <>
              <BubbleCarrousel>
                {
                  matchesMessages.filter(match => JSON.parse(match.content).length < 1).map((match, id) => <MatchBubble key={id} user={match} />)
                }
              </BubbleCarrousel>
              <MessagesDisplay messages={matchesMessages.filter(match => JSON.parse(match.content).length > 0)} />
            </>
            :
            <NoMessages />
      }
    </>
  )
}

function MessagesDisplay({ messages }: { messages: Match[] }) {
  return (
    <Stack px="4">
      {
        messages.map((mes, id) => (
          <Link key={id} href={`/messages/${mes.id}`} passHref>
            <ChakraLink _hover={{ textDecoration: "none", filter: "brightness(90%)" }} aria-label={`Ir a la conversacion con ${mes.name}`}>
              <Box display="flex" alignItems="center">
                <Avatar alt="" src={JSON.parse(mes.images)[0]} mr="1rem" />
                <Stack spacing="0">
                  <Heading>{mes.name}</Heading>
                  <Text>{JSON.parse(mes.content)[0].content}</Text>
                </Stack>
              </Box>
            </ChakraLink>
          </Link>
        ))
      }
    </Stack>
  )
}

function MatchBubble({ user }: { user: User }): ReactElement {
  return (
    <>
      <Link href={`/messages/${user.id}`} passHref>
        <IconButton rounded="full" w="5rem" h="5rem" aria-label={`Ir a la conversacion con ${user.name}`}>
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
      <HStack h={`${bubbleW + px}rem`} transitionDuration="200ms" transform={`translateX(-${slideWidth * current}rem)`} w={`${length}rem`}
        spacing={`${spacing}rem`} p={`${px}rem`}>
        {children}
      </HStack>
    </Box>
  )
}

export default Messages
import { Badge, Container, HStack } from "@chakra-ui/layout";
import { faEnvelope, faMailBulk, faMars, faVenus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import { User } from "../../components/Card";
import Heading from "../../components/Heading";
import ImagesSlider from "../../components/ImagesSlider";
import Loading from "../../components/Loading";
import SEOHead from "../../components/SEOHead";
import Text from "../../components/Text";
import { messagesContext } from "../../context/messages";
import client from "../../lib/apolloClient";
import queries from "../../lib/queries";
import { fontSize } from "../../lib/styles";
import Link from "next/link"
import { Button, IconButton } from "@chakra-ui/button";
import { userContext } from "../../context/user";
import Router from "next/router";

const UserID: NextPage = () => {
  const [userID, setUserID] = useState(undefined as undefined | number)
  const [userVisited, setUserVisited] = useState({} as User)
  const { matchesMessages } = useContext(messagesContext)
  const { user, isLoggedOut } = useContext(userContext)
  const [isMatch, setIsMatch] = useState(false)
  const [loading, setLoading] = useState(true)
  const [chatID, setChatID] = useState(undefined as undefined | number)
  useEffect(() => {
    const pathname = window?.location?.pathname
    const id = Number(pathname.slice(pathname.indexOf("/", 1) + 1)) || undefined
    if (id) {
      setUserID(id)
    }
  }, [])
  useEffect(() => {
    if (userID && user?.id && userID === user.id) {
      Router.replace("/profile")
    }
    (async () => {
      if (isLoggedOut || (user?.id && userID !== user.id)) {
        if (!userID) return
        const data = (await client.query({ query: queries.getUserByID, variables: { getUserByIdId: userID } }))
        if (!data) return ({ error: "There's no user with that ID" })
        const userVisitedResult = data?.data?.getUserByID as User
        if (userVisitedResult) setUserVisited(userVisitedResult)
        setLoading(false)
      }
    })()
  }, [userID, isLoggedOut, user?.id])
  useEffect(() => {
    if (!matchesMessages?.length || !userID) return
    const conversation = matchesMessages.find(match => match.anotherID === userID)
    if (conversation) {
      setIsMatch(true)
      setChatID(conversation.id)
    }
  }, [matchesMessages, userID])
  return (
    <>
      <SEOHead
        title={userVisited?.name ? `Perfil de ${userVisited.name}` : "Cargando perfil"}
        description={userVisited?.description ? userVisited.description : "Cargando descripción..."}
        keywords={`perfil chamuyapp ligar pareja romance conocer amigos hobbies pasion salida perfil ${userVisited?.name || "usuario"}`}
      />
      {
        loading ?
          <Loading />
          :
          <Container maxW="container.md">
            <Heading py={["4", "6", "10"]}>{userVisited.name ?? "guest"}</Heading>
            <ImagesSlider images={JSON.parse(userVisited.images)} />
            <HStack justify="space-between" py="4">
              <HStack spacing="2">
                <Badge aria-label="Cambiar edad" rounded="md" color="white" display="flex" justifyContent="center" alignItems="center"
                  h="2.5rem" w="2.5rem" bg={`${userVisited.gender === "man" ? "blue" : "pink"}.500`} p="1">
                  {userVisited.age}
                </Badge>
                <Badge w="2.5rem" h="2.5rem" rounded="md" color="white" display="flex" justifyContent="center" alignItems="center"
                  px="0.5em" fontSize={fontSize.paragraph} bg={`${userVisited.gender === "man" ? "blue" : "pink"}.500`}>
                  <FontAwesomeIcon icon={userVisited.gender === "man" ? faMars : faVenus} />
                </Badge>
                <HStack pl="4">
                  <Text>Busco: </Text>
                  <Badge w="2.5rem" h="2.5rem" rounded="md" color="white" display="flex" justifyContent="center" alignItems="center"
                    px="0.5em" fontSize={fontSize.paragraph} bg={`${userVisited.genderPreference === "man" ? "blue" : "pink"}.500`}>
                    <FontAwesomeIcon icon={userVisited.genderPreference === "man" ? faMars : faVenus} />
                  </Badge>
                </HStack>
              </HStack>
              {isMatch && chatID &&
                <Link href={`/messages/${chatID}`} passHref>
                  <IconButton ml="auto" aria-label={`Ir a chatear con ${userVisited.name}`} fontSize={fontSize.paragraph}>
                    <FontAwesomeIcon icon={faEnvelope} />
                  </IconButton>
                </Link>
              }
            </HStack>
            <Text>{userVisited.description}</Text>
          </Container>
      }
    </>
  )
}

export default UserID
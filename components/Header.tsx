import { Button, IconButton } from '@chakra-ui/button'
import { Box, Flex, HStack, Link as ChakraLink, Spacer } from '@chakra-ui/layout'
import { useToast } from '@chakra-ui/react'
import { faBars, faHorse } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from "next/link"
import React, { ReactElement, useContext, useEffect, useState } from 'react'
import { messagesContext } from '../context/messages'
import { showingUsersContext } from '../context/showingUsers'
import { userContext } from '../context/user'
import client from '../lib/apolloClient'
import queries from '../lib/queries'
import { fontSize } from '../lib/styles'
import Heading from './Heading'
import HNavBar from './HNavBar'
import Spot from './Spot'
import VNavBar from './VNavBar'

interface Link {
  url: string,
  to: string,
  aria: string
}

const links: Link[] = [
  {
    url: "/",
    to: "Inicio",
    aria: "Ir a inicio"
  },
  {
    url: "/login",
    to: "Logueate",
    aria: "Ir a loguearme"
  },
  {
    url: "/messages",
    to: "Mensajes",
    aria: "Ir a ver mensajes"
  },
  {
    url: "/register",
    to: "Registrate",
    aria: "Ir a registrarme"
  },
  {
    url: "/profile",
    to: "Perfil",
    aria: "Ir al perfil"
  }
]

function Header(): ReactElement {
  const [openNav, setOpenNav] = useState(false)
  const { isLoggedIn, user } = useContext(userContext)
  const { searchUsers } = useContext(showingUsersContext)
  const { notification } = useContext(messagesContext)
  const toast = useToast()
  useEffect(() => {
    if (notification) {
      toast({
        status: "info",
        title: "Nueva notificación",
        description: "Enterate de que paso mientras no estabas!",
        duration: 2000,
        isClosable: true
      })
    }
  }, [notification])
  useEffect(() => {
    if (user && user.x === 1000 && user.y === 1000) {
      (async () => {
        const location = navigator.geolocation
        if (!location) {
          console.log("There's no access to the geolocation.")
          return
        }
        const position = (await new Promise(res => location.getCurrentPosition(val => res(val)))) as GeolocationPosition
        if (!position?.coords?.latitude || !position?.coords?.longitude) return
        const { latitude, longitude } = position.coords
        const result = await client.mutate({
          mutation: queries.editUser, variables: {
            editUserVariables: {
              id: user.id ?? null,
              x: longitude,
              y: latitude
            }
          }
        })
        if (result?.data?.editUser) {
          toast({
            title: "Bien hecho!",
            description: "Tu ubicación fue actualizada.",
            status: "success",
            duration: 2000,
            isClosable: true
          })
          searchUsers()
        } else {
          toast({
            title: "Error",
            description: "Tu ubicación no se pudo actualizar...",
            status: "error",
            duration: 2000,
            isClosable: true
          })
        }
      })()
    }
  }, [user])
  return (
    <Box bg="red.500" as="header">
      <Flex py="2" px="3" align="center">
        <HStack fontSize={fontSize.paragraph} spacing="4">
          <Link href="/" passHref>
            <IconButton color="red.700" display="inline-block" _hover={{
              transform: "rotate(-35deg)"
            }}
              rounded="full" aria-label="Ir a inicio" fontSize={["1.7em", "1.3em"]}>
              <FontAwesomeIcon icon={faHorse} />
            </IconButton></Link>
          <Link href="/" passHref>
            <ChakraLink fontSize={fontSize.heading} aria-label="Ir a inicio" color="white">
              <Heading style={{ fontFamily: "Satisfy, cursive" }} fontWeight="thin" as="h2" color="white">Chamuyapp</Heading>
            </ChakraLink>
          </Link>
        </HStack>
        <Spacer />
        {/* Small Device */}
        <Button pos="relative" display={{ "lg": "none" }} onClick={() => setOpenNav(!openNav)} fontSize={fontSize.heading} colorScheme="red" aria-label="Abrir menu">
          {notification && !openNav && <Spot />}
          <FontAwesomeIcon icon={faBars} />
        </Button>
        {/* Big Device */}
        <HNavBar links={filterLinks(links)} />
      </Flex>
      <VNavBar links={filterLinks(links)} open={openNav} setOpen={setOpenNav}>
      </VNavBar>
    </Box>
  )
  function filterLinks(links: Link[]): Link[] {
    if (isLoggedIn) {
      return links.filter(link => link.to !== "Registrate" && link.to !== "Logueate")
    } else {
      return links.filter(link => link.to !== "Perfil" && link.to !== "Mensajes")
    }
  }
}

export default Header

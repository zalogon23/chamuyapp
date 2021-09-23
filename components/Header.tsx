import { Button, IconButton } from '@chakra-ui/button'
import { Box, Flex, HStack, Link as ChakraLink, Spacer } from '@chakra-ui/layout'
import { faBars, faHorse } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from "next/link"
import React, { ReactElement, useContext, useState } from 'react'
import { userContext } from '../context/user'
import { fontSize } from '../lib/styles'
import Heading from './Heading'
import HNavBar from './HNavBar'
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
  const { isLoggedIn } = useContext(userContext)
  return (
    <Box bg="red.500" as="header">
      <Flex py="2" px="3" align="center">
        <HStack fontSize={fontSize.paragraph} spacing="4">
          <Link href="/" passHref>
            <IconButton color="red.700" display="inline-block" _hover={{
              transform: "rotate(-35deg)"
            }}
              rounded="full" aria-label="Ir a inicio" fontSize={["1.7em","1.3em"]}>
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
        <Button display={{ "lg": "none" }} onClick={() => setOpenNav(!openNav)} fontSize={fontSize.heading} colorScheme="red" aria-label="Abrir menu">
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

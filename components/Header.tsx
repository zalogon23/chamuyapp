import { Button, IconButton } from '@chakra-ui/button'
import { Box, Flex, HStack, Link as ChakraLink, Spacer } from '@chakra-ui/layout'
import { faBars, faHorse } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from "next/link"
import React, { ReactElement, useState } from 'react'
import { fontSize } from '../lib/styles'
import Heading from './Heading'
import HNavBar from './HNavBar'
import VNavBar from './VNavBar'

const links = [
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
    url: "/register",
    to: "Registrate",
    aria: "Ir a registrarme"
  }
]

function Header(): ReactElement {
  const [openNav, setOpenNav] = useState(false)
  return (
    <Box bg="red.500" as="header">
      <Flex py="2" px="3" align="center">
        <HStack fontSize={fontSize.paragraph} spacing="4">
          <Link href="/" passHref>
            <IconButton color="red.700" display="inline-block" _hover={{
              transform: "rotate(-35deg)"
            }}
              rounded="full" aria-label="Ir a inicio" fontSize="1.55em">
              <FontAwesomeIcon icon={faHorse} />
            </IconButton></Link>
          <Link href="/" passHref>
            <ChakraLink fontSize={fontSize.heading} aria-label="Ir a inicio" color="white">
              <Heading as="h2" color="white">Hola Bateria</Heading>
            </ChakraLink>
          </Link>
        </HStack>
        <Spacer />
        {/* Small Device */}
        <Button display={{ "lg": "none" }} onClick={() => setOpenNav(!openNav)} fontSize={fontSize.heading} colorScheme="red" aria-label="Abrir menu">
          <FontAwesomeIcon icon={faBars} />
        </Button>
        {/* Big Device */}
        <HNavBar links={links} />
      </Flex>
      <VNavBar links={links} open={openNav} setOpen={setOpenNav} />
    </Box>
  )
}

export default Header

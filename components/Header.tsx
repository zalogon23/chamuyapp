import { Button, IconButton } from '@chakra-ui/button'
import { Box, Flex, HStack, Link as ChakraLink, Spacer } from '@chakra-ui/layout'
import { faBars, faHorse } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from "next/link"
import React, { ReactElement, useState } from 'react'
import { fontSize } from '../lib/styles'
import Heading from './Heading'
import VNavBar from './VNavBar'

const links = [
  {
    url: "/",
    to: "Inicio",
    aria: "Ir a inicio"
  },
  {
    url: "/",
    to: "Inicio",
    aria: "Ir a inicio"
  }
]

function Header(): ReactElement {
  const [openNav, setOpenNav] = useState(false)
  return (
    <Box bg="red.500" as="header">
      <Flex py="2" px="3" align="center">
        <HStack fontSize={fontSize.paragraph} spacing="3">
          <IconButton color="red.700" display="inline-block" _hover={{
            transform: "translateX(-0.1em) rotate(-35deg)"
          }}
            rounded="full" aria-label="Ir a inicio" fontSize="1.2em">
            <FontAwesomeIcon icon={faHorse} />
          </IconButton>
          <Link href="/" passHref>
            <ChakraLink fontSize={fontSize.heading} aria-label="Ir a inicio" color="white">
              <Heading as="h2" color="white">Hola Bateria</Heading>
            </ChakraLink>
          </Link>
        </HStack>
        <Spacer />
        <Button onClick={() => setOpenNav(!openNav)} fontSize={fontSize.paragraph} colorScheme="red" aria-label="Abrir menu">
          <FontAwesomeIcon icon={faBars} />
        </Button>
      </Flex>
      <VNavBar links={links} open={openNav} setOpen={setOpenNav} />
    </Box>
  )
}

export default Header

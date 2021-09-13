import { Box, HStack } from '@chakra-ui/layout'
import React, { ReactElement, useContext } from 'react'
import { Link as LinkType } from "./VNavBar"
import Link from "next/link"
import { Link as ChakraLink, Button } from "@chakra-ui/react"
import { fontSize } from '../lib/styles'
import { signOut } from 'next-auth/client'
import { userContext } from '../context/user'
import Router from 'next/router'

interface Props {
  links: LinkType[],
}

function HNavBar({ links }: Props): ReactElement {
  const { isLoggedIn, session } = useContext(userContext)
  return (
    <Box aria-label="Barra de Navegacion Horizontal" as="nav" display={{ "base": "none", "lg": "block" }}>
      <HStack spacing="4" as="ul" px="4">
        {
          links.map((link, id) => (
            <Link key={id} href={link.url} passHref>
              <ChakraLink my="0.2rem" h="2.8rem" display="flex" alignItems="center" justifyContent="center" color="white" textAlign="center" fontSize={fontSize.paragraph} aria-label={link.aria}>
                {link.to}
              </ChakraLink>
            </Link>
          ))
        }
        {isLoggedIn ? <Button colorScheme="red" fontSize={fontSize.paragraph} onClick={async () => {
          signOut({ redirect: false })
          Router.replace("/login")
        }}>Salir</Button> : undefined}

      </HStack>
    </Box>
  )
}

export default HNavBar

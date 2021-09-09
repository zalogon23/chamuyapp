import { Box, HStack } from '@chakra-ui/layout'
import React, { ReactElement } from 'react'
import { Link as LinkType } from "./VNavBar"
import Link from "next/link"
import { Link as ChakraLink, Button } from "@chakra-ui/react"
import { fontSize } from '../lib/styles'
import { signOut, useSession } from 'next-auth/client'

interface Props {
  links: LinkType[],
}

function HNavBar({ links }: Props): ReactElement {
  const [session] = useSession()
  const isLoggedIn = session !== undefined && session !== null
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
        {isLoggedIn ? <Button colorScheme="red" fontSize={fontSize.paragraph} onClick={() => signOut()}>Salir</Button> : undefined}

      </HStack>
    </Box>
  )
}

export default HNavBar

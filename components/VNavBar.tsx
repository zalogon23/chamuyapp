import { Link as ChakraLink, Box } from '@chakra-ui/layout'
import React, { ReactElement, useContext } from 'react'
import Link from "next/link"
import { fontSize } from '../lib/styles'
import { Button } from '@chakra-ui/button'
import { signOut } from 'next-auth/client'
import { userContext } from '../context/user'

export interface Link {
  url: string,
  to: string,
  aria: string
}

export interface Props {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  links: Link[],
  children?: ReactElement | ReactElement[]
}

function VNavBar({ open, setOpen, links, children }: Props): ReactElement {
  const { session, isLoggedIn } = useContext(userContext)
  return (
    <Box aria-label="Barra de Navegacion Vertical" bg="red.700" as="nav" display={{ "lg": "none" }}
      transitionDuration="400ms" overflow="hidden" visibility={open ? "visible" : "hidden"}
      h={open ? `${(links.length + (isLoggedIn ? 1 : 0)) * 3.6}rem` : "0rem"}>
      <Box display="flex" flexDir="column" as="ul">
        {
          links.map((link, id) => (
            <Link key={id} href={link.url} passHref>
              <ChakraLink onClick={() => setOpen(false)} letterSpacing="0.15em" my="0.2rem" h="3.2rem" display="flex" alignItems="center" justifyContent="center" color="white" textAlign="center" fontSize={fontSize.paragraph} aria-label={link.aria}>
                {link.to}
              </ChakraLink>
            </Link>
          ))
        }
        {isLoggedIn ? <Button colorScheme="blackAlpha" bg="red.700" display="flex"
          letterSpacing="0.15em" my="0.2rem" h="3.2rem" alignItems="center" justifyContent="center" color="white"
          textAlign="center" fontSize={fontSize.paragraph} onClick={() => {
            signOut({ redirect: false })
            setOpen(false)
          }}>Salir</Button> : undefined}
      </Box>
    </Box>
  )
}

export default VNavBar

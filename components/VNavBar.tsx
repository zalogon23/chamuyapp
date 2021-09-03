import { Stack, Link as ChakraLink, Box } from '@chakra-ui/layout'
import React, { ReactElement } from 'react'
import Link from "next/link"
import { fontSize } from '../lib/styles'

export interface Link {
  url: string,
  to: string,
  aria: string
}

export interface Props {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  links: Link[]
}

function VNavBar({ open, setOpen, links }: Props): ReactElement {
  return (
    <Box aria-label="Barra de Navegacion Vertical" bg="red.700" as="nav" display={{ "lg": "none" }}
      transitionDuration="400ms" overflow="hidden" visibility={open ? "visible" : "hidden"}
      h={open ? `${links.length * 3.6}rem` : "0rem"}>
      <Box display="flex" flexDir="column" as="ul">
        {
          links.map(link => (
            <Link href={link.url} passHref>
              <ChakraLink letterSpacing="0.15em" my="0.2rem" h="3.2rem" display="flex" alignItems="center" justifyContent="center" color="white" textAlign="center" fontSize={fontSize.paragraph} aria-label={link.aria}>
                {link.to}
              </ChakraLink>
            </Link>
          ))
        }
      </Box>
    </Box>
  )
}

export default VNavBar

import { IconButton } from '@chakra-ui/button'
import { Box, HStack, Link as ChakraLink } from '@chakra-ui/layout'
import { faHorse } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from "next/link"
import React, { ReactElement } from 'react'
import { fontSize } from '../lib/styles'
import Heading from './Heading'

interface Props {

}

function Header({ }: Props): ReactElement {
  return (
    <Box px="2" py="1" bg="red.500" as="header">
      <HStack fontSize={fontSize.paragraph} spacing="2">
        <IconButton w="2.2em" h="2.2em" display="inline-block" rounded="full" bg="red.600" color="white"
          _hover={{ bg: "red.700" }} aria-label="Ir a inicio" fontSize="1.2em">
          <FontAwesomeIcon icon={faHorse} />
        </IconButton>
        <Link href="/" passHref>
          <ChakraLink fontSize={fontSize.heading} aria-label="Ir a inicio" color="white">
            <Heading as="h2" color="white">Hola Bateria</Heading>
          </ChakraLink>
        </Link>
      </HStack>
    </Box>
  )
}

export default Header

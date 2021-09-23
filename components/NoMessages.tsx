import { Square } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'
import React, { ReactElement } from 'react'
import Heading from './Heading'
import Text from './Text'
import Link from "next/link"

interface Props {

}

function NoMessages({ }: Props): ReactElement {
  return (
    <Square flexDir="column" minH="90vh" p="4">
      <Heading textAlign="center">No hay mensajes que mostrar</Heading>
      <Text pt="4" pb="8">Para conseguir un match puedes seguir dando me gusta!</Text>
      <Link href="/" passHref><Button aria-label="Ir a mi inicio">Dar me gusta</Button></Link>
    </Square>
  )
}

export default NoMessages

import { Square } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'
import React, { ReactElement, useContext } from 'react'
import Heading from './Heading'
import Text from './Text'
import Link from "next/link"
import { userContext } from '../context/user'

interface Props {

}

function NoMessages({ }: Props): ReactElement {
  const { isLoggedIn, isLoggedOut } = useContext(userContext)
  return (
    <Square flexDir="column" minH="90vh" p="4">
      {isLoggedIn &&
        <>
          <Heading textAlign="center">No hay mensajes que mostrar</Heading>
          <Text pt="4" pb="8">Para conseguir un match puedes seguir dando me gusta!</Text>
          <Link href="/" passHref><Button aria-label="Ir a mi inicio">Dar me gusta</Button></Link>
        </>
      }
      {isLoggedOut &&
        <>
          <Heading textAlign="center">No estas logueado</Heading>
          <Text pt="4" pb="8">Entra en tu cuenta para ver tus mensajes</Text>
        </>
      }
    </Square>
  )
}

export default NoMessages

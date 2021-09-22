import { Square, Button } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import Heading from './Heading'
import Text from './Text'
import Link from "next/link"

interface Props {

}

function NoUsers({ }: Props): ReactElement {
  return (
    <Square flexDir="column" minH="90vh" p="4">
      <Heading>No hay mas usuarios que mostrar</Heading>
      <Text pt="4" pb="8">Puedes cambiar tus preferencias para seguir dando "me gusta"!</Text>
      <Link href="/profile" passHref><Button aria-label="Ir a mi perfil">Preferencias</Button></Link>
    </Square>
  )
}

export default NoUsers

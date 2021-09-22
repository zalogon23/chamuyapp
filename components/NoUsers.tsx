import { Square, Button } from '@chakra-ui/react'
import React, { ReactElement, useContext } from 'react'
import Heading from './Heading'
import Text from './Text'
import Link from "next/link"
import { userContext } from '../context/user'

interface Props {

}

function NoUsers({ }: Props): ReactElement {
  const { isLoggedIn, isLoggedOut } = useContext(userContext)
  return (
    <Square flexDir="column" minH="90vh" p="4">
      {isLoggedIn &&
        <>
          <Heading>No hay mas usuarios que mostrar</Heading>
          <Text pt="4" pb="8">Puedes cambiar tus preferencias para seguir dando "me gusta"!</Text>
          <Link href="/profile" passHref><Button aria-label="Ir a mi perfil">Preferencias</Button></Link>
        </>
      }
      {isLoggedOut &&
        <>
          <Heading>No estas logueado</Heading>
          <Text pt="4" pb="8">Logueate para poder ver usuarios</Text>
          <Link href="/login" passHref><Button aria-label="Ir a loguearme">Loguearme</Button></Link>
        </>
      }
    </Square>
  )
}

export default NoUsers

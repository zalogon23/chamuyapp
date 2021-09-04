import { Box, Container } from '@chakra-ui/layout'
import { Skeleton } from '@chakra-ui/skeleton'
import { Button } from '@chakra-ui/react'
import React, { ReactElement, useContext, useState } from 'react'
import { showingUsersContext } from '../context/showingUsers'
import Card, { User } from './Card'

interface Props {
  users: User[]
}

function CardsSlider({ }: Props): ReactElement {
  const { users, currentUser, like, dislike, loading } = useContext(showingUsersContext)
  return (
    <Box as="main" overflow="hidden" w="100%" bg="">
      {
        loading || !users || !users.length ?
          <Container px="5" maxW="container.md">
            <Skeleton minH="60vh" maxH="35rem" mb="4" />
            <Box py="4" pt="2">
              <Skeleton mb="2" h="2.8rem" />
              <Skeleton mb="1" h="2.2rem" />
              <Skeleton mb="1" h="2.2rem" />
              <Skeleton mb="1" h="2.2rem" />
              <Skeleton mb="1" h="2.2rem" />
            </Box>
          </Container>
          :
          <>
            <Box display="flex" w={`${100 * users.length}%`} transitionDuration="300ms" transform={`translateX(-${currentUser * 100 / users.length}%)`}>
              {
                users.map((user, id) => (
                  <Box
                    visibility={id === currentUser ? "visible" : "hidden"} key={id} w={`${100 / users.length}%`}
                    opacity={id === currentUser ? "1" : "0"}
                  >
                    <Container px="5" maxW="container.md">
                      <Card {...user} />
                    </Container>
                  </Box>
                ))
              }
            </Box>
            <Button onClick={dislike}>Dis</Button>
            <Button onClick={like}>Like</Button>
          </>
      }
    </Box>
  )
}

export default CardsSlider

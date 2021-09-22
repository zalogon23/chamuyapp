import { Box, Container } from '@chakra-ui/layout'
import { Skeleton } from '@chakra-ui/skeleton'
import React, { ReactElement, useContext, useEffect, useState } from 'react'
import { showingUsersContext } from '../context/showingUsers'
import { userContext } from '../context/user'
import Card, { User } from './Card'
import Heading from './Heading'
import NoUsers from './NoUsers'

interface Props {
}

function CardsSlider({ }: Props): ReactElement {
  const { users, currentUser, loading } = useContext(showingUsersContext)
  return (
    <Box py="3" as="main" overflow="hidden" w="100%" bg="">
      {
        loading ?
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
          (users && users.length) ?
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
            </>
            :
            <NoUsers />
      }
    </Box>
  )
}

export default CardsSlider

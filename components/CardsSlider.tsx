import { Box, Container } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/react'
import React, { ReactElement, useState } from 'react'
import Card, { User } from './Card'

interface Props {
  users: User[]
}

function CardsSlider({ users }: Props): ReactElement {
  const [currentUser, setCurrentUser] = useState(0)
  return (
    <Box as="main" overflow="hidden" w="100%" bg="blue.500">
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
      <Button onClick={() => setCurrentUser(currentUser - 1)}>Prev</Button>
      <Button onClick={() => setCurrentUser(currentUser + 1)}>Next</Button>
    </Box>
  )
}

export default CardsSlider

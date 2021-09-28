import { IconButton } from '@chakra-ui/button'
import { Box, Flex, HStack, Stack } from '@chakra-ui/layout'
import { Badge } from '@chakra-ui/react'
import { faGlobeAfrica, faHeart, faMars, faThumbsDown, faVenus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { ReactElement, useContext } from 'react'
import { showingUsersContext } from '../context/showingUsers'
import { fontSize } from '../lib/styles'
import Heading from './Heading'
import ImagesSlider from './ImagesSlider'
import Text from './Text'
import { headingDistanceTo } from 'geolocation-utils'
import { userContext } from '../context/user'

export interface User {
  id: number,
  description: string,
  gender: string,
  age: number,
  genderPreference: string,
  name: string,
  images: string,
  x: number,
  y: number,
  [props: string]: any
}

function Card({ id, name, description, images, gender, age, x, y, ...props }: User): ReactElement {
  const { dislike, like } = useContext(showingUsersContext)
  const { user } = useContext(userContext)
  const distance = Math.round(headingDistanceTo({ lat: user.y, lon: user.x }, { lat: y, lon: x }).distance / 1000)
  const phrase = distance < 1 ? "menos de un kilometro." : distance === 1 ? `un kilometro.` : `${distance} kilometros.`
  return (
    <Box as="article" rounded="lg" overflow="hidden" boxShadow="0 0 0.7em #0005" {...props}>
      <ImagesSlider images={JSON.parse(images)} />
      <Box p="4" pt="2">
        <Stack spacing="1">
          <HStack>
            <Heading pos="relative" pb="2">{name}</Heading>
            <Badge fontSize={fontSize.paragraph} colorScheme={gender === "woman" ? "pink" : "blue"}>{age}</Badge>
            <Badge fontSize={fontSize.paragraph} colorScheme={gender === "woman" ? "pink" : "blue"}>
              <FontAwesomeIcon icon={gender === "woman" ? faVenus : faMars} />
            </Badge>
          </HStack>
          <HStack>
            <Badge fontSize={fontSize.paragraph} colorScheme={gender === "woman" ? "pink" : "blue"}>
              <FontAwesomeIcon icon={faGlobeAfrica} />
            </Badge>
            <Text><>Esta a {phrase}</></Text>
          </HStack>
          <Text pb="2">
            {description}
          </Text>
        </Stack>
      </Box>
      <Flex pb="4" justifyContent="flex-end">
        <IconButton onClick={like}
          mx="3" aria-label={`Me gusta ${name}`} colorScheme="red" rounded="full">
          <FontAwesomeIcon icon={faHeart} /></IconButton>
        <IconButton onClick={dislike}
          mr="3" aria-label={`No me gusta ${name}`} colorScheme="orange" rounded="full">
          <FontAwesomeIcon icon={faThumbsDown} /></IconButton>
      </Flex>
    </Box>
  )
}

export default Card

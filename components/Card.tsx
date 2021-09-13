import { IconButton } from '@chakra-ui/button'
import { Box, Flex } from '@chakra-ui/layout'
import { faHeart, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { ReactElement, useContext } from 'react'
import { showingUsersContext } from '../context/showingUsers'
import Heading from './Heading'
import ImagesSlider from './ImagesSlider'
import Text from './Text'

export interface User {
  id: number,
  description: string,
  name: string,
  images: string,
  [props: string]: any
}

function Card({ id, name, description, images, ...props }: User): ReactElement {
  const { dislike, like } = useContext(showingUsersContext)
  return (
    <Box as="article" rounded="lg" overflow="hidden" boxShadow="0 0 0.7em #0005" {...props}>
      <ImagesSlider images={JSON.parse(images)} />
      <Box p="4" pt="2">
        <Heading pb="2">{name}</Heading>
        <Text pb="2">
          {description}
        </Text>
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

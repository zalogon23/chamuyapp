import { Box } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import Heading from './Heading'
import Text from './Text'

interface Props {
  description: string,
  name: string,
  images: string[],
  [props: string]: any
}

function Card({ name, description, images, ...props }: Props): ReactElement {
  return (
    <Box rounded="lg" overflow="hidden" boxShadow="0 0 0.7em #0005" {...props}>
      {
        images.map(image => (
          <Image w="100%" h="60vh" fit="contain" bg="black" src={image} fallback={<Box w="100%" h="20rem" bg="black" />} />
        ))
      }
      <Box p="4" pt="2">
        <Heading pb="2">{name}</Heading>
        <Text>
          {description}
        </Text>
      </Box>
    </Box>
  )
}

export default Card

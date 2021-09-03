import { Box } from '@chakra-ui/layout'
import React, { ReactElement } from 'react'
import Heading from './Heading'
import ImagesSlider from './ImagesSlider'
import Text from './Text'

interface Props {
  description: string,
  name: string,
  images: string[],
  [props: string]: any
}

function Card({ name, description, images, ...props }: Props): ReactElement {
  return (
    <Box as="article" rounded="lg" overflow="hidden" boxShadow="0 0 0.7em #0005" {...props}>
      <ImagesSlider images={images} />
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

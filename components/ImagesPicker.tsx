import { IconButton } from '@chakra-ui/button'
import { Image } from '@chakra-ui/image'
import { Box, Wrap, WrapItem } from '@chakra-ui/layout'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { ReactElement, useState } from 'react'
import { fontSize } from '../lib/styles'

interface Props {
  images: string[]
}

function ImagesPicker({ images }: Props): ReactElement {
  const [currentImages, setCurrentImages] = useState(images)
  return (
    <Wrap p="1" bg="blue.300" minH="60vh">
      {currentImages.map((image, id) => (
        <WrapItem key={`userImage${id}`} h="20rem" w="14rem" flexGrow={1} pos="relative">
          <IconButton onClick={() => {
            setCurrentImages(currentImages.filter((_, imgID) => imgID !== id))
          }} size="sm" pos="absolute" fontSize={fontSize.paragraph} top="0.2rem" right="0.2rem" colorScheme="red" aria-label={`Eliminar foto ${id}`}>
            <FontAwesomeIcon icon={faTimes} />
          </IconButton>
          <Image fit="contain" h="100%" w="100%" bg="black" src={image} />
        </WrapItem>
      ))}
      {
        [1, 2, 3, 4, 5, 6].map(num => num > currentImages.length ? (
          <WrapItem h="20rem" w="14rem" bg="black" flexGrow={1} />
        )
          :
          null
        )
      }
    </Wrap>
  )
}

export default ImagesPicker

import { IconButton } from '@chakra-ui/button'
import { Image } from '@chakra-ui/image'
import { Box } from '@chakra-ui/layout'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { ReactElement, useState } from 'react'

interface Props {
  images: string[],
  [props: string]: any
}

function ImagesSlider({ images, ...props }: Props): ReactElement {
  const [current, setCurrent] = useState(0)
  return (
    <Box pos="relative" overflow="hidden" {...props}>
      {images.length !== 0 ?
        <>
          <Box display="flex" transitionDuration="400ms" transform={`translateX(-${current * 100 / images.length}%)`} w={`${images.length * 100}%`}>
            {
              images.map((image, id) => (
                <Box key={id} w={`${100 / images.length}%`}>
                  <Image w="100%" minH="15rem" h="60vh" maxH="35rem" alt="Imagen del usuario" fit="contain" bg="black" src={image} fallback={<ImagePlaceholder />} />
                </Box>
              ))
            }
          </Box>
          <IconButton opacity={first() ? "0.25" : "1"} colorScheme="whiteAlpha" rounded="full" aria-label="Ir a la imagen anterior" pos="absolute" top="50%" transform="translateY(-50%)" left="0.5rem" onClick={left}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </IconButton>
          <IconButton opacity={last() ? "0.25" : "1"} colorScheme="whiteAlpha" rounded="full" aria-label="Ir a la siguiente imagen" pos="absolute" top="50%" transform="translateY(-50%)" right="0.5rem" onClick={right}>
            <FontAwesomeIcon icon={faArrowRight} />
          </IconButton>
        </>
        :
        <ImagePlaceholder />
      }
    </Box>
  )

  function left() {
    if (current > 0) setCurrent(current - 1)
  }
  function right() {
    if (current < images.length - 1) setCurrent(current + 1)
  }
  function first(): boolean {
    return current === 0
  }
  function last(): boolean {
    return current === images.length - 1
  }
}

function ImagePlaceholder() {
  return (
    <Box w="100%" bg="black" h="60vh" minH="15rem" maxH="35rem" />
  )
}

export default ImagesSlider

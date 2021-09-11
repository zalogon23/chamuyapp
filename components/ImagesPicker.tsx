import { Button, IconButton } from '@chakra-ui/button'
import { Image } from '@chakra-ui/image'
import { Input } from '@chakra-ui/input'
import { Box, Stack, Wrap, WrapItem } from '@chakra-ui/layout'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { ReactElement, useState } from 'react'
import client from '../lib/apolloClient'
import queries from '../lib/queries'
import { fontSize } from '../lib/styles'

interface Props {
  images: string[]
}

function ImagesPicker({ images }: Props): ReactElement {
  const [currentImages, setCurrentImages] = useState(images)
  const [uploadedImages, setUploadedImages] = useState([] as File[])
  return (
    <Stack>
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
          [1, 2, 3, 4, 5, 6].map(num => num <= 6 - currentImages.length ? (
            <ImageAdder images={images} num={num} setUploadedImages={setUploadedImages} uploadedImages={uploadedImages} />
          )
            :
            null
          )
        }
      </Wrap>
      <Button aria-label="Actualizar imagenes de perfil" onClick={updateImages}>Actualizar</Button>
    </Stack>
  )
  async function updateImages() {
    const updatedImages = (await client.mutate({
      mutation: queries.sendFiles, variables: {
        uploadFilesFiles: uploadedImages
      }
    }))?.data?.uploadFiles as string[]
    const newProfileURLs = [...currentImages, ...updatedImages]
    console.log("These are the new profile user images: ", newProfileURLs)
    //Here you need to update the user images
  }
}

interface ImageProps {
  images: string[],
  num: number,
  setUploadedImages: React.Dispatch<React.SetStateAction<File[]>>,
  uploadedImages: File[]
}

function ImageAdder({ images, num, setUploadedImages, uploadedImages }: ImageProps) {
  const [image, setImage] = useState((uploadedImages?.[num] ?? null) as File | null)
  return (
    <WrapItem h="20rem" w="14rem" bg="black" flexGrow={1} display="flex"
      justifyContent="center" alignItems="center" pos="relative" overflow="hidden">
      {
        image ?
          <>
            <IconButton
              colorScheme="red" fontSize={fontSize.paragraph} aria-label={`Eliminar imagen ${images.length + num}`}
              size="sm" pos="absolute" top="0.2rem" right="0.2rem" onClick={removeImage}>
              <FontAwesomeIcon icon={faTimes} />
            </IconButton>
            <Image w="100%" h="100%" fit="contain" src={URL.createObjectURL(image)} />
          </>
          :
          <>
            <IconButton onClick={() => (document.querySelector(`#uploadImage${num}`) as HTMLInputElement).click()} rounded="full" aria-label="Agregar foto">
              <FontAwesomeIcon icon={faPlus} />
            </IconButton>
            <Input onChange={(e) => {
              const file = e?.target?.files?.[0]
              if (!file) {
                removeImage()
                return
              }
              addImage(file)
            }} id={`uploadImage${num}`} type="file" bg="black" pos="absolute" w="0" h="0" right="-1000rem" />
          </>
      }
    </WrapItem>
  )

  function removeImage() {
    setUploadedImages(uploadedImages?.filter(img => img?.name !== image?.name) ?? null)
    setImage(null)
  }
  function addImage(file: File) {
    setImage(file)
    setUploadedImages([...uploadedImages, file])
  }
}

export default ImagesPicker

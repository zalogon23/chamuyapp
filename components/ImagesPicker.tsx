import { Button, IconButton } from '@chakra-ui/button'
import { Image } from '@chakra-ui/image'
import { Input } from '@chakra-ui/input'
import { Box, Stack, Wrap, WrapItem } from '@chakra-ui/layout'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'
import React, { Dispatch, ReactElement, SetStateAction, useContext, useState } from 'react'
import { userContext } from '../context/user'
import client from '../lib/apolloClient'
import queries from '../lib/queries'
import { fontSize } from '../lib/styles'

interface Props {
  images: string[],
  setMode: Dispatch<SetStateAction<number>>
}

function ImagesPicker({ images, setMode }: Props): ReactElement {
  const [currentImages, setCurrentImages] = useState(images)
  const [uploadedImages, setUploadedImages] = useState([] as File[])
  const { setUser, user } = useContext(userContext)
  return (
    <Stack p="4" border="2px solid" borderColor="gray.200" rounded="lg" spacing="1em">
      <Wrap minH="60vh">
        {currentImages.map((image, id) => (
          <WrapItem rounded="md" overflow="hidden" key={`userImage${id}`} h="20rem" minW={["", "13rem"]} w="48%" flexGrow={1} pos="relative">
            <IconButton onClick={() => {
              setCurrentImages(currentImages.filter((_, imgID) => imgID !== id))
            }} size="sm" pos="absolute" fontSize={fontSize.paragraph} top="0.2rem" right="0.2rem" colorScheme="red" aria-label={`Eliminar foto ${id}`}>
              <FontAwesomeIcon icon={faTimes} />
            </IconButton>
            <Image alt="imagen propia actual" fit="contain" h="100%" w="100%" bg="black" src={image} />
          </WrapItem>
        ))}
        {
          [1, 2, 3, 4, 5, 6].map(num => num <= 6 - currentImages.length ? (
            <ImageAdder key={`imageadder${num}`} rounded="md" overflow="hidden" minW={["", "13rem"]} w="48%" images={images} num={num - 1} setUploadedImages={setUploadedImages} uploadedImages={uploadedImages} />
          )
            :
            null
          )
        }
      </Wrap>
      <Button fontSize={fontSize.paragraph} minW="100%" aria-label="Actualizar imagenes de perfil" onClick={updateImages}>Actualizar</Button>
    </Stack>
  )
  async function updateImages() {
    setMode(0)
    let updatedImages = [] as string[];
    if (uploadedImages.length > 0) {
      updatedImages = (await client.mutate({
        mutation: queries.sendFiles, variables: {
          uploadFilesFiles: uploadedImages
        }
      }))?.data?.uploadFiles as string[]
    }
    const newProfileURLs = [...currentImages, ...updatedImages]
    console.log(newProfileURLs, images)
    if (newProfileURLs.length !== images.length || newProfileURLs.find((url, id) => url !== images[id])) {
      console.log("There was something different.")
      const imagesUpdated = (await client.mutate({
        mutation: queries.updateImages, variables: {
          updateUserImagesImages: JSON.stringify(newProfileURLs),
          updateUserImagesId: 2 // ERROR: THE ID HERE IS HARD CODED!!!!!!!!!!!!!!!!!!!!!!!!!!!
        }
      }))?.data?.updateUserImages as string
      if (imagesUpdated) {
        //Update user on session
        setUser({ ...user, images: imagesUpdated })
      }
    }
  }
}

interface ImageProps {
  images: string[],
  num: number,
  setUploadedImages: React.Dispatch<React.SetStateAction<File[]>>,
  uploadedImages: File[],
  [props: string]: any
}

function ImageAdder({ images, num, setUploadedImages, uploadedImages, ...props }: ImageProps) {
  const image = (uploadedImages?.[num] ?? null) as File | null
  return (
    <WrapItem h="20rem" w="14rem" bg="black" flexGrow={1} display="flex"
      justifyContent="center" alignItems="center" pos="relative" overflow="hidden" {...props}>
      {
        image ?
          <>
            <IconButton
              colorScheme="red" fontSize={fontSize.paragraph} aria-label={`Eliminar imagen ${images.length + num}`}
              size="sm" pos="absolute" top="0.2rem" right="0.2rem" onClick={removeImage}>
              <FontAwesomeIcon icon={faTimes} />
            </IconButton>
            <Image alt="imagen propia nueva" w="100%" h="100%" fit="contain" src={URL.createObjectURL(image)} />
          </>
          :
          <>
            <IconButton onClick={() => selectFile()} rounded="full" aria-label="Agregar foto">
              <FontAwesomeIcon icon={faPlus} />
            </IconButton>
          </>
      }
    </WrapItem>
  )

  function removeImage() {
    const index = uploadedImages.findIndex(img => img?.name === image?.name)
    setUploadedImages(uploadedImages.filter((img, id) => id !== index) ?? null)
  }
  function addImage(file: File) {
    setUploadedImages([...uploadedImages, file])
  }

  function selectFile() {
    const filePicker = document.createElement("input")
    filePicker.type = "file"
    filePicker.addEventListener("change", (e) => {
      const file = (e?.target as HTMLInputElement)?.files?.[0] as File
      if (!file) {
        removeImage()
        return
      }
      addImage(file)
    })
    filePicker.click()
  }
}

export default ImagesPicker

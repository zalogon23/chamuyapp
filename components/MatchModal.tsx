import { useDisclosure } from '@chakra-ui/hooks'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal'
import { Button, Box, Image } from '@chakra-ui/react'
import React, { ReactElement, useEffect } from 'react'
import { fontSize } from '../lib/styles'
import Heading from './Heading'
import Text from './Text'

interface Props {
  open?: boolean
  name?: string,
  image?: string
  redirect?: () => void,
  reject?: () => void
}

function MatchModal({ open, name, redirect, reject, image }: Props): ReactElement {
  const { isOpen, onOpen, onClose } = useDisclosure()
  useEffect(() => {
    if (!!open) onOpen()
  }, [open])
  useEffect(() => {
    if (!isOpen && reject) reject()
  }, [isOpen])
  return (
    <>{
      isOpen ?
        <Modal scrollBehavior="inside" size="xl" isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent mx="4">
            <ModalHeader>
              <Heading mt="4">¡Tuviste un match!</Heading>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody >
              <Image mx="auto" maxW="10rem" src={image} alt={`Imagen de ${name}`}
                fallback={<Box mx="auto" w="10rem" h="12.5rem" bg="black" />} />
              <Text textAlign="center" py="4">
                {`Ahora puedes hablar con ${name}`}
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button fontSize={fontSize.paragraph} autoFocus colorScheme="red" mr="4" aria-label={`Ir a chatear con ${name}`}
                onClick={redirect}>
                Ir a chatear!
              </Button>
              <Button fontSize={fontSize.paragraph} onClick={onClose}>
                Cerrar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        :
        null
    }
    </>
  )
}

export default MatchModal

import { useDisclosure } from '@chakra-ui/hooks'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal'
import { Button, Avatar, Image } from '@chakra-ui/react'
import React, { ReactElement, useEffect } from 'react'
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
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Heading>¡Tuviste un match!</Heading>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Image src={image} alt={`Imagen de ${name}`} />
              <Text>
                {`Ahora puedes hablar con ${name}`}
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button aria-label={`Ir a chatear con ${name}`}
                onClick={redirect}>
                Ir a chatear!
              </Button>
              <Button onClick={onClose}>
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

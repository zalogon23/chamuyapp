import { ButtonGroup, IconButton } from '@chakra-ui/button'
import { Editable, EditableInput, EditablePreview, useEditableControls } from '@chakra-ui/editable'
import { faCheck, faEdit, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { ReactElement } from 'react'
import { fontSize } from '../lib/styles'

interface Props {
  defaultValue: string
}

function EditableDescription({ defaultValue }: Props): ReactElement {

  return (
    <Editable fontSize={fontSize.paragraph} pt="0.2em" mb="1.5em" defaultValue={defaultValue} pos="relative">
      <EditableInput />
      <Logic />
      <EditablePreview pr="2.5em" />
    </Editable>
  )
}

function Logic() {
  const {
    isEditing,
    getSubmitButtonProps,
    getEditButtonProps,
    getCancelButtonProps
  } = useEditableControls()
  return (
    <>
      {
        isEditing ?
          <ButtonGroup py="4">
            <IconButton aria-label="Confirmar cambios en descripcion"
              {...getSubmitButtonProps()}>
              <FontAwesomeIcon icon={faCheck} /></IconButton>
            <IconButton colorScheme="red" aria-label="Cancelar cambios en descripcion"
              {...getCancelButtonProps()}>
              <FontAwesomeIcon icon={faTimes} /></IconButton>
          </ButtonGroup>
          :
          <IconButton pos="absolute" right="0" top="50%" transform="translateY(-50%)" aria-label="Editar descripcion"
            {...getEditButtonProps()}>
            <FontAwesomeIcon icon={faEdit} />
          </IconButton>
      }
    </>
  )
}

export default EditableDescription

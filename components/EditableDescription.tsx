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
    <Editable fontSize={fontSize.paragraph} py="0.8em" defaultValue={defaultValue} pos="relative">
      <EditablePreview pr="2.5em" />
      <EditableInput />
      <Logic />
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
          <ButtonGroup pos="absolute" bottom="-1.5em" left="0">
            <IconButton colorScheme="green" aria-label="Confirmar cambios en descripcion"
              {...getSubmitButtonProps()}>
              <FontAwesomeIcon icon={faCheck} /></IconButton>
            <IconButton colorScheme="red" aria-label="Cancelar cambios en descripcion"
              {...getCancelButtonProps()}>
              <FontAwesomeIcon icon={faTimes} /></IconButton>
          </ButtonGroup>
          :
          <IconButton pos="absolute" right="0" aria-label="Editar descripcion"
            {...getEditButtonProps()}>
            <FontAwesomeIcon icon={faEdit} />
          </IconButton>
      }
    </>
  )
}

export default EditableDescription

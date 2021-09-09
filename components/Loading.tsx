import { Container, Square } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import React, { ReactElement } from 'react'

interface Props {
  [props: string]: any
}

function Loading({ ...props }: Props): ReactElement {
  return (
    <Container>
      <Square minH="90vh" {...props}>
        <Spinner size="xl" />
      </Square>
    </Container>
  )
}

export default Loading

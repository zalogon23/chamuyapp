import { Square } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import React, { ReactElement } from 'react'

interface Props {
  [props: string]: any
}

function Loading({ ...props }: Props): ReactElement {
  return (
    <Square minH="90vh" {...props}>
      <Spinner size="xl" />
    </Square>
  )
}

export default Loading

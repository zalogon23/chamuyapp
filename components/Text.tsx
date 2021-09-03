import React, { ReactElement } from 'react'
import { Text as ChakraText } from "@chakra-ui/react"
import { fontSize, lineHeight } from '../lib/styles'

interface Props {
  children: string,
  [props: string]: any
}

function Text({ children, ...props }: Props): ReactElement {
  return (
    <ChakraText color="gray.400" lineHeight={lineHeight} fontSize={fontSize.paragraph} {...props}>
      {children}
    </ChakraText>
  )
}

export default Text

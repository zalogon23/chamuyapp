import React, { ReactElement } from 'react'
import { Heading as ChakraHeading } from "@chakra-ui/react"
import { fontSize, headingLineHeight, lineHeight } from '../lib/styles'

interface Props {
  children: string,
  [props: string]: any
}

function Heading({ children, ...props }: Props): ReactElement {
  return (
    <ChakraHeading lineHeight={headingLineHeight} fontSize={fontSize.heading} {...props}>
      {children}
    </ChakraHeading>
  )
}

export default Heading
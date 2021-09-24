import { Box } from '@chakra-ui/layout'
import React, { ReactElement } from 'react'

interface Props {
  [props: string]: any
}

function Spot({ ...props }: Props): ReactElement {
  return (
    <Box pos="absolute" top="0.2rem" right="0.3rem" rounded="full" bg="white" w="0.5rem" h="0.5rem" {...props} />
  )
}

export default Spot

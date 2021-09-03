import { ChakraProvider, Container } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import Header from '../components/Header'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Header />
      <Container px="5" maxW="container.md">
        <Component {...pageProps} />
      </Container>
    </ChakraProvider>
  )
}
export default MyApp

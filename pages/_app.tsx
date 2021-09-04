import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import Header from '../components/Header'
import { ShowingUsersProvider } from '../context/showingUsers'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ShowingUsersProvider>
      <ChakraProvider>
        <Header />
        <Component {...pageProps} />
      </ChakraProvider>
    </ShowingUsersProvider>
  )
}
export default MyApp

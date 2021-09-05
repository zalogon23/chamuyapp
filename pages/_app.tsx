import { ApolloProvider } from '@apollo/client'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import Header from '../components/Header'
import { ShowingUsersProvider } from '../context/showingUsers'
import client from '../lib/apolloClient'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ShowingUsersProvider>
        <ChakraProvider>
          <Header />
          <Component {...pageProps} />
        </ChakraProvider>
      </ShowingUsersProvider>
    </ApolloProvider>
  )
}
export default MyApp

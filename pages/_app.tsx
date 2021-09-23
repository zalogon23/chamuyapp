import { ApolloProvider } from '@apollo/client'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import Header from '../components/Header'
import { ShowingUsersProvider } from '../context/showingUsers'
import client from '../lib/apolloClient'
import { Provider as SessionProvider } from "next-auth/client"
import UserProvider from '../context/user'
import MessagesProvider from '../context/messages'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <UserProvider>
        <MessagesProvider>
          <ApolloProvider client={client}>
            <ShowingUsersProvider>
              <ChakraProvider>
                <Header />
                <Component {...pageProps} />
              </ChakraProvider>
            </ShowingUsersProvider>
          </ApolloProvider>
        </MessagesProvider>
      </UserProvider>
    </SessionProvider>
  )
}
export default MyApp

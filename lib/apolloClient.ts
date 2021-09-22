import { ApolloClient, InMemoryCache } from "@apollo/client"
import { createUploadLink } from "apollo-upload-client"

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: createUploadLink({
    uri: process.env.GRAPHQL_URL 
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "network-only"
    },
    query: {
      fetchPolicy: "network-only"
    }
  }
})

export default client
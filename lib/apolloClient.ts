import { ApolloClient, InMemoryCache } from "@apollo/client"
import { createUploadLink } from "apollo-upload-client"

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: createUploadLink({
    uri: process.env.NODE_ENV !== "production" ? "http://192.168.0.2:8000" : process.env.GRAPHQL_URL
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
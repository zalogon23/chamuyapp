import { ApolloClient, InMemoryCache } from "@apollo/client"

const client = new ApolloClient({
  uri: process.env.URL ? process.env.URL + "/graphql" : "http://localhost:8000/graphql",
  cache: new InMemoryCache(),
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
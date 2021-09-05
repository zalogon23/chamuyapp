import { ApolloClient, InMemoryCache } from "@apollo/client"

const client = new ApolloClient({
  uri: process.env.URL ? process.env.URL + "/graphql" : "localhost:8000/graphql",
  cache: new InMemoryCache()
})

export default client
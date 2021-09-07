import gql from "graphql-tag"

const queries = {
  registerProvider: gql`
  mutation CreateUserProvidersMutation($createUserProvidersEmail: String!, $createUserProvidersProvider: String!, $createUserProvidersId: Float!) {
    createUserProviders(email: $createUserProvidersEmail, provider: $createUserProvidersProvider, id: $createUserProvidersId) {
      id
    }
  }
  `,
  register: gql`
  mutation CreateUserMutation($createUserVariables: UserInput!) {
    createUser(variables: $createUserVariables) {
      name
    }
  }
  `
}

export default queries
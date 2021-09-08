import gql from "graphql-tag"

const queries = {
  loginProvider: gql`
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
  `,
  getUserByID: gql`
  query Query($getUserByIdId: Float!) {
    getUserByID(id: $getUserByIdId) {
      name, gender, age, description, images, votedUsers, likedUsers, matchedUsers,genderPreference
    }
  }
  `
}

export default queries
import gql from "graphql-tag"

const queries = {
  loginProvider: gql`
  mutation GetUserProvidersMutation($getUserProvidersProvider: String!, $getUserProvidersId: Float!) {
    getUserProviders(provider: $getUserProvidersProvider, id: $getUserProvidersId) {
      id
    }
  }
  `,
  login: gql`
  query Query($getUserByLoginPassword: String!, $getUserByLoginEmail: String!) {
    getUserByLogin(password: $getUserByLoginPassword, email: $getUserByLoginEmail) {
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
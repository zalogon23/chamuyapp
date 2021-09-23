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
      id
    }
  }
  `,
  getUserByID: gql`
  query Query($getUserByIdId: Float!) {
    getUserByID(id: $getUserByIdId) {
      id, name, gender, age, description, images, votedUsers, likedUsers, matchedUsers,genderPreference
    }
  }
  `,
  sendFiles: gql`
  mutation UploadFilesMutation($uploadFilesFiles: [Upload!]!) {
    uploadFiles(files: $uploadFilesFiles)
  }
  `,
  updateImages: gql`
  mutation UpdateUserImagesMutation($updateUserImagesImages: String!, $updateUserImagesId: Float!) {
    updateUserImages(images: $updateUserImagesImages, id: $updateUserImagesId)
  }
  `,
  getShowingUsers: gql`
  query Query($getShowingUsersUserId: Float!) {
    getShowingUsers(userID: $getShowingUsersUserId) {
      id, name, description, age, gender, images
    }
  }
  `,
  voteUser: gql`
  mutation VoteUserMutation($voteUserLiked: Boolean!, $voteUserVotedId: Float!, $voteUserVoterId: Float!) {
    voteUser(liked: $voteUserLiked, votedID: $voteUserVotedId, voterID: $voteUserVoterId)
  }  
  `,
  getMatches: gql`
  query Query($getMatchesUserId: Float!) {
    getMatches(userID: $getMatchesUserId){
      name, images, id, content, anotherID
    }
  }  
  `,
  sendMessage: gql`
  mutation SendMessageMutation($sendMessageContent: String!, $sendMessageTo: Float!, $sendMessageFrom: Float!) {
    sendMessage(content: $sendMessageContent, to: $sendMessageTo, from: $sendMessageFrom)
  }  
  `,
  editUser: gql`
  mutation EditUserMutation($editUserVariables: UserEdit!) {
    editUser(variables: $editUserVariables)
  }  
  `,
  removeMatch: gql`
  mutation RemoveMatchMutation($removeMatchMatchId: Float!) {
    removeMatch(matchID: $removeMatchMatchId)
  }
  `
}

export default queries
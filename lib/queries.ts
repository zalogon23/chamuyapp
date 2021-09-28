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
      id, name, gender, age, description, images, genderPreference, minAgePreference, maxAgePreference, maxDistancePreference, x, y
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
      id, name, description, age, gender, images, x, y
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
      name, images, id, content, anotherID, seen
    }
  }  
  `,
  sendMessage: gql`
  mutation SendMessageMutation($sendMessageContent: String!, $sendMessageTo: Float!, $sendMessageFrom: Float!) {
    sendMessage(content: $sendMessageContent, to: $sendMessageTo, from: $sendMessageFrom) {
      id
    }
  }
  `,
  editUser: gql`
  mutation EditUserMutation($editUserVariables: UserEdit!) {
    editUser(variables: $editUserVariables)
  }  
  `,
  removeMatch: gql`
  mutation RemoveMatchMutation($removeMatchUserId: Float!, $removeMatchAnotherId: Float!, $removeMatchMatchId: Float!) {
    removeMatch(userID: $removeMatchUserId, anotherID: $removeMatchAnotherId, matchID: $removeMatchMatchId)
  }
  
  `,
  setMatchSeen: gql`
  mutation SetMatchSeenMutation($setMatchSeenAnotherId: Float!, $setMatchSeenUserId: Float!, $setMatchSeenMatchId: Float!) {
    setMatchSeen(anotherID: $setMatchSeenAnotherId, userID: $setMatchSeenUserId, matchID: $setMatchSeenMatchId)
  }
  `,
  setMessageSeen: gql`
  mutation SetMessageSeenMutation($setMessageSeenUserId: Float!, $setMessageSeenMessageId: Float!) {
    setMessageSeen(userID: $setMessageSeenUserId, messageID: $setMessageSeenMessageId)
  }
  `,
  deleteMessage: gql`
  mutation DeleteMessageMutation($deleteMessageUserId: Float!, $deleteMessageMessageId: Float!) {
    deleteMessage(userID: $deleteMessageUserId, messageID: $deleteMessageMessageId)
  }
  `
}

export default queries
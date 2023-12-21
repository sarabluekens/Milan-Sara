import gql from 'graphql-tag'

export const ADD_USER = gql`
  mutation createUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      id
      uid
      name
      email
      locale
      role
    }
  }
`

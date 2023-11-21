import gql from 'graphql-tag'

export const ALL_Victims = gql`
  query {
    getVictims {
      id
      firstName
      lastName
      email
      phoneNumber
      cases
    }
  }
`

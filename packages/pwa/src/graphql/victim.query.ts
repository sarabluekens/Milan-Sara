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
export const GET_VICTIM_BY_NAME = gql`
  query getVictimByName($firstName: String!, $lastName: String!) {
    getVictimByName(firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
      email
      phoneNumber
      cases
    }
  }
`

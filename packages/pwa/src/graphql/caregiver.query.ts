import gql from 'graphql-tag'
export const ALL_CAREGIVERS = gql`
  query caregivers {
    caregivers {
      id
      firstName
      lastName
      profession
      availableForEvent
      availableForNewCase
    }
  }
`

import gql from 'graphql-tag'
export const ALL_CAREGIVERS = gql`
  query caregivers {
    caregivers {
      __typename
      id
      name
      createdAt
      updatedAt
    }
  }
`

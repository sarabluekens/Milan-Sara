import gql from 'graphql-tag'

export const ALL_EQUIPMENT = gql`
  query equipments {
    equipments {
      __typename
      id
      name
      fullname
      category
      amount
      available
      createdAt
      updatedAt
    }
  }
`

//hier moet er nog vanalles komen

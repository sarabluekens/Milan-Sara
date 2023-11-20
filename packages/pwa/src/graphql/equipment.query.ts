import gql from 'graphql-tag'

export const ALL_EQUIPMENT = gql`
  query equipments {
    equipments {
      __typename
      id
      name
      category
      description
      totalStock
      reservedStock
      available
      expirationDate
      createdAt
      updatedAt
    }
  }
`

//hier moet er nog vanalles komen

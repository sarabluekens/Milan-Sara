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

export const GET_EQUIPMENT_BY_CATEGORY = gql`
  query equipmentByCategory($category: String!) {
    equipmentByCategory(category: $category) {
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

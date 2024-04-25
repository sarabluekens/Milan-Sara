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
      reservedStock {
        eventId
        amount
      }
      available
      expirationDate
      createdAt
      updatedAt
    }
  }
`

export const GET_EQUIPMENT_BY_CASE_ID = gql`
  query equipmentByCaseId($caseId: String!) {
    equipmentByCaseId(caseId: $caseId) {
      name
      reservedStock {
        eventId
        amount
      }
    }
  }
`

import gql from 'graphql-tag'

export const UPDATE_EQUIPMENT = gql`
  mutation updateEquipment($updateEquipmentInput: UpdateEquipmentInput!) {
    updateEquipment(updateEquipmentInput: $updateEquipmentInput) {
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
    }
  }
`

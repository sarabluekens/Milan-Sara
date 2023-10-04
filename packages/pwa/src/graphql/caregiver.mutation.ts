import gql from 'graphql-tag'

export const ADD_CAREGIVER = gql`
  mutation createCaregiver($caregiverInput: CreateCaregiverInput!) {
    createCaregiver(createCaregiverInput: $caregiverInput) {
      id
      name
      fullname
      category
      description
      createdAt
      updatedAt
    }
  }
`

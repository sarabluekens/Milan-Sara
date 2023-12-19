import gql from 'graphql-tag'

export const ADD_CAREGIVER = gql`
  mutation createCaregiver($caregiverInput: CreateCaregiverInput!) {
    createCaregiver(createCaregiverInput: $caregiverInput) {
      id
      firstName
      lastName
      profession
      jobs {
        eventId
        workdays
      }
      availableForEvent
      availableForNewCase
    }
  }
`

export const UPDATE_CAREGIVER = gql`
  mutation updateCaregiverJobs($updateCaregiverInput: UpdateCaregiverInput!) {
    updateCaregiverJobs(updateCaregiverInput: $updateCaregiverInput) {
      id
      firstName
      lastName
      profession
      jobs {
        eventId
        workdays
      }
      availableForEvent
      availableForNewCase
    }
  }
`

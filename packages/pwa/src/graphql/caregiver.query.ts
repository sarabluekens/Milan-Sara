import gql from 'graphql-tag'
export const ALL_CAREGIVERS = gql`
  query caregivers {
    caregivers {
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

export const CAREGIVER_BY_USER_UID = gql`
  query findOneByUserUid($userUid: String!) {
    findOneByUserUid(userUid: $userUid) {
      id
      firstName
      lastName
    }
  }
`

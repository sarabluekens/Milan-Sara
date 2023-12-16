import gql from 'graphql-tag'

export const ALL_CASES = gql`
  query {
    cases {
      id
      victimId
      eventId
      caregiverId
      typeAccident
      date
      accidentDescription
      diagnose
      careGiven
      checkUpRequired
      checkUpDescription
      referred
      referralDescription
      personalEnsurance
      eventEnsurance
      usedMaterials {
        name
        amount
      }
    }
  }
`

export const CASE_BY_ID = gql`
  query caseById($caseId: String!) {
    caseById(id: $caseId) {
      id
      coordinates {
        lat
        lng
      }
    }
  }
`

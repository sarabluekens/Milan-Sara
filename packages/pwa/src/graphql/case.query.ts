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
      priority
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

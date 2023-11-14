import gql from 'graphql-tag'

export const ADD_CASE = gql`
  mutation createCase($caseInput: CreateCaseInput!) {
    createCase(createCaseInput: $caseInput) {
      id
      date
      typeAccident
      eventId
    }
  }
`

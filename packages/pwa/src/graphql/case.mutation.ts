import type { Case } from '@/interfaces/case.interface'
import { gql, type TypedDocumentNode } from '@apollo/client/core'

export const ADD_CASE: TypedDocumentNode<
  { createCase: Case },
  {
    caseInput: {
      eventId: string
      typeAccident: string
      date: Date
    }
  }
> = gql`
  mutation createCase($caseInput: CreateCaseInput!) {
    createCase(createCaseInput: $caseInput) {
      id
      date
      typeAccident
      eventId
    }
  }
`

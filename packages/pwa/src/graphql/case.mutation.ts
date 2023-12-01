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

export const UPDATE_CASE: TypedDocumentNode<
  { updateCase: Case },
  {
    caseInput: {
      id: string
      eventId: string
      typeAccident: string
      date: Date
    }
  }
> = gql`
  mutation updateCase($caseInput: UpdateCaseInput!) {
    updateCase(updateCaseInput: $caseInput) {
      id
      date
      typeAccident
      eventId
    }
  }
`

export const ADD_VICTIM_TO_CASE: TypedDocumentNode<
  { addVictimToCase: Case },
  {
    updateCaseInput: {
      caseId: string
      victimId: string
    }
  }
> = gql`
  mutation addVictimToCase($updateCaseInput: UpdateCaseInput!) {
    addVictimToCase(updateCaseInput: $updateCaseInput) {
      id
      victimId
      date
    }
  }
`

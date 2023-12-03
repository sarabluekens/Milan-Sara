import type { Victim } from '@/interfaces/victim.interface'
import { gql, type TypedDocumentNode } from '@apollo/client/core'
export const ADD_VICTIM: TypedDocumentNode<
  { createVictim: Victim },
  {
    victimInput: {
      firstName: string
      lastName: string
      email: string
      phoneNumber: string
      caseId: string
    }
  }
> = gql`
  mutation createVictim($victimInput: CreateVictimInput!) {
    createVictim(createVictimInput: $victimInput) {
      id
      firstName
      lastName
      email
      phoneNumber
      cases
    }
  }
`

export const ADD_CASE_TO_VICTIM: TypedDocumentNode<
  { addCaseToVictim: Victim },
  {
    updateVictimInput: {
      victimId: string
      caseId: string
    }
  }
> = gql`
  mutation addCaseToVictim($updateVictimInput: UpdateVictimInput!) {
    addCasetoVictim(updateVictimInput: $updateVictimInput) {
      id
      firstName
      lastName
      cases
    }
  }
`

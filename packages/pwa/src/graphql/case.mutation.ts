import type { Case } from '@/interfaces/case.interface'
import type { Coords } from '@/interfaces/coords.interface'
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
export const ADD_VICTIM_CO: TypedDocumentNode<
  { addVictimCo: Case },
  {
    updateCaseInput: {
      caseId: string
      victimCoordinates: Coords
    }
  }
> = gql`
  mutation addVictimCo($updateCaseInput: UpdateCaseInput!) {
    addVictimCo(updateCaseInput: $updateCaseInput) {
      id
      victimCoordinates {
        lat
        lng
      }
    }
  }
`

export const ADD_CAREGIVER_CO: TypedDocumentNode<
  { addCaregiverCo: Case },
  {
    updateCaseInput: {
      caseId: string
      caregiverCoordinates: Coords
    }
  }
> = gql`
  mutation addCaregiverCo($updateCaseInput: UpdateCaseInput!) {
    addCaregiverCo(updateCaseInput: $updateCaseInput) {
      id
      caregiverCoordinates {
        lat
        lng
      }
    }
  }
`

export const CHANGE_CASE_STATUS: TypedDocumentNode<
  { updateCase: Case },
  {
    caseInput: {
      caseId: string
      caregiverId: string
    }
  }
> = gql`
  mutation assignCaregiverToCase($caseInput: UpdateCaseInput!) {
    assignCaregiverToCase(updateCaseInput: $caseInput) {
      id
      date
      typeAccident
      eventId
      caregiverId
      status
    }
  }
`

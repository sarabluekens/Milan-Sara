export interface Caregiver {
  id: string
  firstName: string
  lastName: string
  profession: string
  jobs: Array<Jobs>
  availableForEvent: boolean
  availableForNewCase: boolean
}

export interface Jobs {
  eventId: string
  workdays: Array<string>
}

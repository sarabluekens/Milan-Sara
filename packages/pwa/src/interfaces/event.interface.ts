export interface Event {
  id: string
  name: string
  address: string
  postalCode: string
  city: string
  dates: Date[]
  startHour: string
  endHour: string
  contactPerson: string
  phoneNumber: string
  email: string
  btwNumber: string
  eventWithChildren: boolean
  mapsLink: string
  mapCoords: {
    lat: number
    lng: number
  }
  expectedVisitorStaffCount: number
  status: Status
  createdAt: Date
  updatedAt: Date
}

export enum Status {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
  Completed = 'Completed',
}

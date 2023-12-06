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
  expectedVisitorStaffCount: number
  status: Status
  createdAt: Date
  updatedAt: Date
}

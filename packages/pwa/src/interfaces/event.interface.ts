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

export enum Category {
  Sport = 'Sport',
  Expo = 'Expo',
  Concert = 'Concert',
  Festival = 'Festival',
}

export enum Status {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
  Completed = 'Completed',
}

export interface EventCard {
  id: string
  name: string
  category: string
  city: string
}

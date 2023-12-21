import { CreateEventInput } from '../dto/create-event.input'
import { Event } from '../entities/event.entity'

export enum Status {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
  Completed = 'Completed',
}

export const createEventInputStub = (): CreateEventInput => {
  const newEvent = new CreateEventInput()
  newEvent.name = 'Event 1'
  newEvent.address = 'event1weg'
  newEvent.category = 'Festival'
  newEvent.postalCode = '1234'
  newEvent.city = 'City'
  newEvent.dates = [new Date('2023-12-21T23:00:00.000+00:00')]
  newEvent.startHour = '00:00'
  newEvent.endHour = '00:00'
  newEvent.contactPerson = 'Contact Person'
  newEvent.phoneNumber = '0123456789'
  newEvent.email = 'contactperson@person.be'
  newEvent.btwNumber = '9876543210'
  newEvent.eventWithChildren = false
  newEvent.expectedVisitorStaffCount = 0
  newEvent.mapsLink = ''
  newEvent.mapCoords = [{ corner: 'LeftTop', lat: 0, lng: 0 }]
  newEvent.status = Status.Pending

  return newEvent
}

export const eventStub = (): Event => {
  const newEvent = new Event()
  newEvent.id = '1'
  newEvent.name = 'Event 1'
  newEvent.category = 'Festival'
  newEvent.address = 'event1weg'
  newEvent.postalCode = '1234'
  newEvent.city = 'City'
  newEvent.dates = [new Date('2023-12-21T23:00:00.000+00:00')]
  newEvent.startHour = '00:00'
  newEvent.endHour = '00:00'
  newEvent.contactPerson = 'Contact Person'
  newEvent.phoneNumber = '0123456789'
  newEvent.email = ''
  newEvent.btwNumber = '9876543210'
  newEvent.eventWithChildren = false
  newEvent.expectedVisitorStaffCount = 0
  newEvent.mapsLink = ''
  newEvent.mapCoords = [{ corner: 'LeftTop', lat: 0, lng: 0 }]
  newEvent.status = Status.Pending

  return newEvent
}

import gql from 'graphql-tag'

export const ADD_EVENT = gql`
  mutation createEvent($createEventInput: CreateEventInput!) {
    createEvent(createEventInput: $createEventInput) {
      id
      name
      address
      postalCode
      city
      dates
      startHour
      endHour
      contactPerson
      phoneNumber
      email
      btwNumber
      eventWithChildren
      status
      mapsLink
      mapCoords {
        corner
        lat
        lng
      }
    }
  }
`

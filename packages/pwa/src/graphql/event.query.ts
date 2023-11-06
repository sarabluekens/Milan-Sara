import gql from 'graphql-tag'

export const ALL_EVENT = gql`
  query events {
    events {
      id
      name
      address
      postalCode
      city
      dates
      startHour
      endHour
      contactPerson
      phoneNumer
      email
      btwNumber
      eventWithChildren
      mapsLink
      expectedVisitorStaffCount
      createdAt
    }
  }
`

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
      phoneNumber
      email
      btwNumber
      eventWithChildren
      mapsLink
      expectedVisitorStaffCount
      status
      createdAt
    }
  }
`

export const GET_EVENT_BY_ID = gql`
  query event($id: String!) {
    event(id: $id) {
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
      mapsLink
      expectedVisitorStaffCount
      status
      createdAt
    }
  }
`

export const GET_EVENT_BY_STATUS_CLIENT = gql`
  query eventsByStatusAndClient($status: String!, $email: String!) {
    eventsByStatusAndClient(status: $status, email: $email) {
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
      mapsLink
      expectedVisitorStaffCount
      status
      createdAt
    }
  }
`

export const GET_EVENT_BY_STATUS = gql`
  query eventsByStatus($status: String!) {
    eventsByStatus(status: $status) {
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
      mapsLink
      expectedVisitorStaffCount
      status
      createdAt
    }
  }
`

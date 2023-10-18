import {
  createHttpLink,
  ApolloClient,
  InMemoryCache,
} from '@apollo/client/core'

import { setContext } from '@apollo/client/link/context'
import useFirebase from './useFirebase'
import {
  from,
  // ... some imports are already in place here
} from '@apollo/client/core'
import { onError } from '@apollo/client/link/error'
import { logErrorMessages } from '@vue/apollo-util'

// ... more stuff we saw before

const { firebaseUser } = useFirebase()

const httpLink = createHttpLink({
  uri: 'http://[::1]:3001/graphql/',
  credentials: 'same-origin', // includes credentials van httplink in elke request die gestuurd wordt
})

const authLink = setContext(async (_, { headers }) => ({
  headers: {
    ...headers,
    authorization: firebaseUser.value
      ? `Bearer ${await firebaseUser.value?.getIdToken()}`
      : '',
  },
}))

// const apolloClient = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(), //<- this is where the cache is created
// })

// Handle errors
const errorLink = onError(error => {
  if (import.meta.env.DEV) logErrorMessages(error)
})

const apolloClient = new ApolloClient({
  link: from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
})

export default () => {
  return {
    apolloClient,
  }
}

import {
  createHttpLink,
  ApolloClient,
  InMemoryCache,
} from '@apollo/client/core'

const httpLink = createHttpLink({
  uri: 'http://[::1]:3000/graphql/',
})

export default () => {
  const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(), //<- this is where the cache is created
  })

  return {
    apolloClient,
  }
}

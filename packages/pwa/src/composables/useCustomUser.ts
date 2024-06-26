import type { CustomUser } from '@/interfaces/custom.user.interface'
import { ref } from 'vue'
import useFirebase from './useFirebase'
import { provideApolloClient, useQuery } from '@vue/apollo-composable'
import useGraphql from './useGraphql'
import { GET_USER_BY_UID } from '@/graphql/user.query'

const customUser = ref<CustomUser>()
const { firebaseUser } = useFirebase()
const { apolloClient } = useGraphql()

provideApolloClient(apolloClient)

const restoreCustomUser = async () => {
  return new Promise<void>(resolve => {
    const { onResult } = useQuery(GET_USER_BY_UID, {
      uid: firebaseUser.value?.uid,
    })
    onResult(result => {
      if (result.data) {
        console.log(result)
        customUser.value = result.data.userByUid
        console.log(customUser.value)
        resolve()
      }
    })
  })
}

export default () => {
  return {
    customUser,
    restoreCustomUser,
  }
}

<template>
  Dit is de homepage, waar iedereen op terecht komt (zowel administratie als
  bedrijven als random pee'tjes thuis in de zetel)
  <button @click="logoutHandler">logout</button>
</template>

<script lang="ts">
import useFirebase from '@/composables/useFirebase'

export default {
  setup() {
    // Composable
    const { logout, firebaseUser } = useFirebase()

    // Logic

    const logoutHandler = async () => {
      await logout()
    }

    return {
      logoutHandler,
      firebaseUser,
    }
  },
}
</script>

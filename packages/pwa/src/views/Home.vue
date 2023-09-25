<template>
  <h1 v-if="firebaseUser != null">Welcome {{ firebaseUser?.uid }}</h1>
  <h1 v-else>Not logged in</h1>

  <p>
    Dit is de homepage, waar iedereen op terecht komt (zowel administratie als
    bedrijven als random pee'tjes thuis in de zetel)
  </p>
  <button @click="logoutHandler" v-if="firebaseUser != null">logout</button>
  <button @click="loginHandler" v-if="firebaseUser === null">Log in</button>
</template>

<script lang="ts">
import useFirebase from '@/composables/useFirebase'
import router from '@/router'

export default {
  setup() {
    // Composable
    const { logout, firebaseUser } = useFirebase()

    // Logic

    const logoutHandler = async () => {
      await logout()
    }

    const loginHandler = () => {
      router.push({ path: '/auth/login' })
    }

    return {
      logoutHandler,
      loginHandler,
      firebaseUser,
    }
  },
}
</script>

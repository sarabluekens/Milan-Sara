<template>
  <form @submit.prevent="handleLogin" class="w-full">
    <h1>Login</h1>
    <label
      for="email"
      class="text-md block font-semibold tracking-wider text-gray-700 dark:text-gray-200"
    >
      Email address
    </label>
    <input
      type="email"
      name="email"
      id="email"
      class="mt-1 block w-full rounded-md border-2 border-gray-300 p-2 focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-50"
      v-model="loginCredentials.email"
    />
    <label
      for="password"
      class="text-md block font-semibold tracking-wider text-gray-700 dark:text-gray-200"
    >
      Password
    </label>
    <input
      type="password"
      name="password"
      id="password"
      class="mt-1 block w-full rounded-md border-2 border-gray-300 p-2 focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-50"
      v-model="loginCredentials.password"
    />
    <RouterLink
      to="/auth/forgot-password"
      class="mt-1 inline-block rounded text-sm text-blue-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 dark:text-blue-200"
    >
      Forgot password?
    </RouterLink>
    <button
      class="mt-6 w-full rounded-md border-2 border-blue-500 bg-blue-500 py-2 px-4 font-semibold text-white hover:bg-blue-600 focus:outline-none focus-visible:border-blue-300 focus-visible:bg-blue-600 focus-visible:ring-2 focus-visible:ring-blue-300"
    >
      Login
    </button>
    <div class="flex justify-center">
      <RouterLink
        class="mt-3 inline-block rounded text-center text-sm text-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200"
        to="/auth/register"
      >
        Need to create an account?
      </RouterLink>
    </div>
  </form>
</template>

<script lang="ts">
import { ref } from 'vue'
import useFirebase from '@/composables/useFirebase'
import router from '@/router'

export default {
  setup() {
    // Composable
    const { login, firebaseUser } = useFirebase()

    // Logic
    const loginCredentials = ref({
      email: 'milandm2003@gmail.com',
      password: '',
    })

    const handleLogin = () => {
      login(loginCredentials.value.email, loginCredentials.value.password).then(
        () => {
          console.log('Logged in')
          console.log(firebaseUser.value?.uid)
          router.push({ path: '/' })
        },
      )
    }

    // Return
    return {
      loginCredentials,
      firebaseUser,
      handleLogin,
    }
  },
}
</script>

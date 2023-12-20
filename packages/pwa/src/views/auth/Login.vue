<template>
  <div class="flex sm:h-100vh h-90vh md:ml-5rem lg:ml-0rem">
    <form
      @submit.prevent="handleLogin"
      class="flex mx-auto justify-center flex-col"
    >
      <div
        class="border-7 border-red p-2 rounded-xl w-17rem md:w-30rem lg:w-40rem lg:h-25rem"
      >
        <div
          class="border-2 border-red p-4 md:p-9 rounded-lg lg:w-38rem lg:h-23rem"
        >
          <label for="email" class="subbody-red block tracking-wider text-red">
            Email address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email address"
            v-model="loginCredentials.email"
            class="mt-1 block w-52 md:w-full h-12 placeholder:subbody-pink subbody-black rounded-md bg-beige p-2 focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400"
          />
          <span
            class="col-start-2 col-span-4 subbody-red font-bold"
            v-for="error in v$.email.$errors"
            :key="error.$uid"
            >Please fill in your email</span
          >
          <label
            for="password"
            class="subbody-red block tracking-wider text-red mt-6 md:mt-8"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            class="mt-1 block w-52 md:w-full h-12 placeholder:subbody-pink subbody-black rounded-md bg-beige p-2 focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400"
            v-model="loginCredentials.password"
          />
          <span
            class="col-start-2 col-span-4 subbody-red font-bold"
            v-for="error in v$.password.$errors"
            :key="error.$uid"
            >Please fill in your password</span
          >
          <div
            class="flex flex-col-reverse md:flex-row justify-between mt-7 md:mt-11"
          >
            <RouterLink
              to="/auth/forgot-password"
              class="mt-3 md:mt-5 md:mr-11 lg:mr-32 inline-block subbody-black rounded hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200"
            >
              Forgot password?
            </RouterLink>
            <button
              class="mt-1 w-52 rounded-md body-white border-2 border-red bg-red py-2 px-4 font-semibold hover:bg-blue-600 focus:outline-none focus-visible:border-blue-300 focus-visible:bg-blue-600 focus-visible:ring-2 focus-visible:ring-blue-300"
            >
              Login
            </button>
          </div>
        </div>
      </div>
      <div class="flex justify-end mr-4">
        <p class="mt-2 mr-3 subbody-black">No account yet?</p>
        <RouterLink
          class="mt-2 underline inline-block rounded text-center subbody-black hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200"
          to="/auth/register"
        >
          Register
        </RouterLink>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import useFirebase from '@/composables/useFirebase'
import { useRouter } from 'vue-router'
import { GET_USER_BY_UID } from '@/graphql/user.query'
import { useQuery } from '@vue/apollo-composable'
import useValidate from '@vuelidate/core' // validation
import { required, email } from '@vuelidate/validators' // validation

export default {
  setup() {
    // Composable
    const { login, firebaseUser } = useFirebase()
    const { push } = useRouter()

    // Logic
    const loginCredentials = ref({
      email: '',
      password: '',
    })

    // The definition of the validation rules
    const validationRules = {
      email: { required, email },
      password: { required },
    }

    // The vuelidate instance
    const v$ = useValidate(validationRules, loginCredentials)

    const handleLogin = async () => {
      const validationResult = await v$.value.$validate()
      if (validationResult) {
        login(
          loginCredentials.value.email,
          loginCredentials.value.password,
        ).then(() => {
          console.log('Logged in')
          console.log(firebaseUser.value?.uid)
          // push({ path: '/' })
          redirect()
        })
      }
    }

    const redirect = () => {
      return new Promise<void>(resolve => {
        const { onResult } = useQuery(GET_USER_BY_UID, {
          uid: firebaseUser.value?.uid,
        })
        onResult(result => {
          if (result.data) {
            if (result.data.userByUid.role === 'CAREGIVER') {
              push({ path: '/caregiver/dashboard' })
            } else if (result.data.userByUid.role === 'ADMIN') {
              push({ path: '/admin/dashboard' })
            } else if (result.data.userByUid.role === 'COMPANY') {
              push({ path: '/company/dashboard' })
              resolve()
            }
          }
        })
      })
    }
    // Return
    return {
      v$,
      loginCredentials,
      firebaseUser,
      handleLogin,
    }
  },
}
</script>

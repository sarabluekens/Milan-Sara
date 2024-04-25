<template>
  <div
    class="flex flex-col items-center sm:h-100vh h-90vh md:ml-5rem lg:ml-0rem"
  >
    <h1 class="title-red my-3 md:my-0 lg:my-5">Register</h1>
    <form
      @submit.prevent="handleRegister"
      class="flex mx-auto justify-center flex-col"
    >
      <div v-if="error">
        <p class="text-red-600">{{ error.message }}</p>
      </div>

      <div
        class="border-7 border-red p-2 rounded-xl w-17rem md:w-30rem lg:w-40rem lg:h-37rem"
      >
        <div
          class="border-2 border-red p-4 lg:p-9 rounded-lg lg:w-38rem lg:h-35rem"
        >
          <label
            for="nickname"
            class="subbody-red block tracking-wider text-red"
          >
            Name
          </label>
          <input
            type="text"
            name="nickname"
            id="nickname"
            placeholder="Nickname"
            class="mt-1 block w-52 md:w-full h-12 placeholder:subbody-pink subbody-black rounded-md bg-beige p-2 focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400"
            v-model="newUser.name"
          />
          <span
            class="subbody-red font-bold"
            v-for="error in v$.name.$errors"
            :key="error.$uid"
            >Please fill in your username</span
          >
          <label
            for="email"
            class="subbody-red block tracking-wider text-red mt-4 md:mt-6 lg:mt-8"
          >
            Email address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email address"
            class="mt-1 block w-52 md:w-full h-12 placeholder:subbody-pink subbody-black rounded-md bg-beige p-2 focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400"
            v-model="newUser.email"
          />
          <span
            class="subbody-red font-bold"
            v-for="error in v$.email.$errors"
            :key="error.$uid"
            >Please fill in your email</span
          >
          <label
            for="password"
            class="subbody-red block tracking-wider text-red mt-4 md:mt-6 lg:mt-8"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            class="mt-1 block w-52 md:w-full h-12 placeholder:subbody-pink subbody-black rounded-md bg-beige p-2 focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400"
            v-model="newUser.password"
          />
          <span
            class="subbody-red font-bold"
            v-for="error in v$.password.$errors"
            :key="error.$uid"
            >Please fill in your password</span
          >
          <div class="flex justify-center items-center flex-col">
            <button
              :disabled="addUserLoading"
              class="mt-6 lg:mt-11 w-52 lg:w-72 rounded-md body-white border-2 border-red bg-red py-2 px-4 font-semibold hover:bg-blue-600 focus:outline-none focus-visible:border-blue-300 focus-visible:bg-blue-600 focus-visible:ring-2 focus-visible:ring-blue-300"
            >
              <template v-if="!addUserLoading">Register</template>
              <Loader2 v-else class="animate-spin" />
            </button>
            <RouterLink
              class="mt-3 underline inline-block rounded subbody-black hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200"
              to="/auth/login"
            >
              Already have an account?
            </RouterLink>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { type AuthError } from 'firebase/auth'

import useFirebase from '@/composables/useFirebase'
import useCustomUser from '@/composables/useCustomUser'
import { useMutation } from '@vue/apollo-composable'
import { ADD_USER } from '@/graphql/user.mutation'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import type { CustomUser } from '@/interfaces/custom.user.interface'
import { Loader2 } from 'lucide-vue-next'
import { GET_USER_BY_UID } from '@/graphql/user.query'
import { useQuery } from '@vue/apollo-composable'
import useValidate from '@vuelidate/core' // validation
import { required, email } from '@vuelidate/validators' // validation

export default {
  setup() {
    // Composables
    const { register, firebaseUser } = useFirebase()
    const { locale } = useI18n()
    const { customUser } = useCustomUser()
    const { push } = useRouter()

    const newUser = ref({
      name: '',
      password: '',
      email: '',
    })

    // The definition of the validation rules
    const validationRules = {
      name: { required },
      password: { required },
      email: { required, email },
    }

    // The vuelidate instance
    const v$ = useValidate(validationRules, newUser)

    const error = ref<AuthError | null>(null)
    const { mutate: addUser, loading: addUserLoading } =
      useMutation<CustomUser>(ADD_USER)
    const handleRegister = async () => {
      const validationResult = await v$.value.$validate()
      if (validationResult) {
        register(
          newUser.value.name,
          newUser.value.email,
          newUser.value.password,
        )
          .then(() => {
            addUser({
              createUserInput: {
                locale: locale.value,
                name: newUser.value.name,
                email: newUser.value.email,
              },
            }).then(result => {
              if (!result?.data) throw new Error('Custom user creation failed.')

              customUser.value = result.data
              redirect()
            })
          })
          .catch(err => {
            error.value = err
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
            if (result.data.userByUid.role === 'COMPANY') {
              push({ path: '/company/dashboard' })
              resolve()
            } else {
              push({ path: '/' })
            }
          }
        })
      })
    }

    return {
      v$,
      newUser,
      error,
      addUserLoading,
      handleRegister,
    }
  },
  components: { Loader2 },
}
</script>

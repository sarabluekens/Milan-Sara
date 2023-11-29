<template>
  <article class="ml-5rem bg-white w-full">
    <h1 class="title-red">Help is on the way!</h1>
    <p class="subtitle-red">How can we reach the patient?</p>
    <section>
      <form
        @submit.prevent="submitHandler"
        class="flex flex-col justify-center items-center w-60rem m-auto border-2 border-red rounded-xl p-3 m-3 w-1/4"
      >
        <div class="flex flex-row gap-3vw items-start">
          <div class="flex flex-col w-20rem">
            <label for="firstname" class="body-black mt-1vh">Last Name</label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              required
              class="bg-beige h-4vh"
              v-model="victimInput.lastName"
            />
          </div>
          <div class="flex flex-col w-20rem">
            <label for="lastname" class="body-black mt-1vh">First Name</label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              class="bg-beige h-4vh"
              required
              v-model="victimInput.firstName"
            />
          </div>
        </div>
        <div class="flex flex-row gap-3vw mt-3vh w-60vw">
          <div class="flex flex-col w-30rem">
            <label for="email" class="body-black mt-1vh">Email address</label>
            <input
              type="email"
              name="email"
              id="email"
              class="bg-beige h-4vh"
              required
              v-model="victimInput.email"
            />
          </div>
          <div class="flex flex-col w-20rem">
            <label for="number" class="body-black mt-1vh">Phone number</label>
            <input
              type="phone"
              name="phone"
              id="phone"
              class="bg-beige h-4vh"
              required
              v-model="victimInput.phoneNumber"
            />
          </div>
        </div>
        <button
          class="bg-red rounded rounded-md px-10 py-3 body-white self-end mt-3vh"
        >
          Send
        </button>
      </form>
    </section>

    <section class="flex flex-wrap justify-center items-center">
      <Map />
    </section>
  </article>
</template>

<script setup lang="ts">
import useRealtime from '@/composables/useRealtime'
import Map from '../../../components/Map.vue'
import type { Victim } from '@/interfaces/victim.interface'

import { ref } from 'vue'
import { useMutation, useQuery } from '@vue/apollo-composable'
import { GET_VICTIM_BY_NAME } from '@/graphql/victim.query'
import { ADD_VICTIM } from '@/graphql/victim.mutation'

const { once } = useRealtime()
const send = ref<boolean>(false)
const { mutate: addVictim } = useMutation(ADD_VICTIM)
const caseInput = ref({
  date: new Date(),
  typeAccident: '',
  eventId: 'tempEventId2',
})

const victimInput = ref({
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
})

const submitHandler = async () => {
  console.log('submit')
  // const {
  //   result: victim,
  //   loading: loadingVictim,
  //   error,
  // } = useQuery(GET_VICTIM_BY_NAME, {
  //   firstName: victimInput.value.firstName,
  //   lastName: victimInput.value.lastName,
  // })

  // if (victim.value) {
  //   console.log(victim.value)
  //   // caseInput.value.victimId = victim.value.id
  //   console.log(caseInput.value)
  // } else {
  //   console.log('no victim found')
  // }

  const result = await addVictim({
    victimInput: victimInput.value,
  })

  console.log('result', result?.data?.createVictim as Victim)

  return {
    victimInput,
    submitHandler,
  }
}
</script>

<style scoped>
/* Your CSS styles here */
</style>

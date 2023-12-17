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
        </div>
        <div class="flex flex-row gap-3vw mt-3vh w-60vw">
          <div class="flex flex-col w-30rem">
            <label for="email" class="body-black mt-1vh">Email address</label>
            <input
              type="email"
              name="email"
              id="email"
              class="bg-beige h-4vh"
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
      <EmergencyMap size="small" />
    </section>
  </article>
</template>

<script setup lang="ts">
import type { Victim } from '@/interfaces/victim.interface'

import { ref } from 'vue'
import { useLazyQuery, useMutation, useQuery } from '@vue/apollo-composable'
import { GET_VICTIM_BY_NAME } from '@/graphql/victim.query'
import { ADD_VICTIM_TO_CASE } from '@/graphql/case.mutation'
import { ADD_VICTIM, ADD_CASE_TO_VICTIM } from '@/graphql/victim.mutation'
import { useRouter } from 'vue-router'
import EmergencyCategory from './emergencyCategory.vue'
import EmergencyMap from '@/components/EmergencyMap.vue'

const { mutate: addVictim } = useMutation(ADD_VICTIM)
const { mutate: addVictimIdToCase } = useMutation(ADD_VICTIM_TO_CASE)
const { mutate: addCaseToVictim } = useMutation(ADD_CASE_TO_VICTIM)

const router = useRouter()

const victimInput = ref({
  firstName: ''.toLowerCase(),
  lastName: ''.toLowerCase(),
  email: '',
  phoneNumber: '',
  caseId: router.currentRoute.value.params.caseId as string,
})

/////// VICTIM HANDLER ////////

// Prepare een useLazyQuery voor de submit
const { load, refetch } = useLazyQuery(GET_VICTIM_BY_NAME, () => ({
  firstName: victimInput.value.firstName,
  lastName: victimInput.value.lastName,
}))

// Add victimId to case
const updateCase = async (caseId: string, victimId: string) => {
  const caseUpdate = await addVictimIdToCase({
    updateCaseInput: {
      caseId: caseId,
      victimId: victimId,
    },
  })
  console.log('case update:', caseUpdate)
}

const updateVictim = async (caseId: string, victimId: string) => {
  const victimUpdate = await addCaseToVictim({
    updateVictimInput: {
      victimId: victimId,
      caseId: caseId,
    },
  })
  console.log('victim update:', victimUpdate)
}

const submitHandler = async () => {
  // voer de lazyQuery uit
  console.log('victimInput:', victimInput.value)
  const victim: Victim | boolean = await load()

  // bij de eerste druk op submit is victim = true
  if (victim) {
    // no victim found
    if (Object(victim).getVictimByName === null) {
      console.log('victim does not yet exist')

      // add victim
      const newVictim = await addVictim({
        victimInput: victimInput.value,
      })
      console.log('1st new victim:', newVictim)

      console.log('new victim:', Object(newVictim).data.createVictim.id)

      // add victimId to case
      await updateCase(
        victimInput.value.caseId.toString() as string,
        Object(newVictim).data.createVictim.id,
      )
      return newVictim
    } else {
      //id van bestaand victim ophalen
      console.log('1st victim: ', victim)
      console.log('victim:', Object(victim).getVictimByName.id)

      // add victimId to case
      await updateCase(
        victimInput.value.caseId.toString() as string,
        Object(victim).getVictimByName.id,
      )

      // add caseId to victim
      await updateVictim(
        victimInput.value.caseId.toString() as string,
        Object(victim).getVictimByName.id,
      )
    }
  } else {
    // refetch als de victim false is (2e keer op submit gedrukt)
    console.log('nog een keer gesubmit')
    const victim = await refetch()

    // no victim found
    if (Object(victim).data.getVictimByName === null) {
      console.log('victim does not yet exist')

      // add victim
      const newVictim = await addVictim({
        victimInput: victimInput.value,
      })
      console.log('2nd new victim: ', newVictim)
      console.log('new victim:', Object(newVictim).data.createVictim.id)

      // add victimId to case
      await updateCase(
        victimInput.value.caseId.toString() as string,
        Object(newVictim).data.createVictim.id,
      )
    } else {
      //id van bestaand victim ophalen
      console.log('2nd victim: ', victim)
      console.log('victim: ', Object(victim).data.getVictimByName.id)

      // add victimId to case
      await updateCase(
        victimInput.value.caseId.toString() as string,
        Object(victim).data.getVictimByName.id,
      )

      // add caseId to victim
      await updateVictim(
        victimInput.value.caseId.toString() as string,
        Object(victim).data.getVictimByName.id,
      )
    }
  }
  console.log('submit')
}
///// END VICTIM HANDLER ////////
</script>

<style scoped></style>

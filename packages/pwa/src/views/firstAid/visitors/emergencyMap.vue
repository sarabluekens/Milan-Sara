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
      <Map />
    </section>
  </article>
</template>

<script setup lang="ts">
import useRealtime from '@/composables/useRealtime'
import Map from '../../../components/Map.vue'
import type { Victim } from '@/interfaces/victim.interface'

import { ref } from 'vue'
import { useLazyQuery, useMutation, useQuery } from '@vue/apollo-composable'
import { GET_VICTIM_BY_NAME } from '@/graphql/victim.query'
import { ADD_VICTIM } from '@/graphql/victim.mutation'
import { ADD_VICTIM_TO_CASE } from '@/graphql/case.mutation'
import { computed } from 'vue'
import { onMounted } from 'vue'

const { once } = useRealtime()
const send = ref<boolean>(false)
const { mutate: addVictim } = useMutation(ADD_VICTIM)
const { mutate: addCaseIdToVictim } = useMutation(ADD_VICTIM_TO_CASE)

const victimInput = ref({
  firstName: ''.toLowerCase(),
  lastName: ''.toLowerCase(),
  email: '',
  phoneNumber: '',
})

/////// VICTIM HANDLER ////////

// Prepare een useLazyQuery voor de submit
const { load, refetch } = useLazyQuery(GET_VICTIM_BY_NAME, () => ({
  firstName: victimInput.value.firstName,
  lastName: victimInput.value.lastName,
}))

const updateCase = async (caseId: string, victimId: string) => {
  const caseUpdate = await addCaseIdToVictim({
    updateCaseInput: {
      caseId: caseId,
      victimId: victimId,
    },
  })
  console.log('case update:', caseUpdate)
}

// const victimHandler = async (victim: Object) => {
//   {
//     // db returns null if no victim is found
//     if (victim === null) {
//       console.log('victim does not yet exist')
//       // voeg een nieuwe victim toe
//       const newVictim = await addVictim({
//         victimInput: victimInput.value,
//       })
//       console.log('new victim:', newVictim?.data?.createVictim?.id)

//       await updateCase('656705eebb451fdab99652f8', '655cc47db6a5180d6649f8b4')
//       return newVictim
//     } else {
//       // id van bestaand victim ophalen
//       console.log('found victim:', Object(victim).id)
//       await updateCase('656705eebb451fdab99652f8', '655cc47db6a5180d6649f8b4')
//       console.log('updated case:', updateCase)
//       return victim
//     }
//   }
// }

const submitHandler = async () => {
  // voer de query uit
  console.log('victimInput:', victimInput.value)
  const victim: Victim | boolean = await load()
  // bij de eerste druk op submit is victim = true
  if (victim) {
    if (Object(victim).getVictimByName === null) {
      console.log('victim does not yet exist')
      const newVictim = await addVictim({
        victimInput: victimInput.value,
      })
      console.log('1st new victim:', newVictim)

      console.log('new victim:', Object(newVictim).data.createVictim.id)
      await updateCase(
        '656705eebb451fdab99652f8',
        Object(newVictim).data.createVictim.id,
      )
      return newVictim
    } else {
      // id van bestaand victim ophalen
      console.log('1st victim: ', victim)
      console.log('victim:', Object(victim).getVictimByName.id)
      await updateCase(
        '656705eebb451fdab99652f8',
        Object(victim).getVictimByName.id,
      )
    }
  } else {
    // refetch als de victim false is (2e keer op submit gedrukt)
    console.log('nog een keer gesubmit')
    const victim = await refetch()
    if (Object(victim).data.getVictimByName === null) {
      console.log('victim does not yet exist')
      const newVictim = await addVictim({
        victimInput: victimInput.value,
      })
      console.log('2nd new victim: ', newVictim)
      console.log('new victim:', Object(newVictim).data.createVictim.id)
      await updateCase(
        '656705eebb451fdab99652f8',
        Object(newVictim).data.createVictim.id,
      )
    } else {
      // id van bestaand victim ophalen
      console.log('2nd victim: ', victim)
      console.log('victim: ', Object(victim).data.getVictimByName.id)
      await updateCase(
        '656705eebb451fdab99652f8',
        Object(victim).data.getVictimByName.id,
      )
    }
  }
  console.log('submit')
}

///// END VICTIM HANDLER ////////
</script>

<style scoped></style>

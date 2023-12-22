<template>
  <article class="sm:ml-3rem bg-white h-100vh">
    <h1 class="title-red">{{ $t('map.title') }}</h1>
    <p class="subtitle-red">{{ $t('map.subtitle') }}</p>
    <section v-if="!sent">
      <form
        @submit.prevent="submitHandler"
        class="m-auto border-2 border-red rounded-xl p-3 w-80%"
      >
        <div
          class="m-auto w-3/4 md:w-full md:justify-center flex flex-col md:gap-10 md:flex-row"
        >
          <div class="flex flex-col md:w-1/3">
            <label for="lastname" class="body-black mt-1vh">{{
              $t('map.form.firstname')
            }}</label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              class="bg-beige h-4vh w-full"
              v-model="victimInput.firstName"
            />
            <span
              class="ml-2 subbody-red font-bold"
              v-for="error in v$.firstName.$errors"
              :key="error.$uid"
              >Please fill in your first name</span
            >
          </div>
          <div class="flex flex-col md:w-1/3">
            <label for="firstname" class="body-black mt-1vh">{{
              $t('map.form.lastname')
            }}</label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              class="bg-beige h-4vh w-full"
              v-model="victimInput.lastName"
            />
            <span
              class="subbody-red font-bold"
              v-for="error in v$.lastName.$errors"
              :key="error.$uid"
              >Please fill in your last name</span
            >
          </div>
        </div>

        <!-- halfwaydiv -->
        <div
          class="m-auto w-3/4 md:w-full md:justify-center flex flex-col md:gap-10 md:flex-row"
        >
          <div class="flex flex-col md:w-1/3">
            <label for="email" class="body-black mt-1vh">{{
              $t('map.form.address')
            }}</label>
            <input
              type="email"
              name="email"
              id="email"
              class="bg-beige h-4vh w-full"
              v-model="victimInput.email"
            />
          </div>
          <span
            class="ml-3 subbody-red font-bold"
            v-for="error in v$.email.$errors"
            :key="error.$uid"
            >Please fill in an email address</span
          >
          <div class="flex flex-col md:w-1/3">
            <label for="number" class="body-black mt-1vh"
              >{{ $t('map.form.phonenumber') }} (+32)</label
            >
            <input
              type="phone"
              name="phone"
              id="phone"
              class="bg-beige h-4vh w-full"
              v-model="victimInput.phoneNumber"
            />
          </div>
          <span
            class="ml-3 subbody-red font-bold"
            v-for="error in v$.phoneNumber.$errors"
            :key="error.$uid"
            >Please fill in a valid phonenumber starting with +32
          </span>
        </div>
        <div class="flex w-&0%">
          <button
            class="bg-red m-auto rounded-md px-10 py-3 body-white mt-3vh right-0"
          >
            {{ $t('map.form.button') }}
          </button>
        </div>
      </form>
    </section>
    <section v-if="sent" class="w-full my-2vh">
      <img class="m-auto" src="/check.png" alt="succesfully submitted!" />
      <p class="body-red text-center">{{ $t('map.form.succes') }}</p>
    </section>

    <section class="flex flex-wrap justify-center items-center m-4">
      <EmergencyMapComponent size="small" />
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
import EmergencyMapComponent from '@/components/EmergencyMapComponent.vue'
import useValidate from '@vuelidate/core' // validation
import { required, email } from '@vuelidate/validators'

const { mutate: addVictim } = useMutation(ADD_VICTIM)
const { mutate: addVictimIdToCase } = useMutation(ADD_VICTIM_TO_CASE)
const { mutate: addCaseToVictim } = useMutation(ADD_CASE_TO_VICTIM)

const router = useRouter()
const sent = ref(false)
const victimInput = ref({
  firstName: ''.toLowerCase(),
  lastName: ''.toLowerCase(),
  email: '',
  phoneNumber: '',
  caseId: router.currentRoute.value.params.caseId as string,
})

const validationRules = {
  firstName: { required },
  lastName: { required },
  email: { required, email },
  phoneNumber: { required },
}

const v$ = useValidate(validationRules, victimInput)

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
  const validationResult = await v$.value.$validate()
  if (validationResult) {
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
  }
  console.log('submit')
  sent.value = true
}
///// END VICTIM HANDLER ////////
</script>

<style scoped></style>

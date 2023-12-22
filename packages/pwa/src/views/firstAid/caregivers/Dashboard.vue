<template>
  <section class="md:ml-10rem bg-beige w-auto h-100vh">
    <h1 class="title-red md:text-[4rem] mb-4rem">
      Welcome back, {{ firebaseUser?.displayName }}
    </h1>
    <p class="subtitle-black text-left ml-20vw">Waiting Cases</p>
    <section
      v-if="!loadingCases && result.length > 0"
      v-for="item in [...liveCases, ...result]"
      class="m-3 flex flex-row justify-center items-center w-full"
    >
      <h2 class="hidden">Case card</h2>
      <div
        class="rounded-xl border-2 border-red p-3 flex flex-row justify-between items-center w-50vw mr-3"
      >
        <div class="w-5vw flex">
          <p
            v-show="item.typeAccident === 'unconscious'"
            class="body-red px-2 self-end py-1 border-2 border-red rounded-lg m-0 w-4rem md:w-6rem"
          >
            Urgent!
          </p>
        </div>
        <h1
          class="body-black"
          :class="item.typeAccident === 'unconscious' ? 'ml-3rem' : 'ml-5.5rem'"
        >
          {{ item.typeAccident }}
        </h1>
        <p class="body-pink opacity-0 md:opacity-100">{{ item.id }}</p>

        <div class="rounded-xl w-1rem h-1rem bg-pink"></div>
      </div>
      <button
        class="bg-red body-beige rounded-lg p-3"
        @click="handleClick(item.id)"
      >
        Take Case
      </button>
    </section>
    <section
      v-if="!loadingCases && result.length === 0"
      class="w-90vw m-auto pt-5rem"
    >
      <h1 class="subtitle-red m-auto">No cases are awaiting your assistance</h1>
      <img
        src="/break.png"
        class="lg:ml-17rem w-40rem opacity-30"
        width="200"
        height="200"
        alt="no cases found"
      />
    </section>
  </section>
</template>

<script lang="ts">
import { CASES_BY_EVENT_ID } from '@/graphql/case.query'
import { useMutation, useQuery } from '@vue/apollo-composable'
import { computed } from 'vue'
import type { Case } from '@/interfaces/case.interface'
import { ref } from 'vue'
import useRealtime from '@/composables/useRealtime'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import { onMounted } from 'vue'
import useFirebase from '@/composables/useFirebase'
import { CHANGE_CASE_STATUS } from '@/graphql/case.mutation'
import { CAREGIVER_BY_USER_UID } from '@/graphql/caregiver.query'

export default {
  setup() {
    const { firebaseUser } = useFirebase()

    const { result: caregiverResult } = useQuery(CAREGIVER_BY_USER_UID, {
      userUid: firebaseUser.value?.uid,
    })
    const {
      result: cases,
      loading: loadingCases,
      error,
    } = useQuery(CASES_BY_EVENT_ID, {
      userUid: firebaseUser.value?.uid,
    })

    const newCase = ref<Case | null>()
    const liveCases = ref<Case[]>([])

    const $toast = useToast()

    const { on } = useRealtime()
    const { emit } = useRealtime()
    const { push } = useRouter()
    const { mutate: addCaregiverCo } = useMutation(CHANGE_CASE_STATUS)

    on('case:new', (data: Partial<Case>) => {
      console.log('New case added by a patient', data)
      newCase.value = data as Case
      liveCases.value.push(data as Case)
      console.log(newCase.value)

      console.log('time for a toast HERE', liveCases.value)

      // popups

      $toast.warning('New case!', {
        position: 'top-right',
        duration: 2000,
        dismissible: true,
        pauseOnHover: true,
        onClick: () => {
          push({ path: `/caregiver/dashboard` })
        },
      })
    })

    const handleClick = async (id: string) => {
      console.log(caregiverResult)

      emit('case:joined', id)
      push({ path: `/caregiver/map/${id}` })

      const result = await addCaregiverCo({
        caseInput: {
          caseId: id,
          caregiverId: caregiverResult.value?.findOneByUserUid.id,
        },
      })
    }
    onMounted(() => {
      console.log('mounted')

      $toast.clear()
    })

    return {
      result: computed<Case[]>(() => cases.value.findCasesForCaregiverToday),
      loadingCases,
      liveCases,
      handleClick,
      firebaseUser,
    }
  },
}
</script>
<style>
.v-toast__item .v-toast__text {
  color: #f5e9e9 !important;
  background-color: #a60c0c !important;
  font-size: 3vh !important;
  padding: 2vh !important;
}

.v-toast__item--warning {
  color: #f5e9e9 !important;
  background-color: #a60c0c !important;
}

.v-toast__item.v-toast__item--warning .v-toast__icon {
  background: url(/warning.svg) no-repeat center center / contain !important;
  color: #f5e9e9 !important;
  background-color: #a60c0c !important;
  width: 5vw !important;
  height: 5vh !important;
}
</style>

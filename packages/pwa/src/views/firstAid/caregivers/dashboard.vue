<template>
  <section class="ml-10rem bg-beige w-full h-100vh">
    <h1 class="title-red mb-4rem">Welcome back, Sara</h1>
    <p class="subtitle-black text-left ml-20vw">Waiting Cases</p>
    <section
      v-if="!loadingCases"
      v-for="item in [...liveCases, ...result]"
      class="m-3 flex flex-row justify-center items-center w-full"
    >
      <h2 class="hidden">Case card</h2>
      <div
        class="rounded-xl border-2 border-red p-3 flex flex-row justify-between items-center w-50vw mr-3"
      >
        <div class="w-5vw">
          <p
            v-show="item.typeAccident === 'unconscious'"
            class="body-red px-2 py-1 border-2 border-red rounded-lg m-0"
          >
            Urgent!
          </p>
        </div>
        <h1 class="body-black">{{ item.typeAccident }}</h1>
        <p class="body-pink">{{ item.date }}</p>

        <div class="rounded-xl w-1rem h-1rem bg-pink"></div>
      </div>
      <button class="bg-red body-beige rounded-lg p-3">Take Case</button>
    </section>
  </section>
</template>

<script lang="ts">
import { ALL_CASES } from '@/graphql/case.query'
import { useQuery } from '@vue/apollo-composable'
import { computed } from 'vue'
import type { Case } from '@/interfaces/case.interface'
import { ref } from 'vue'
import useRealtime from '@/composables/useRealtime'

export default {
  setup() {
    const { result: cases, loading: loadingCases, error } = useQuery(ALL_CASES)

    const newCase = ref<Case | null>()
    const liveCases = ref<Case[]>([])

    const { on } = useRealtime()

    on('case:new', (data: Partial<Case>) => {
      console.log('New case added by a patient', data)

      newCase.value = data as Case
      liveCases.value.push(data as Case)
    })

    // const convertformat = (date: any) => {
    //   let curr_dt = date
    //   let form_dt = curr_dt
    //   console.log(form_dt)

    //   return format(date, 'dd.MM.yyyy') // 2022-01-13T14:06:33.612Z

    //   return form_dt
    // }yà^%
    // const convertformat = (dateString: Date) => {
    //   const date = dateString
    //   // Then specify how you want your dates to be formatted
    //   return new Intl.DateTimeFormat('default', { dateStyle: 'short' }).format(
    //     date,
    //   )
    // }
    return {
      // todo interface maken voor case
      result: computed<Case[]>(() => cases.value.cases),
      loadingCases,
      liveCases,
      // convertformat,
    }
  },
}

// read param
</script>

<style scoped>
/* Your CSS styles here */
</style>

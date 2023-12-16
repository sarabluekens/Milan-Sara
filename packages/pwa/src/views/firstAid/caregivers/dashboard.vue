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
      <button
        class="bg-red body-beige rounded-lg p-3"
        @click="handleClick(item.id)"
      >
        Take Case
      </button>
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
import { useRouter } from 'vue-router'
import { Socket } from 'socket.io-client'

export default {
  setup() {
    const { result: cases, loading: loadingCases, error } = useQuery(ALL_CASES)

    const newCase = ref<Case | null>()
    const liveCases = ref<Case[]>([])

    const { on } = useRealtime()
    const { emit } = useRealtime()
    const { push } = useRouter()

    on('case:new', (data: Partial<Case>) => {
      console.log('New case added by a patient', data)
      newCase.value = data as Case
      liveCases.value.push(data as Case)
      console.log(newCase.value)
    })

    const handleClick = async (id: string) => {
      console.log(id)
      emit('case:joined', id)
      push({ path: `/caregiver/map/${id}` })
    }
    return {
      result: computed<Case[]>(() => cases.value.cases),
      loadingCases,
      liveCases,
      handleClick,
    }
  },
}
</script>

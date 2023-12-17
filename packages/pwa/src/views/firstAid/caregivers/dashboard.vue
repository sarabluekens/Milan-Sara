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
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import { onMounted } from 'vue'

export default {
  setup() {
    const { result: cases, loading: loadingCases, error } = useQuery(ALL_CASES)

    const newCase = ref<Case | null>()
    const liveCases = ref<Case[]>([])

    const $toast = useToast()

    const { on } = useRealtime()
    const { emit } = useRealtime()
    const { push } = useRouter()

    on('case:new', (data: Partial<Case>) => {
      console.log('New case added by a patient', data)
      newCase.value = data as Case
      liveCases.value.push(data as Case)
      console.log(newCase.value)

      console.log('time for a toast HEEEEEEEEEERE')

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
      console.log(id)
      emit('case:joined', id)
      push({ path: `/caregiver/map/${id}` })
    }

    onMounted(() => {
      console.log('mounted')
      $toast.clear()
    })
    return {
      result: computed<Case[]>(() => cases.value.cases),
      loadingCases,
      liveCases,
      handleClick,
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

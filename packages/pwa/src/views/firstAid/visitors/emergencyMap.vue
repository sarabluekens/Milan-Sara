<template>
  <section class="ml-5rem bg-beige w-full h-100vh">
    <h1 class="title-red mb-4rem">Welcome back, Sara</h1>
    <p class="subtitle-black text-left ml-20vw">Waiting Cases</p>
    <section
      v-if="result.cases.length > 0"
      v-for="item in result.cases"
      class="m-3 flex flex-row justify-center items-center w-full"
    >
      <h2 class="hidden">Case card</h2>
      <div
        class="rounded-xl border-2 border-red p-3 flex flex-row justify-between items-center w-50vw mr-3"
      >
        <div class="w-5vw">
          <p
            v-show="item.priority == 1"
            class="body-red px-2 py-1 border-2 border-red rounded-lg m-0"
          >
            Urgent!
          </p>
        </div>
        <h1 class="body-black">{{ item.typeAccident }}</h1>
        <p>{{ item.priority }}</p>
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

export default {
  setup() {
    const { result: defaultCases, loading, error } = useQuery(ALL_CASES)
    return {
      result: defaultCases,
    }
  },
}

// read param
</script>

<style scoped>
/* Your CSS styles here */
</style>

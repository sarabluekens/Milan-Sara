<template>
  <div class="ml-7rem">
    <h1>Emergency Map</h1>
    <div v-for="item in result.cases" class="bg-red rounded-xl p-3 m-3 w-1/4">
      <h1>{{ item.typeAccident }}</h1>
      <p>{{ item.priority }}</p>
      <p>{{ item.date }}</p>
    </div>
    <p></p>
  </div>
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

<template>
  <div class="ml-3.5rem md:ml-5rem bg-beige h-100vh">
    <h1 class="title-black mb-4">Staff overview</h1>
    <section class="flex flex-col mx-auto w-1/2">
      <input
        placeholder="Search staff..."
        class="border-2 border-red w-full my-3 h-10 bg-beige rounded-xl px-2"
      />
      <div class="flex justify-start gap-4">
        <button class="bg-red body-white w-36 h-7 rounded-full">All</button>
        <button class="bg-red body-white w-36 h-7 rounded-full">Doctor</button>
        <button class="bg-red body-white w-36 h-7 rounded-full">Nurse</button>
        <button class="bg-red body-white w-36 h-7 rounded-full">
          Paramedic
        </button>
      </div>
    </section>
    <section
      class="grid grid-cols-4 gap-5 mx-auto my-10 w-1/2 text-center justify-between"
    >
      <div v-if="caregivers" v-for="caregiver in caregivers.caregivers">
        <StaffCard :caregiver="caregiver" />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { ALL_CAREGIVERS } from '@/graphql/caregiver.query'
import StaffCard from '@/components/StaffCard.vue'

export default {
  components: { StaffCard },
  setup() {
    const {
      loading: caregiverLoading,
      result: caregivers,
      error: caregiverError,
    } = useQuery(ALL_CAREGIVERS)
    return {
      caregiverLoading,
      caregivers: caregivers,
      caregiverError,
    }
  },
}
</script>

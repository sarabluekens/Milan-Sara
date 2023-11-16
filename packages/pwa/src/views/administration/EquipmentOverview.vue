<template>
  <div class="ml-3.5rem md:ml-5rem bg-beige h-100vh">
    <h1 class="title-black">Equipment overview</h1>
    <section class="flex flex-row mx-auto w-1/2">
      <input
        placeholder="Search staff..."
        class="border-1 border-red w-full mt-3 h-10 ml-3 bg-beige"
      />
    </section>
    <section
      class="grid grid-cols-4 gap-5 mx-auto my-10 w-1/2 text-center justify-between"
    >
      <div v-if="equipmentLoading">Loading</div>
      <div v-if="equipmentError">{{ equipmentError }}</div>
      <div
        v-if="equipments"
        v-for="equipment in equipments.equipments"
        class="text-black w-56 h-18 bg-white"
      >
        <p class="body-black">{{ equipment.name }}</p>
        <p class="subbody-black">{{ equipment.category }}</p>
        <p class="subbody-black">Amount: {{ equipment.totalStock }}</p>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { ALL_EQUIPMENT } from '@/graphql/equipment.query'

export default {
  setup() {
    const {
      result: equipments,
      loading: equipmentLoading,
      error: equipmentError,
    } = useQuery(ALL_EQUIPMENT)
    console.log(equipments)
    return {
      equipments: equipments,
      equipmentLoading,
      equipmentError,
    }
  },
}
</script>

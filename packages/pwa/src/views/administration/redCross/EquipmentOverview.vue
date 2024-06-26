<template>
  <div class="md:ml-11rem bg-beige h-100vh">
    <h1 class="title-black md:subtitle-black md:mb-2 lg:ml-5">
      Equipment overview
    </h1>
    <section class="flex flex-col mx-auto w-72 lg:w-2/3 xl:w-1/2">
      <input
        placeholder="Search staff..."
        class="border-2 border-red w-full my-3 h-10 bg-beige rounded-xl px-2"
        v-model="searchInput"
        @input="handleSearch"
      />
      <div class="flex justify-start gap-2 lg:gap-4">
        <button
          @click="handleFilter('All')"
          class="flex justify-center items-center bg-red body-white w-36 h-7 rounded-full py-4"
        >
          All
        </button>
        <button
          @click="handleFilter('Ointment')"
          class="flex justify-center items-center bg-red body-white w-36 h-7 rounded-full py-4"
        >
          Ointment
        </button>
        <button
          @click="handleFilter('Pill')"
          class="flex justify-center items-center bg-red body-white w-36 h-7 rounded-full py-4"
        >
          Pill
        </button>
        <button
          @click="handleFilter('Bandage')"
          class="flex justify-center items-center bg-red body-white w-36 h-7 rounded-full py-4"
        >
          Bandage
        </button>
      </div>
    </section>
    <section
      class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-x-23 lg:gap-x-32 xl:gap-5 mx-auto my-10 w-2/3 xl:w-1/2 text-center justify-between"
    >
      <div v-if="equipmentLoading">Loading</div>
      <div v-if="equipmentError">{{ equipmentError }}</div>
      <div
        v-if="equipments && !filteredEquipments.length && isFiltered"
        v-for="equipmentItem in equipments.equipments"
        :key="equipmentItem.id"
      >
        <EquipmentCard :equipment="equipmentItem" />
      </div>
      <div
        v-if="filteredEquipments.length && isFiltered"
        v-for="equipment in filteredEquipments"
        :key="equipment.id"
      >
        <EquipmentCard :equipment="equipment" />
      </div>
      <div v-if="!isFiltered" class="text-black w-56 h-18 bg-white">
        <p class="body-black">No results found</p>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { ALL_EQUIPMENT } from '@/graphql/equipment.query'
import type { Equipment } from '@/interfaces/equipment.interface'
import { ref } from 'vue'
import EquipmentCard from '@/components/EquipmentCard.vue'

export default {
  components: { EquipmentCard },
  setup() {
    const searchInput = ref('')
    const filteredEquipments = ref<Equipment[]>([])
    const isFiltered = ref(true)

    const {
      result: equipments,
      loading: equipmentLoading,
      error: equipmentError,
    } = useQuery(ALL_EQUIPMENT)

    const handleSearch = () => {
      if (searchInput.value === '') {
        filteredEquipments.value = []
        isFiltered.value = true
      } else {
        filteredEquipments.value = []
        isFiltered.value = true
        for (let i = 0; i < equipments.value.equipments.length; i++) {
          if (
            equipments.value.equipments[i].name
              .toLowerCase()
              .includes(searchInput.value.toLowerCase())
          ) {
            filteredEquipments.value.push(equipments.value.equipments[i])
          }
        }
        if (filteredEquipments.value.length === 0) {
          isFiltered.value = false
        }
      }
    }

    const handleFilter = (filter: string) => {
      if (filter === 'All' && searchInput.value === '') {
        filteredEquipments.value = []
      } else {
        filteredEquipments.value = []
        for (let i = 0; i < equipments.value.equipments.length; i++) {
          if (
            equipments.value.equipments[i].category
              .toLowerCase()
              .includes(filter.toLowerCase())
          ) {
            filteredEquipments.value.push(equipments.value.equipments[i])
          }
        }
      }
    }

    return {
      equipments: equipments,
      equipmentLoading,
      equipmentError,
      searchInput,
      handleSearch,
      handleFilter,
      filteredEquipments,
      isFiltered,
    }
  },
}
</script>

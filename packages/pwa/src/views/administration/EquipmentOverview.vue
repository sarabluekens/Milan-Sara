<template>
  <div class="ml-3.5rem md:ml-5rem bg-beige h-100vh">
    <h1 class="title-black">Equipment overview</h1>
    <section class="flex flex-col mx-auto w-1/2">
      <input
        placeholder="Search staff..."
        class="border-1 border-red w-full my-3 h-10 bg-beige"
        v-model="searchInput"
        @input="handleSearch"
      />
      <div class="flex justify-between">
        <button @click="handleFilter('All')" class="bg-red body-white">
          All
        </button>
        <button @click="handleFilter('Ointment')" class="bg-red body-white">
          Ointment
        </button>
        <button @click="handleFilter('Pill')" class="bg-red body-white">
          Pill
        </button>
        <button @click="handleFilter('Bandage')" class="bg-red body-white">
          bandage
        </button>
      </div>
    </section>
    <section
      class="grid grid-cols-4 gap-5 mx-auto my-10 w-1/2 text-center justify-between"
    >
      <div v-if="equipmentLoading">Loading</div>
      <div v-if="equipmentError">{{ equipmentError }}</div>
      <div
        v-if="equipments && !filteredEquipments.length && isFiltered"
        v-for="equipmentItem in equipments.equipments"
      >
        <EquipmentCard :equipment="equipmentItem" />
      </div>
      <div
        v-if="filteredEquipments.length && isFiltered"
        v-for="equipmentItem in filteredEquipments"
      >
        <EquipmentCard :equipment="equipmentItem" />
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

    console.log(equipments)

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
      } else if (filter === 'All' && searchInput.value != '') {
        filteredEquipments.value = []
        for (let i = 0; i < equipments.value.equipments.length; i++) {
          if (
            equipments.value.equipments[i].name
              .toLowerCase()
              .includes(searchInput.value.toLowerCase())
          ) {
            filteredEquipments.value.push(equipments.value.equipments[i])
          }
        }
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

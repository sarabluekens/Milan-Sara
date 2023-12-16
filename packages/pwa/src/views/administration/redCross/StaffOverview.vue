<template>
  <div class="ml-3.5rem md:ml-5rem bg-beige h-100vh">
    <h1 class="title-black mb-4">Staff overview</h1>
    <section class="flex flex-col mx-auto w-1/2">
      <input
        placeholder="Search staff..."
        v-model="searchInput"
        @input="handleSearch"
        class="border-2 border-red w-full my-3 h-10 bg-beige rounded-xl px-2"
      />
      <div class="flex justify-start gap-4">
        <button
          class="flex justify-center items-center bg-red body-white w-36 h-7 rounded-full py-4"
          @click="handleFilter('All')"
        >
          All
        </button>
        <button
          class="flex justify-center items-center bg-red body-white w-36 h-7 rounded-full py-4"
          @click="handleFilter('Doctor')"
        >
          Doctor
        </button>
        <button
          class="flex justify-center items-center bg-red body-white w-36 h-7 rounded-full py-4"
          @click="handleFilter('Nurse')"
        >
          Nurse
        </button>
        <button
          class="flex justify-center items-center bg-red body-white w-36 h-7 rounded-full py-4"
          @click="handleFilter('Paramedic')"
        >
          Paramedic
        </button>
      </div>
    </section>
    <section
      class="grid grid-cols-4 gap-5 mx-auto my-10 w-1/2 text-center justify-between"
    >
      <div
        v-if="caregivers && !filteredCaregivers.length && !isFiltered"
        v-for="caregiver in caregivers.caregivers"
        :key="caregiver.id"
      >
        <StaffCard :caregiver="caregiver" />
      </div>
      <div
        v-if="isFiltered && filteredCaregivers.length"
        v-for="caregiver in filteredCaregivers"
        :key="caregiver.id"
      >
        <StaffCard :caregiver="caregiver" />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { ALL_CAREGIVERS } from '@/graphql/caregiver.query'
import StaffCard from '@/components/StaffCard.vue'
import { ref } from 'vue'
import type { Caregiver } from '@/interfaces/caregiver.interface'

export default {
  components: { StaffCard },
  setup() {
    const isFiltered = ref(false)
    const searchInput = ref('')
    const filterInput = ref('')
    const filteredCaregivers = ref<Caregiver[]>([])
    const previousInput = ref('')

    const {
      loading: caregiverLoading,
      result: caregivers,
      error: caregiverError,
    } = useQuery(ALL_CAREGIVERS)

    const handleSearch = () => {
      if (searchInput.value === '' && filterInput.value === '') {
        filteredCaregivers.value = []
        isFiltered.value = false
      } else if (searchInput.value === '' && filterInput.value != '') {
        handleFilter(filterInput.value)
        isFiltered.value = true
      } else if (
        filteredCaregivers.value.length > 0 &&
        filterInput.value != ''
      ) {
        console.log(searchInput.value)
        for (let i = 0; i < filteredCaregivers.value.length; i++) {
          if (
            filteredCaregivers.value[i].firstName
              .toLowerCase()
              .includes(searchInput.value.toLowerCase()) ||
            filteredCaregivers.value[i].lastName
              .toLowerCase()
              .includes(searchInput.value.toLowerCase())
          ) {
            return
          } else {
            filteredCaregivers.value.splice(i, 1)
          }
        }
        previousInput.value = searchInput.value
      } else {
        filteredCaregivers.value.splice(0, filteredCaregivers.value.length)
        isFiltered.value = true
        for (let i = 0; i < caregivers.value.caregivers.length; i++) {
          if (
            caregivers.value.caregivers[i].firstName
              .toLowerCase()
              .includes(searchInput.value.toLowerCase()) ||
            caregivers.value.caregivers[i].lastName
              .toLowerCase()
              .includes(searchInput.value.toLowerCase())
          ) {
            filteredCaregivers.value.push(caregivers.value.caregivers[i])
          }
        }
        if (filteredCaregivers.value.length === 0) {
          isFiltered.value = false
        }
      }
    }

    const handleFilter = (filter: string) => {
      if (filter === 'All') {
        isFiltered.value = false
        filteredCaregivers.value = []
        filterInput.value = ''
      } else {
        filteredCaregivers.value.splice(0, filteredCaregivers.value.length)
        console.log(filteredCaregivers.value)
        for (let i = 0; i < caregivers.value.caregivers.length; i++) {
          if (caregivers.value.caregivers[i].profession === filter) {
            console.log(caregivers.value.caregivers[i])
            filteredCaregivers.value.push(caregivers.value.caregivers[i])
          }
        }
        isFiltered.value = true
        filterInput.value = filter
        console.log(filteredCaregivers.value)
      }
    }

    return {
      caregiverLoading,
      caregivers: caregivers,
      caregiverError,
      isFiltered,
      filteredCaregivers,
      searchInput,
      handleSearch,
      handleFilter,
    }
  },
}
</script>

<template>
  I need help 🥹

  <div v-if="equipmentsLoading">Loading</div>
  <div v-if="equipmentsError">{{ equipmentsError }}</div>
  <div v-if="equipments">
    <div v-for="equipment in equipments.equipments">
      <h2>{{ equipment.name }}</h2>
      <p>{{ equipment.description }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { ALL_EQUIPMENT } from '../../graphql/equipment.query'

export default {
  //   components: { Container },

  setup() {
    const {
      loading: equipmentsLoading,
      result: equipments,
      error: equipmentsError,
    } = useQuery(ALL_EQUIPMENT)
    return {
      equipmentsLoading,
      equipmentsError,
      equipments: equipments,
    }
  },
}
</script>

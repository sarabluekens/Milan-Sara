<template>
  <div v-if="caregiversLoading">Loading</div>
  <div v-if="caregiversError">
    {{ caregiversError }}
  </div>
  <div>
    <table v-if="caregivers">
      <tr v-for="caregiver in caregivers.caregivers">
        <td>{{ caregiver.name }}</td>
        <td>{{ caregiver.description }}</td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { ALL_CAREGIVERS } from '../graphql/caregiver.query'

export default {
  //   components: { Container },

  setup() {
    const {
      loading: caregiversLoading,
      result: caregivers,
      error: caregiversError,
    } = useQuery(ALL_CAREGIVERS)
    return {
      caregiversLoading,
      caregiversError,
      caregivers: caregivers,
    }
  },
}
</script>

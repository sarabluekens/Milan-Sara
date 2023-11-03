<template>
  <section class="flex sm:h-60vh h-90vh sm:flex-row sm:justify-evenly w-80%">
    <div class="text-center border-x-2 border-y-2 h-32 w-72 p-2">
      <div class="border-x-2 border-y-2 h-full">
        <h3>2</h3>
        <p>Succesful events</p>
      </div>
    </div>
    <div class="text-center border-x-2 border-y-2 h-32 w-72 p-2">
      <div class="border-x-2 border-y-2 h-full">
        <h3>725</h3>
        <p>Completed cases</p>
      </div>
    </div>
    <div class="flex border-2 h-32 w-72 p-2">
      <div
        class="border-2 m-auto flex flex-col justify-center items-center w-full h-full"
      >
        <h3 class="subtitle-red">28</h3>
        <p class="body-red">Pending events</p>
      </div>
    </div>
  </section>

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

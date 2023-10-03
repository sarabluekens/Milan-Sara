<template>
  <div>
    <h1>Add a caregiver</h1>
    <form @submit.prevent="handleNewCaregiver">
      <label for="caregiverName" class="block"> Voornaam </label>
      <input type="text" v-model="caregiverInput.fullname" />
      <label for="caregiverName" class="block"> Naam </label>
      <input type="text" v-model="caregiverInput.name" />
      <label for="caregiverName" class="block">Category </label>
      <input type="text" v-model="caregiverInput.category" />
      <label for="caregiverName" class="block">Description </label>
      <textarea v-model="caregiverInput.description" rows="5"></textarea>
      <button type="submit">Add</button>
    </form>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useMutation } from '@vue/apollo-composable'
import { ADD_CAREGIVER } from '@/graphql/caregiver.mutation'

export default {
  components: {},
  setup() {
    const { mutate: addCaregiver } = useMutation(ADD_CAREGIVER)
    const caregiverInput = ref({
      name: '',
      fullname: '',
      category: '',
      description: '',
    })
    const handleNewCaregiver = () => {
      // TODO check input values
      console.log(caregiverInput.value)
      addCaregiver({
        caregiverInput: caregiverInput.value,
      })
    }

    return {
      caregiverInput,

      handleNewCaregiver,
    }
  },
}
</script>

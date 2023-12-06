<template>
  <div class="border-2 border-red rounded-lg w-50 text-center mb-4">
    <div
      v-if="caregiver.profession === 'Doctor'"
      class="i-fa6-solid-user-doctor icon icon-6 color-red mx-auto mt-4 mb-2"
    ></div>
    <div
      v-if="caregiver.profession === 'Nurse'"
      class="i-fa6-solid-user-nurse icon icon-6 color-red mx-auto mt-4 mb-2"
    ></div>
    <div
      v-if="caregiver.profession === 'Paramedic'"
      class="i-ic-round-person icon icon-6 color-red mx-auto mt-4 mb-2"
    ></div>
    <p class="body-black">
      {{ `${caregiver.firstName} ${caregiver.lastName}` }}
    </p>
    <p class="subbody-black mb-4">{{ caregiver.profession }}</p>
  </div>
</template>

<script setup lang="ts">
import type { Caregiver } from '@/interfaces/caregiver.interface'

const props = defineProps<{
  caregiver: Caregiver
}>()

const caregiver: Caregiver = props.caregiver

console.log(caregiver)
</script>

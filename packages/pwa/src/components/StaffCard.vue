<template>
  <div class="border-1 border-red w-50 text-center mb-4">
    <div class="i-material-symbols-person icon icon-6 color-red mx-auto"></div>
    <p class="body-black">
      {{ `${caregiver.firstName} ${caregiver.lastName}` }}
    </p>
    <p class="subbody-black">{{ caregiver.profession }}</p>
  </div>
</template>

<script setup lang="ts">
import type { Caregiver } from '@/interfaces/caregiver.interface'

const props = defineProps<{
  caregiver: Caregiver
}>()

const caregiver: Caregiver = props.caregiver
</script>

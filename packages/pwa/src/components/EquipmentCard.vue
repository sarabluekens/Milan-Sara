<template>
  <div class="text-black w-56 h-18 bg-white">
    <p class="body-black">{{ equipment.name }}</p>
    <p class="subbody-black">{{ equipment.category }}</p>
    <p class="subbody-black">Amount: {{ equipment.totalStock }}</p>
  </div>
</template>

<script setup lang="ts">
import type { Equipment } from '@/interfaces/equipment.interface'

const props = defineProps<{
  equipment: Equipment
}>()

const equipment: Equipment = props.equipment
</script>

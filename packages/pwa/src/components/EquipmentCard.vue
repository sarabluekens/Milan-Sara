<template>
  <div
    v-if="equipment.totalStock > 0"
    class="w-50 border-2 border-red rounded-md h-32"
  >
    <p class="body-black">{{ equipment.name }}</p>
    <p class="subbody-black">{{ equipment.category }}</p>
    <div class="w-3 h-9 xl:h-8"></div>
    <div class="flex justify-end mr-1">
      <div class="flex bg-red w-28 h-9 rounded-lg justify-center items-center">
        <p class="subbody-white">{{ equipment.totalStock }} left</p>
      </div>
    </div>
  </div>
  <div
    v-if="equipment.totalStock === 0"
    class="w-50 border-2 border-red rounded-md h-32 opacity-35"
  >
    <p class="body-black">{{ equipment.name }}</p>
    <p class="subbody-black">{{ equipment.category }}</p>
    <div class="w-3 h-9 xl:h-8"></div>
    <div class="flex justify-end mr-1">
      <div class="flex bg-red w-28 h-9 rounded-lg justify-center items-center">
        <p class="subbody-white">{{ equipment.totalStock }} left</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Equipment } from '@/interfaces/equipment.interface'

const props = defineProps<{
  equipment: Equipment
}>()

const equipment: Equipment = props.equipment
</script>

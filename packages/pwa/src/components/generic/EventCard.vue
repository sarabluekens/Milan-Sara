<template>
  <div class="h-30vh" @click="$emit('setCategory', category)">
    <h2 class="body-beige text-center p-3">{{ title }}</h2>
    <div class="flex items-center justify-center p3">
      <p class="subbody-beige text-center w-1/2">{{ location }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  category: string
  title: string
  location: string
}>()

const category: string = props.category
const title: string = props.title
const location: string = props.location
</script>

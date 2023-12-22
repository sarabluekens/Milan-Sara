<template>
  <div class="h-30vh" @click="$emit('setCategory', category)">
    <h2 class="body-beige text-center p-3">{{ title }}</h2>
    <img class="m-auto p-3 h-74%" :src="image" :alt="image" />
    <div class="flex items-center justify-center p3">
      <div :class="icon" class="icon-3 color-beige"></div>
      <p class="subbody-beige text-center w-1/2">{{ subtitle }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  category: string
  image: string
  title: string
  icon?: string
  subtitle?: string
}>()

const category: string = props.category
const image: string = props.image
const title: string = props.title
const icon: string | undefined = props.icon
const subtitle: string | undefined = props.subtitle
</script>

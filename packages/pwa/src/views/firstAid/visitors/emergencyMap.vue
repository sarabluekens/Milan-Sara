<template>
  <div class="ml-7rem">
    <h1>Emergency Map</h1>
    <p>Category send: {{ category }}</p>
  </div>
</template>

<script setup lang="ts">
// read param
import { useRoute } from 'vue-router'
const route = useRoute()

const category = route.params.categoryName
console.log(route.params.categoryName)
</script>

<style scoped>
/* Your CSS styles here */
</style>

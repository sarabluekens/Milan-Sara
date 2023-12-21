<template>
  <article class="ml-7rem bg-white w-auto">
    <h1 class="title-red">Patients location</h1>
    <p class="subtitle-red">Go to the location on the map</p>

    <section class="flex flex-wrap justify-center items-center h-50vh">
      <EmergencyMap size="big" />
    </section>
  </article>
</template>

<script setup lang="ts">
import EmergencyMap from '@/components/EmergencyMapComponent.vue'
</script>

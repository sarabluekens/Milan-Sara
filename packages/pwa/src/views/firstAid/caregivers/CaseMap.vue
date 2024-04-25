<template>
  <article class="ml-7rem bg-white w-auto h-100vh">
    <h1 class="title-red md:text-4rem">Patients location</h1>
    <p class="subtitle-black my-2rem">Go to the location on the map</p>

    <section class="flex flex-wrap justify-center items-center h-50vh">
      <EmergencyMap size="big" />
    </section>
  </article>
</template>

<script setup lang="ts">
import EmergencyMap from '@/components/EmergencyMapComponent.vue'
</script>

export const overlay = new google.maps.OverlayView()

<script setup lang="ts">
import { useGeolocation } from '@vueuse/core'
import { Loader } from '@googlemaps/js-api-loader'

import { ref } from 'vue'
import { computed } from 'vue'
import { onMounted } from 'vue'
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

const { coords, locatedAt, error, resume, pause } = useGeolocation()
const center = ref({
  lat: coords.value.latitude,
  lng: coords.value.longitude,
})

const loader = new Loader({
  apiKey: GOOGLE_MAPS_API_KEY,
  version: 'weekly',
  libraries: ['geometry'],
})
const mapDiv = ref()

const loadMap = async (coords: any) => {
  await loader.load()
  new google.maps.Map(mapDiv.value, {
    center: {
      lat: coords.value.latitude,
      lng: coords.value.longitude,
    },
    zoom: 17,
  })

  console.log('map loaded', coords.value.latitude, coords.value.longitude)
}
onMounted(async () => {
  while (!isFinite(coords.value.latitude)) {
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  loadMap(coords)
})
</script>

<template>
  <p>latitude: {{ coords.latitude }}, longtitude: {{ coords.longitude }}</p>
  <div ref="mapDiv" style="width: 80%; height: 50vh"></div>
</template>

<template>
  <div ref="mapDiv" style="width: 50%; height: 50%"></div>
</template>
<script setup lang="ts">
/* eslint-disable no-undef */
import { useGeolocation } from '@vueuse/core'
import { Loader } from '@googlemaps/js-api-loader'
import { onMounted, computed } from 'vue'
import { ref } from 'vue'

// get coords, locatedAt, error, resume, pause of device
const { coords, locatedAt, error, resume, pause } = useGeolocation()

// load map
const center = { lat: 45.508, lng: -73.587 }
const zoom = 8

const apikey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

const loader = new Loader({
  apiKey: apikey,
})
const mapDiv = ref(null)
onMounted(async () => {
  await loader.load()
  mapDiv.value = new google.maps.Map(mapDiv.value, {
    center: center,
    zoom: zoom,
  })
})
</script>

<template>
  <p>{{ (coords.latitude, '+', coords.longitude) }}</p>
  <div id="map" style="width: 50%; height: 50%"></div>
  <GoogleMap
    :api-key="apikey"
    style="width: 50%; height: 20rem"
    :center="center"
    :zoom="9"
  >
    <Marker :options="{ position: center }" />
  </GoogleMap>
</template>
<script setup lang="ts">
/* eslint-disable no-undef */
import { GoogleMap, Marker } from 'vue3-google-map'
import { useGeolocation } from '@vueuse/core'
import { ref } from 'vue'

// get coords, locatedAt, error, resume, pause of device
const { coords, locatedAt, error, resume, pause } = useGeolocation()
const apikey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

const center = ref({
  lat: coords.value.latitude,
  lng: coords.value.longitude,
})
// load map

const zoom = 8
</script>

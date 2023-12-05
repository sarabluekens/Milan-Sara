<!-- GoogleMap.vue -->
<template>
  <div>
    <GoogleMap
      :api-key="apiKey"
      style="width: 100%; height: 500px"
      :center="center"
      :zoom="15"
      :on-map-ready="onMapReady"
    >
      <Marker :options="{ position: center }"
    /></GoogleMap>
  </div>
  <div>heredskfnsklfnelkngdlfkndl</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { GoogleMap, Marker } from 'vue3-google-map'

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
const center = { lat: 37.7749, lng: -122.4194 }
const zoom = 12

const onMapReady = () => {
  console.log('Map is ready')
  // You can add your custom overlay or other map-related logic here
}
</script>

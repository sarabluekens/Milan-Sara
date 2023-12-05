<script setup lang="ts">
import { useGeolocation } from '@vueuse/core'
import { Loader } from '@googlemaps/js-api-loader'
import { ref } from 'vue'

import { onMounted } from 'vue'
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
const { coords: victimCO, locatedAt, error, resume, pause } = useGeolocation()

// reference to map div in html
const mapDiv = ref()

// loading state
const loading = ref(true)

// coordinates of victim

// coordinates of caregiver
const caregiverCO = ref({
  latitude: victimCO.value.latitude,
  longitude: victimCO.value.longitude,
})

let map: google.maps.Map
let victimMarker: google.maps.Marker
let caregiverMarker: google.maps.Marker

// google maps loader
const loader = new Loader({
  apiKey: GOOGLE_MAPS_API_KEY,
  version: 'weekly',
  libraries: ['geometry', 'places'],
})

// load the map with the loader
const loadMap = async () => {
  await loader.load()

  map = new google.maps.Map(mapDiv.value, {
    center: {
      lat: victimCO.value.latitude,
      lng: victimCO.value.longitude,
    },
    zoom: 18,
  })

  victimMarker = new google.maps.Marker({
    position: {
      lat: victimCO.value.latitude,
      lng: victimCO.value.longitude,
    },
    map: map,
  })

  console.log('map loaded', victimCO.value.latitude, victimCO.value.longitude)
}

const showCaregiver = async () => {
  navigator.geolocation.watchPosition(position => {
    caregiverCO.value = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    }
  })
  
  caregiverMarker = new google.maps.Marker({
    position: {
      lat: caregiverCO.value.latitude,
      lng: caregiverCO.value.longitude,
    },
    map: map,
  })

  console.log(
    'caregiver shown',
    caregiverCO.value.latitude,
    caregiverCO.value.longitude,
  )
}

onMounted(async () => {
  while (!isFinite(victimCO.value.latitude)) {
    loading.value = true
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  await loadMap()
  showCaregiver()
  loading.value = false

  const options = {
    enableHighAccuracy: false,
    timeout: 3000,
    maximumAge: 500,
  }

  function success(pos: any) {
    const crd = pos.coords
    console.log('Your current position is:')
    console.log(`Latitude : ${crd.latitude}`)
    console.log(`Longitude: ${crd.longitude}`)
    console.log(`More or less ${crd.accuracy} meters.`)
    console.log('tracked at', new Date(pos.timestamp))

    caregiverCO.value = {
      latitude: crd.latitude,
      longitude: crd.longitude,
    }

    caregiverMarker.setPosition({
      lat: caregiverCO.value.latitude,
      lng: caregiverCO.value.longitude,
    })
  }

  function error(err: any) {
    console.warn(`ERROR(${err.code}): ${err.message}`)
  }
  navigator.geolocation.watchPosition(success, error, options)
  console.log('watching position')
})
</script>

<template>
  <p>latitude: {{ victimCO.latitude }}, longtitude: {{ victimCO.longitude }}</p>
  <div v-if="loading" style="width: 80%; height: 50vh">loading</div>
  <div ref="mapDiv" style="width: 80%; height: 50vh"></div>
</template>

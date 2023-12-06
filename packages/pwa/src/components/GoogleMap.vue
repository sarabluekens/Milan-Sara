<script setup lang="ts">
import { useGeolocation } from '@vueuse/core'
import { Loader } from '@googlemaps/js-api-loader'
import { ref } from 'vue'
import useLocation from '@/composables/useLocation'

import { onMounted } from 'vue'
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
const { coords: victimCO, locatedAt, error, resume, pause } = useGeolocation()
const { getCoords } = useLocation()

// reference to map div in html
const mapDiv = ref()
const coordinatesFromUse = ref({ latitude: 0, longitude: 0 })

// loading state
const loading = ref(true)

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

  // floorplan settings
  const floorplan = new google.maps.GroundOverlay('/mapOverlay.png', {
    north: victimCO.value.latitude + 0.0008,
    south: victimCO.value.latitude - 0.0008,
    east: victimCO.value.longitude + 0.004,
    west: victimCO.value.longitude - 0.004,
  })

  // add floorplan to map
  floorplan.setMap(map)

  // add victim marker to map
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
  // add caregiver marker to map
  caregiverMarker = new google.maps.Marker({
    position: {
      lat: caregiverCO.value.latitude,
      lng: caregiverCO.value.longitude,
    },
    map: map,
  })

  const options = {
    enableHighAccuracy: true,
    timeout: 100,
    maximumAge: 500,
  }

  function success(pos: any) {
    const crd = pos.coords
    console.log('Your current position is:')
    console.log(`Latitude : ${crd.latitude}`)
    console.log(`Longitude: ${crd.longitude}`)
    console.log(`More or less ${crd.accuracy} meters.`)
    console.log('tracked at', new Date(pos.timestamp))
    console.log('coordinates from use', coordinatesFromUse)

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

  // watch caregiver position
  navigator.geolocation.watchPosition(success, error, options)
  console.log('watching position')
}

onMounted(async () => {
  //await victim coordinates to load the map
  while (!isFinite(victimCO.value.latitude)) {
    loading.value = true
    await new Promise(resolve => setTimeout(resolve, 100))
  }

  //load the map
  await loadMap()

  //add the caregiver marker
  showCaregiver()
  loading.value = false
})
</script>

<template>
  <div v-if="loading" style="width: 80%; height: 50vh">loading</div>
  <div ref="mapDiv" style="width: 80%; height: 50vh"></div>
</template>

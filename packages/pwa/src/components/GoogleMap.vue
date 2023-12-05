<script setup lang="ts">
import { useGeolocation } from '@vueuse/core'
import { Loader } from '@googlemaps/js-api-loader'
import { ref } from 'vue'

import { onMounted } from 'vue'
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
const { coords, locatedAt, error, resume, pause } = useGeolocation()

const center = ref({
  lat: coords.value.latitude,
  lng: coords.value.longitude,
})

const caregiverCO = ref({
  lat: coords.value.latitude,
  lng: coords.value.longitude,
})

let caregiverMarker: google.maps.Marker

const loader = new Loader({
  apiKey: GOOGLE_MAPS_API_KEY,
  version: 'weekly',
  libraries: ['geometry', 'places'],
})

const mapDiv = ref()
const loading = ref(true)
let map: google.maps.Map

const loadMap = async (coords: any) => {
  await loader.load()

  map = new google.maps.Map(mapDiv.value, {
    center: {
      lat: coords.value.latitude,
      lng: coords.value.longitude,
    },
    zoom: 17,
  })

  console.log('map loaded', coords.value.latitude, coords.value.longitude)
}

const showCaregiver = async (coords: any) => {
  navigator.geolocation.watchPosition(position => {
    caregiverCO.value = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    }
  })
  caregiverMarker = new google.maps.Marker({
    position: {
      lat: caregiverCO.value.lat,
      lng: caregiverCO.value.lng,
    },
    map: map,
  })
}

onMounted(async () => {
  while (!isFinite(coords.value.latitude)) {
    loading.value = true
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  await loadMap(coords)
  showCaregiver(coords)
  loading.value = false

  const options = {
    enableHighAccuracy: false,
    timeout: 3000,
    maximumAge: 0,
  }

  function success(pos: any) {
    const crd = pos.coords

    center.value = {
      lat: crd.latitude,
      lng: crd.longitude,
    }

    console.log(center.value.lat, typeof center.value.lng)

    console.log('Your current position is:')
    console.log(`Latitude : ${crd.latitude}`)
    console.log(`Longitude: ${crd.longitude}`)
    console.log(`More or less ${crd.accuracy} meters.`)

    center.value = {
      lat: crd.latitude,
      lng: crd.longitude,
    }

    caregiverMarker.setPosition({
      lat: crd.latitude as number,
      lng: crd.longitude as number,
    })

    showCaregiver(caregiverCO)
  }

  function error(err: any) {
    console.warn(`ERROR(${err.code}): ${err.message}`)
  }
  navigator.geolocation.watchPosition(success, error, options)
  console.log('watching position')
})
</script>

<template>
  <p>latitude: {{ coords.latitude }}, longtitude: {{ coords.longitude }}</p>
  <div v-if="loading" style="width: 80%; height: 50vh">loading</div>
  <div ref="mapDiv" style="width: 80%; height: 50vh"></div>
</template>

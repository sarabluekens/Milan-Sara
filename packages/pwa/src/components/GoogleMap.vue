<script setup lang="ts">
import { useGeolocation } from '@vueuse/core'
import { Loader } from '@googlemaps/js-api-loader'
import { ref } from 'vue'
import { uuid } from 'vue-uuid'
import { onMounted } from 'vue'
import useRealtime from '@/composables/useRealtime'
import { useRouter } from 'vue-router'
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

const { on, emit } = useRealtime()
const Router = useRouter()
const userId = uuid.v4()
const caseId = Router.currentRoute.value.params.id
const currentCo = ref({
  latitude: 50.8,
  longitude: 3.2,
})

const newCo = ref({
  latitude: null as number | null,
  longitude: null as number | null,
  userId: '',
  caseId: '',
})

navigator.geolocation.getCurrentPosition((pos: any) => {
  currentCo.value = pos.coords
})

// reference to map div in html
const mapDiv = ref()

// getting CO's loading state
const loading = ref(true)

// coordinates of destination
const othersCo = ref({
  latitude: currentCo.value.latitude + 0.001,
  longitude: currentCo.value.longitude + 0.001,
})

let map: google.maps.Map
let currentMarker: google.maps.Marker
let othersMarker: google.maps.Marker

// google maps loader
const loader = new Loader({
  apiKey: GOOGLE_MAPS_API_KEY,
  version: 'weekly',
  libraries: ['geometry', 'places'],
})

// load the map with the loader
const loadMap = async () => {
  await loader.load()

  // load map centered on your current location
  map = new google.maps.Map(mapDiv.value, {
    center: {
      lat: currentCo.value.latitude,
      lng: currentCo.value.longitude,
    },
    zoom: 5,
  })

  // floorplan settings
  // to do convert to Milans CO
  const floorplan = new google.maps.GroundOverlay('/mapOverlay.png', {
    north: currentCo.value.latitude + 0.0008,
    south: currentCo.value.latitude - 0.0008,
    east: currentCo.value.longitude + 0.004,
    west: currentCo.value.longitude - 0.004,
  })

  // add floorplan to map
  floorplan.setMap(map)

  // add victim marker to map
  currentMarker = new google.maps.Marker({
    position: {
      lat: currentCo.value.latitude,
      lng: currentCo.value.longitude,
    },
    icon: {
      url: '/youMarker.png',
      scaledSize: new google.maps.Size(198, 78),
    },
    map: map,
  })

  console.log(userId)

  console.log('map loaded', currentCo.value.latitude, currentCo.value.longitude)
}

const showDestination = async () => {
  // add destination marker to map
  othersMarker = new google.maps.Marker({
    position: {
      lat: othersCo.value.latitude,
      lng: othersCo.value.longitude,
    },
    icon: {
      url: Router.currentRoute.value.path.includes('caregiver')
        ? '/victimMarker.png'
        : '/caregiverMarker.png',
      scaledSize: new google.maps.Size(217, 97),
    },
    map: map,
  })

  const options = {
    enableHighAccuracy: true,
    timeout: 100,
    maximumAge: 500,
  }

  const success = (pos: any) => {
    const crd = pos.coords
    console.log('Your current position is:')
    console.log(`Latitude : ${crd.latitude}`)
    console.log(`Longitude: ${crd.longitude}`)
    console.log(`More or less ${crd.accuracy} meters.`)
    console.log('tracked at', new Date(pos.timestamp))

    emit('coords:updated', {
      latitude: crd.latitude,
      longitude: crd.longitude,
      caseId: caseId,
      userId: userId,
    })
  }

  const error = (err: any) => {
    console.warn(`ERROR(${err.code}): ${err.message}`)
  }

  // watch caregiver position
  navigator.geolocation.watchPosition(success, error, options)
  console.log('watching position')
}

onMounted(async () => {
  //await victim coordinates to load the map
  while (!isFinite(currentCo.value.latitude)) {
    loading.value = true
    await new Promise(resolve => setTimeout(resolve, 100))
  }

  //load the map
  await loadMap()

  //add the caregiver marker
  showDestination()
  loading.value = false
})

// update coordinates
on('coords:new', (data: Partial<Object>) => {
  console.log('New coords added by a patient', data)
  newCo.value = data as any

  // if the new coords are not from the current user
  if (newCo.value.userId !== userId) {
    // update the other marker
    othersMarker.setPosition({
      lat: newCo.value.latitude as number,
      lng: newCo.value.longitude as number,
    })
    console.log('new coords:', newCo.value)
  } else {
    currentMarker.setPosition({
      lat: newCo.value.latitude as number,
      lng: newCo.value.longitude as number,
    })
  }
})
</script>

<template>
  <div v-if="loading" style="width: 80%; height: 50vh">loading</div>
  <div ref="mapDiv" style="width: 80%; height: 50vh"></div>
</template>

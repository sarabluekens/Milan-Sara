<script setup lang="ts">
import { Loader } from '@googlemaps/js-api-loader'
import { ref } from 'vue'
import { uuid } from 'vue-uuid'
import { onMounted } from 'vue'
import useRealtime from '@/composables/useRealtime'
import { useRouter } from 'vue-router'
import { useMutation, useQuery } from '@vue/apollo-composable'
import { ADD_VICTIM_CO, ADD_CAREGIVER_CO } from '@/graphql/case.mutation'
import { CASE_BY_ID } from '@/graphql/case.query'
import { onUnmounted } from 'vue'
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

const { on, emit } = useRealtime()
const { mutate: addVictimCo } = useMutation(ADD_VICTIM_CO)
const { mutate: addCaregiverCo } = useMutation(ADD_CAREGIVER_CO)
const router = useRouter()
// const { mutate: addVictimCo } = useMutation(')
const userId = uuid.v4()
const caseId = router.currentRoute.value.params.caseId as string
const watchId = ref<number>()
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

const currentCo = ref({
  latitude: null as number | null,
  longitude: null as number | null,
})

// victimCoordinates of destination
const othersCo = ref({
  latitude: null as number | null,
  longitude: null as number | null,
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
      lat: currentCo.value.latitude!,
      lng: currentCo.value.longitude!,
    },
    zoom: 5,
  })

  // floorplan settings
  // to do convert to Milans CO
  const floorplan = new google.maps.GroundOverlay('/mapOverlay.png', {
    north: currentCo.value.latitude! + 0.0008,
    south: currentCo.value.latitude! - 0.0008,
    east: currentCo.value.longitude! + 0.004,
    west: currentCo.value.longitude! - 0.004,
  })

  // add floorplan to map
  floorplan.setMap(map)

  // add victim marker to map
  currentMarker = new google.maps.Marker({
    position: {
      lat: currentCo.value.latitude!,
      lng: currentCo.value.longitude!,
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
      lat: othersCo.value.latitude!,
      lng: othersCo.value.longitude!,
    },
    icon: {
      url: router.currentRoute.value.path.includes('caregiver')
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
  watchId.value = navigator.geolocation.watchPosition(success, error, options)
  console.log('watching position', watchId.value)
}

onMounted(async () => {
  // get caseobject from db
  const {
    result: currentCase,
    loading: loadingCurrentCase,
    error,
  } = useQuery(CASE_BY_ID, () => ({
    id: caseId.toString(),
  }))
  while (loadingCurrentCase.value) {
    await new Promise(resolve => setTimeout(resolve, 100))
    console.log('waiting for case')
  }
  console.log('dbCase:', currentCase.value.caseById)

  // TODO if on caregiver page get the victim coordinates and add them to the map
  if (router.currentRoute.value.path.includes('caregiver')) {
    othersCo.value.latitude = currentCase.value.caseById.victimCoordinates.lat
    othersCo.value.longitude = currentCase.value.caseById.victimCoordinates.lng
    console.log('othersCo:', othersCo.value)
  } else {
    // check is caregiverCoordinates exist -> if caregiver is assigned
    if (currentCase.value.caseById.caregiverCoordinates) {
      othersCo.value.latitude =
        currentCase.value.caseById.caregiverCoordinates.lat
      othersCo.value.longitude =
        currentCase.value.caseById.caregiverCoordinates.lng
      console.log('othersCo:', othersCo.value)
    }
    // TODO if on victim page get foreach caregiver the coordinates and add them to the map
  }

  //await your victimCoordinates to load the map
  while (
    currentCo.value.latitude === null &&
    currentCo.value.longitude === null
  ) {
    loading.value = true
    await new Promise(resolve => setTimeout(resolve, 100))
    console.log('waiting for coords')
  }

  //load the map
  await loadMap()
  console.log('caseid in map:', caseId)

  // add your first coordinates to the db
  if (!router.currentRoute.value.path.includes('caregiver')) {
    addVictimCo({
      updateCaseInput: {
        caseId: caseId as string,
        victimCoordinates: {
          lat: currentCo.value.latitude!,
          lng: currentCo.value.longitude!,
        },
      },
    })

    console.log(
      'victim coords added to db: ' + currentCo.value.latitude,
      currentCo.value.longitude,
    )
  } else {
    addCaregiverCo({
      updateCaseInput: {
        caseId: caseId as string,
        caregiverCoordinates: {
          lat: currentCo.value.latitude!,
          lng: currentCo.value.longitude!,
        },
      },
    })
    console.log(
      'caregiver coords added to db: ' + currentCo.value.latitude,
      currentCo.value.longitude,
    )
    // get victimCoordinates of the victim
    //   const {
    //     result: currentCase,
    //     loading: loadingCase,
    //     error,
    //   } = useQuery(CASE_BY_ID, () => ({
    //     caseId: caseId.toString(),
    //   }))
    //   while (loadingCase.value) {
    //     await new Promise(resolve => setTimeout(resolve, 100))
    //     console.log('waiting for case')
    //   }
    //   console.log('currentCase:', currentCase.value.caseById)
    //   othersCo.value.latitude = currentCase.value.caseById.victimCoordinates.lat
    //   othersCo.value.longitude = currentCase.value.caseById.victimCoordinates.lng
  }

  //add the caregiver marker
  showDestination()
  loading.value = false
})

onUnmounted(() => {
  console.log('unmounted')
  navigator.geolocation.clearWatch(watchId.value as number)
})

// update victimCoordinates
on('coords:new', (data: Partial<Object>) => {
  console.log('updated coords received: ', data)
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

  // TODO update the victimCoordinates in the db
  // TODO update the caregiverCoordinates in the db

  // if (router.currentRoute.value.path.includes('caregiver')) {
  //   addCaregiverCo({
  //     updateCaseInput: {
  //       caseId: caseId as string,
  //       caregiverCoordinates: {
  //         lat: currentCo.value.latitude!,
  //         lng: currentCo.value.longitude!,
  //       },
  //     },
  //   })
  //   // update the victimCoordinates in the db
  // } else {
  //   addVictimCo({
  //     updateCaseInput: {
  //       caseId: caseId as string,
  //       victimCoordinates: {
  //         lat: currentCo.value.latitude!,
  //         lng: currentCo.value.longitude!,
  //       },
  //     },
  //   })
  // }
  //
})
</script>

<template>
  <div v-if="loading" style="width: 80%; height: 50vh">loading</div>
  <div ref="mapDiv" style="width: 80%; height: 50vh"></div>
</template>

<template>
  <div
    v-if="loading"
    class="w-80% h-50vh bg-beige flex flex-col items-center justify-center"
  >
    <VueSpinner size="150" class="color-red" />
    <p class="subtitle-red">Loading the map</p>
  </div>
  <div ref="mapDiv" style="width: 80%; height: 50vh"></div>
</template>

<script setup lang="ts">
import { Loader } from '@googlemaps/js-api-loader'
import { ref } from 'vue'
import { uuid } from 'vue-uuid'
import { onMounted } from 'vue'
import useRealtime from '@/composables/useRealtime'
import { useRouter } from 'vue-router'
import { useMutation, useQuery } from '@vue/apollo-composable'
import { ADD_VICTIM_CO, ADD_CAREGIVER_CO } from '@/graphql/case.mutation'
import { GET_EVENT_BY_ID } from '@/graphql/event.query'
import { CASE_BY_ID } from '@/graphql/case.query'
import { onUnmounted } from 'vue'
import { VueSpinner } from 'vue3-spinners'

defineProps<{
  size?: string
}>()

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

const mapsPNG = ref('')
const mapsPNGTopLeft = ref({
  lat: null as number | null,
  lng: null as number | null,
})
const mapsPNGBottomRight = ref({
  lat: null as number | null,
  lng: null as number | null,
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
let distance: number
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
  const floorplan = new google.maps.GroundOverlay(mapsPNG.value, {
    north: mapsPNGTopLeft.value.lat!,
    south: mapsPNGBottomRight.value.lat!,
    east: mapsPNGBottomRight.value.lng!,
    west: mapsPNGTopLeft.value.lng!,
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

  // console.log('map loaded', currentCo.value.latitude, currentCo.value.longitude)
}

const showDestination = async () => {
  // add destination marker to map
  if (othersCo.value.latitude === null) {
    return
  } else {
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
  }

  const options = {
    enableHighAccuracy: true,
    timeout: 100,
    maximumAge: 500,
  }

  const success = (pos: any) => {
    const crd = pos.coords

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
  // console.log('watching position', watchId.value)
}

const checkDistance = (myCoordinates: any, otherCoordinates: any) => {
  console.log('distance checked')
  if (
    !myCoordinates.value.latitude ||
    !otherCoordinates.value.latitude ||
    myCoordinates.value.longitude == 0 ||
    otherCoordinates.value.longitude == 0
  ) {
    return
  } else {
    distance = google.maps.geometry.spherical.computeDistanceBetween(
      new google.maps.LatLng(
        myCoordinates.value.latitude,
        myCoordinates.value.longitude,
      ),
      new google.maps.LatLng(
        otherCoordinates.value.latitude!,
        otherCoordinates.value.longitude,
      ),
    )
    console.log('distance:', distance)
    if (distance < 10) {
      console.log('you are close to the victim')
      if (!router.currentRoute.value.path.includes('caregiver')) {
        setTimeout(() => {
          router.push({ path: '/map/flicker' })
          exitMap()
        }, 3000)
      }
      if (router.currentRoute.value.path.includes('caregiver')) {
        setTimeout(() => {
          router.push({ path: '/caregiver/afterAction' })
          exitMap()
        }, 3000)
      }
    } else {
      console.log('you are not close to the victim')
    }
  }
}
const updateCoordinates = (coords: any) => {
  if (!router.currentRoute.value.path.includes('caregiver')) {
    addVictimCo({
      updateCaseInput: {
        caseId: caseId as string,
        victimCoordinates: {
          lat: coords.value.latitude!,
          lng: coords.value.longitude!,
        },
      },
    })
  } else {
    addCaregiverCo({
      updateCaseInput: {
        caseId: caseId as string,
        caregiverCoordinates: {
          lat: coords.value.latitude!,
          lng: coords.value.longitude!,
        },
      },
    })
  }

  console.log('updateCoordinates executed', coords.value, othersCo.value)
}
onMounted(async () => {
  navigator.geolocation.clearWatch(watchId.value as number)
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
    // console.log('waiting for case')
  }
  // console.log('dbCase:', currentCase.value.caseById)
  const { result: event, loading: loadingEvent } = useQuery(
    GET_EVENT_BY_ID,
    () => ({
      // TODO: dynamc event id
      id: '657efd690bbf10085efdfd09',
    }),
  )

  while (loadingEvent.value) {
    await new Promise(resolve => setTimeout(resolve, 100))
    // console.log('waiting for event')
  }
  mapsPNG.value = event.value.event.mapsLink
  mapsPNGTopLeft.value = event.value.event.mapCoords[0]
  mapsPNGBottomRight.value = event.value.event.mapCoords[1]

  // on caregiver page get the victim coordinates and add them to the map
  if (router.currentRoute.value.path.includes('caregiver')) {
    if (
      currentCase.value.caseById.victimCoordinates.lat === 0 &&
      currentCase.value.caseById.victimCoordinates.lng === 0
    ) {
      othersCo.value.latitude = null
      othersCo.value.longitude = null
    } else {
      othersCo.value.latitude = currentCase.value.caseById.victimCoordinates.lat
      othersCo.value.longitude =
        currentCase.value.caseById.victimCoordinates.lng
    }
  } else {
    // check is caregiverCoordinates exist -> if caregiver is assigned
    if (
      currentCase.value.caseById.caregiverCoordinates &&
      currentCase.value.caseById.caregiverCoordinates.lat !== 0 &&
      currentCase.value.caseById.caregiverCoordinates.lng !== 0
    ) {
      othersCo.value.latitude =
        currentCase.value.caseById.caregiverCoordinates.lat
      othersCo.value.longitude =
        currentCase.value.caseById.caregiverCoordinates.lng
    } else {
      othersCo.value.latitude = null
      othersCo.value.longitude = null
    }
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
  // console.log('caseid in map:', caseId)

  // add your first coordinates to the db
  updateCoordinates(currentCo)
  console.log('updated coords through mount function')
  checkDistance(currentCo, othersCo)
  //add the caregiver marker
  showDestination()
  loading.value = false
})

const exitMap = () => {
  navigator.geolocation.clearWatch(watchId.value as number)
  const deleteCo = ref({
    latitude: 0,
    longitude: 0,
    userId: userId,
    caseId: caseId,
  })

  currentMarker.setMap(null)
  console.log('deleteCo', deleteCo)

  emit('coords:deleted', {
    caseId: caseId,
  })

  updateCoordinates(deleteCo)
  console.log('deleted coords')
}

onUnmounted(() => {
  console.log('unmounted')
  exitMap()
})

// update victimCoordinates
on('coords:new', (data: Partial<Object>) => {
  console.log('updated coords received: ', data)
  newCo.value = data as any
  if (newCo.value.latitude === null && newCo.value.longitude === null) {
    return
  }
  // if the new coords are not from the current user
  else if (newCo.value.userId !== userId) {
    if (othersMarker === undefined) {
      othersMarker = new google.maps.Marker({
        position: {
          lat: newCo.value.latitude!,
          lng: newCo.value.longitude!,
        },
        icon: {
          url: router.currentRoute.value.path.includes('caregiver')
            ? '/victimMarker.png'
            : '/caregiverMarker.png',
          scaledSize: new google.maps.Size(217, 97),
        },
        map: map,
      })
    } else {
      // update the other marker
      othersMarker.setPosition({
        lat: newCo.value.latitude as number,
        lng: newCo.value.longitude as number,
      })
    }
    console.log('new coords:', newCo.value)
    // update the db
    updateCoordinates(newCo)
    checkDistance(currentCo, newCo)
    console.log('updated coords through on function')
    console.log('other still here')
  } else {
    currentMarker.setPosition({
      lat: newCo.value.latitude as number,
      lng: newCo.value.longitude as number,
    })
    updateCoordinates(newCo)
    checkDistance(newCo, othersCo)
  }
})

on('coords:deleted', (data: Partial<Object>) => {
  console.log('other person left ', data)
  othersMarker.setMap(null)
})
</script>

<style scoped></style>

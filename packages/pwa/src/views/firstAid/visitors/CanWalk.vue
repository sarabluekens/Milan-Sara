<template class="ml-7rem">
  <div class="ml-5rem">
    <h1 class="title-red md:text-4rem">{{ $t('cant.title') }}</h1>
    <p class="subtitle-black my-2rem">{{ $t('cant.text') }}</p>
    <div
      v-if="loading"
      class="w-80% m-auto h-50vh bg-pink/50 flex flex-col items-center justify-center"
    >
      <VueSpinner size="150" class="color-red" />
      <p class="subtitle-red">{{ $t('cant.loading') }}</p>
    </div>
  </div>
  <div
    ref="mapDiv"
    class="m-auto rounded-xl"
    style="width: 75%; height: 70vh"
  ></div>
</template>

<script setup lang="ts">
import { Loader } from '@googlemaps/js-api-loader'
import { ref } from 'vue'
import { uuid } from 'vue-uuid'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuery } from '@vue/apollo-composable'
import { GET_EVENT_BY_ID } from '@/graphql/event.query'
import { onUnmounted } from 'vue'
import { VueSpinner } from 'vue3-spinners'

defineProps<{
  size?: string
}>()

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

const router = useRouter()
const userId = uuid.v4()

const eventId = router.currentRoute.value.params.eventId as string
const watchId = ref<number>()

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
}

const showDestination = async () => {
  const options = {
    enableHighAccuracy: true,
    timeout: 100,
    maximumAge: 500,
  }

  const success = (pos: any) => {
    const crd = pos.coords
    console.log(pos.coords)

    currentMarker.setPosition({
      lat: crd.latitude as number,
      lng: crd.longitude as number,
    })
  }

  const error = (err: any) => {
    console.warn(`ERROR(${err.code}): ${err.message}`)
  }

  // watch position
  watchId.value = navigator.geolocation.watchPosition(success, error, options)
}

onMounted(async () => {
  navigator.geolocation.clearWatch(watchId.value as number)
  // get caseobject from db

  // console.log('dbCase:', currentCase.value.caseById)
  const { result: event, loading: loadingEvent } = useQuery(
    GET_EVENT_BY_ID,
    () => ({
      // TODO: dynamc event id
      id: eventId as string,
    }),
  )

  while (loadingEvent.value) {
    await new Promise(resolve => setTimeout(resolve, 100))
    // console.log('waiting for event')
  }
  mapsPNG.value = event.value.event.mapsLink
  mapsPNGTopLeft.value = event.value.event.mapCoords[0]
  mapsPNGBottomRight.value = event.value.event.mapCoords[1]

  while (
    currentCo.value.latitude === null &&
    currentCo.value.longitude === null
  ) {
    loading.value = true
    await new Promise(resolve => setTimeout(resolve, 100))
    console.log('waiting for coords')
  }

  await loadMap()
  showDestination()
  loading.value = false
})

const exitMap = () => {
  navigator.geolocation.clearWatch(watchId.value as number)
}

onUnmounted(() => {
  console.log('unmounted')
  exitMap()
})
</script>

<style scoped></style>

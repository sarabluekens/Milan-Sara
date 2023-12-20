<template>
  <div v-if="loading" style="width: 80%; height: 50vh">loading</div>
  <div class="col-span-5 grid grid-cols-5 mt-4">
    <label class="body-black col-span-5">Map coordinates</label>
    <p class="subbody-black col-span-5">
      Click the 2 corners of the event place on the map in the order of the
      input fields
    </p>
    <div v-for="corner in corners" class="col-span-5 grid grid-cols-4">
      <label class="body-black col-span-1 mt-3">{{ corner.corner }}</label>
      <input
        type="text"
        placeholder="Top right corner"
        id="top-right-corner"
        class="border-1 border-black w-2/3 h-10 ml-3 bg-white col-span-3 mt-3 subbody-black/80"
        v-bind:value="`lat: ${corner.lat}, long: ${corner.lng}`"
      />
    </div>
  </div>
  <div ref="mapDiv" style="width: 80%; height: 50vh"></div>
  <form class="flex flex-col" @submit.prevent="codeAddress">
    <input ref="addressInput" type="textbox" value="Sydney, NSW" />
    <button class="bg-red rounded-md px-10 py-3 body-white self-end mt-3vh">
      Send
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Loader } from '@googlemaps/js-api-loader'
import { onMounted } from 'vue'

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
const emit = defineEmits(['coordinates'])

const loading = ref(true)
const mapDiv = ref()
let addressInput: string
let map: google.maps.Map
let geocoder: google.maps.Geocoder
let infoWindow: google.maps.InfoWindow
let marker: google.maps.Marker
const coordinates = ref({
  lat: 50.835,
  lng: 3.264,
})

const corners = ref([
  {
    corner: 'topLeft',
    lat: 0,
    lng: 0,
  },
  {
    corner: 'bottomRight',
    lat: 0,
    lng: 0,
  },
])

const chosenCorners = ref<{ lat: number; lng: number }[]>([])

const loader = new Loader({
  apiKey: GOOGLE_MAPS_API_KEY,
  version: 'weekly',
  libraries: ['geometry', 'places'],
})

const loadMap = async () => {
  await loader.load()

  // load map centered on your current location
  map = new google.maps.Map(mapDiv.value, {
    center: {
      lat: 50.835,
      lng: 3.264,
    },
    zoom: 16,
  })

  geocoder = new google.maps.Geocoder()
  console.log('map loaded')

  marker = new google.maps.Marker({
    map: map,
    position: {
      lat: 50.835,
      lng: 3.264,
    },
  })
}

const showInfoWindow = () => {
  infoWindow = new google.maps.InfoWindow({
    content: 'click on map to get Lat en Long',
    position: {
      lat: 50.835,
      lng: 3.264,
    },
  })
  infoWindow.open(map)
}

const handleClick = () => {
  // @ts-ignore
  map.addListener('click', mapsMouseEvent => {
    // Close the current InfoWindow.
    infoWindow.close()
    coordinates.value = mapsMouseEvent.latLng.toJSON()
    // Create a new InfoWindow.
    infoWindow = new google.maps.InfoWindow({
      position: mapsMouseEvent.latLng,
    })
    infoWindow.setContent(
      JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2),
    )
    infoWindow.open(map)
    console.log(coordinates.value)
    chosenCorners.value.push(coordinates.value)
    if (chosenCorners.value.length === 2) {
      for (let i = 0; i < chosenCorners.value.length; i++) {
        corners.value[i].lat = parseFloat(chosenCorners.value[i].lat.toFixed(8))
        corners.value[i].lng = parseFloat(chosenCorners.value[i].lng.toFixed(8))
      }
      emit('coordinates', corners.value)
    }
  })
}
const codeAddress = () => {
  geocoder.geocode(
    // @ts-ignore
    { address: addressInput.value as string },
    function (results: any, status: any) {
      if (status == 'OK') {
        map.setCenter(results[0].geometry.location)
        marker.setPosition(results[0].geometry.location)
      } else {
        alert('Geocode was not successful for the following reason: ' + status)
      }
    },
  )
}

onMounted(async () => {
  await loadMap()
  loading.value = false
  showInfoWindow()
  handleClick()
})
</script>

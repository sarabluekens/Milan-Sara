<template>
  <div v-if="loading" style="width: 80%; height: 50vh">loading</div>
  <div ref="mapDiv" style="width: 80%; height: 50vh"></div>
  <form class="flex flex-col" @submit.prevent="codeAddress">
    <input ref="addressInput" type="textbox" value="Sydney, NSW" />
    <button
      class="bg-red rounded rounded-md px-10 py-3 body-white self-end mt-3vh"
    >
      Send
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Loader } from '@googlemaps/js-api-loader'
import { onMounted } from 'vue'

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

const loading = ref(true)
const mapDiv = ref()
let addressInput: string
let map: google.maps.Map
let geocoder: google.maps.Geocoder
let infoWindow: google.maps.InfoWindow

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
    zoom: 5,
  })

  geocoder = new google.maps.Geocoder()
  console.log('map loaded')
  
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

    // Create a new InfoWindow.
    infoWindow = new google.maps.InfoWindow({
      position: mapsMouseEvent.latLng,
    })
    infoWindow.setContent(
      JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2),
    )
    infoWindow.open(map)
  })
}
const codeAddress = () => {
  geocoder.geocode(
    // @ts-ignore
    { address: addressInput.value as string },
    function (results: any, status: any) {
      if (status == 'OK') {
        map.setCenter(results[0].geometry.location)
        var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location,
        })
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

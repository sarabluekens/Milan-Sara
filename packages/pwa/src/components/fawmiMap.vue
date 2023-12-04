<!-- <template>
  <div id="map" style="width: 50%; height: 50%"></div>
  <GMapMap
    :center="coords"
    :zoom="15"
    map-type-id="terrain"
    style="width: 100vw; height: 20rem"
    :options="{
      zoomControl: true,
      mapTypeControl: true,
      scaleControl: true,
      streetViewControl: true,
      rotateControl: true,
      fullscreenControl: true,
    }"
  >
    <GMapMarker
      :key="marker.id"
      v-for="marker in markers"
      :position="marker.position"
      @click="clickHandler(marker)"
    />
    <GmapInfoWindow
      :position="{ lat: 51.093048, lng: 0.84212 }"
      :opened="infoWindowOpened"
    >
       Custom content for the overlay
      <img src="/tree-736885_1280.jpg" alt="Custom Overlay" />
    </GmapInfoWindow>
  </GMapMap>
</template>
<script setup lang="ts">
// import { google } from 'googleapis'
// import { ref } from 'vue'

// // Setting the default coordinates to London
// const coords = ref({ lat: 51.093048, lng: 0.84212 })
// const infoWindowOpened = ref(true)
// const markers = ref([
//   {
//     id: 'dfsldjl3r',
//     position: {
//       lat: 51.093048,
//       lng: 0.84212,
//     },
//   },
// ])
// // Marker Details
// const markerDetails = ref({
//   id: 1,
//   position: coords.value,
// })
// // Get users' current location
// const getUserLocation = () => {
//   // Check if geolocation is supported by the browser
//   const isSupported = 'navigator' in window && 'geolocation' in navigator
//   if (isSupported) {
//     // Retrieve the user's current position
//     navigator.geolocation.getCurrentPosition(position => {
//       coords.value.lat = position.coords.latitude
//       coords.value.lng = position.coords.longitude
//     })
//   }
// }
// const overlay = new google.maps.OverlayView()

// const clickHandler = (marker: any) => {
//   markerDetails.value.id = marker.id
//   markerDetails.value.position = marker.position
//   infoWindowOpened.value = !infoWindowOpened.value
//   console.log('clicked', markerDetails.value.id)
// }
</script>

CustomOverlayMap.vue -->
<template>
  <GMapMap
    ref="mapRef"
    :center="center"
    :zoom="zoom"
    map-type-id="terrain"
    style="width: 100vw; height: 20rem"
    :options="{
      zoomControl: true,
      mapTypeControl: true,
      scaleControl: true,
      streetViewControl: true,
      rotateControl: true,
      fullscreenControl: true,
    }"
    @loaded="onMapLoaded"
  ></GMapMap>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue'

export default {
  mounted() {
    // @ts-ignore
    const map = this.$refs.mapRef
    console.log('map', map)
  },
  setup() {
    const center = { lat: 37.7749, lng: -122.4194 }
    const zoom = 12
    const refs = ref()

    const onMapLoaded = () => {
      console.log('Map loaded!')

      // After the map is loaded, add your custom overlay
      addCustomOverlay()
    }

    const addCustomOverlay = () => {
      const map = refs.value.$mapObject // Access the Google Maps object
      console.log('map', map)

      const overlay = new google.maps.OverlayView()

      overlay.onAdd = function () {
        const div = document.createElement('div')
        div.style.borderStyle = 'none'
        div.style.borderWidth = '0px'
        div.style.position = 'absolute'
        div.style.zIndex = '100'
        div.innerHTML =
          '<img src="path/to/your/image.png" style="width: 50px; height: 50px;">'
        this.div_ = div
        const panes = this.getPanes()
        panes.overlayLayer.appendChild(div)
      }

      overlay.draw = function () {
        const overlayProjection = this.getProjection()
        const position = overlayProjection.fromLatLngToDivPixel(
          new google.maps.LatLng(37.7749, -122.4194),
        )
        const div = this.div_
        div.style.left = position.x - 25 + 'px'
        div.style.top = position.y - 25 + 'px'
      }

      overlay.onRemove = function () {
        this.div_.parentNode.removeChild(this.div_)
      }

      overlay.setMap(map)
    }

    return { center, zoom, onMapLoaded }
  },
}
</script>

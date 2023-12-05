<template>
  <div id="map" style="width: 50%; height: 50%"></div>
</template>
<script setup lang="ts">
import { google } from 'googleapis'
import { onMounted } from 'vue'

const apikey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

const initMap = () => {
  onMounted(() => {
    console.log('mounted')

    console.log('initMap')

    let uluru = { lat: -25.344, lng: 131.036 }
    let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: uluru,
    })
    let marker = new google.maps.Marker({
      position: uluru,
      map: map,
    })
  })
}

const url = `https://maps.googleapis.com/maps/api/js?key=${apikey}callback=${initMap}&v=weekly`
const script = document.createElement('script')
script.src = url
script.defer = true
script.async = true
document.head.appendChild(script)
</script>

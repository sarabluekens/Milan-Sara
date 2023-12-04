<template>
  <p>
    {{
      JSON.stringify(
        {
          coords: {
            accuracy: coords.accuracy, // in meters
            latitude: coords.latitude,
            longitude: coords.longitude,
            altitude: coords.altitude,
            altitudeAccuracy: coords.altitudeAccuracy,
            heading: coords.heading,
            speed: coords.speed,
          },
          locatedAt,
          error: error ? error.message : error,
        },
        null,
        2,
      )
    }}
  </p>

  <p class="text-center ml-20rem">
    {{ coords.longitude }}
    {{ coords.latitude }}
  </p>

  <GMapMap
    class="ml-20rem w-1/2 h-full"
    :center="center"
    :zoom="zoom"
    :options="{ mapTypeId: 'satellite' }"
    @click="pause"
  />
</template>

<script setup lang="ts">
import { useGeolocation } from '@vueuse/core'

import GMapMap from '@fawmi/vue-google-maps'

// get coords, locatedAt, error, resume, pause of device
const { coords, locatedAt, error, resume, pause } = useGeolocation()

// load map
const center = { lat: 45.508, lng: -73.587 }
const zoom = 8
</script>

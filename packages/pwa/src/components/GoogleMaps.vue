<template>
  <pre lang="json">{{
    JSON.stringify(
      {
        coords: {
          accuracy: coords.accuracy,
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
  }}</pre>

  <p>
    {{ (JSON.stringify(coords.latitude), JSON.stringify(coords.longitude)) }}
  </p>
</template>

<script setup lang="ts">
import { useGeolocation } from '@vueuse/core'
const { coords, locatedAt, error, resume, pause } = useGeolocation()
</script>

import { onMounted, onUnmounted, ref } from 'vue'

export default function useGeoLocation2() {
  const coords = ref({ latitude: 0, longitude: 0 })
  const isSupported = 'geolocation' in navigator && 'geolocation' in window

  let watcher: number
  onMounted(() => {
    if (isSupported)
      watcher = navigator.geolocation.watchPosition(position => {
        coords.value = position.coords
      })
  })

  onUnmounted(() => {
    if (watcher) navigator.geolocation.clearWatch(watcher)
  })
  return {
    coords,
    isSupported,
  }
}

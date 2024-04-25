import { onMounted, onUnmounted, ref } from 'vue'

const getCoords = () => {
  const coords = ref({ latitude: 0, longitude: 0 })

  const isSupported = 'geolocation' in navigator && 'geolocation' in window

  let watcher: number
  watcher = navigator.geolocation.watchPosition(position => {
    coords.value = position.coords
    console.log('mounted', coords.value)
  })

  return {
    coords,
  }
}
export default () => {
  // State for each composable

  return {
    getCoords,
  }
}

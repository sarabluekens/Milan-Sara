import { createApp } from 'vue'

import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'

import App from './App.vue'
import router from './bootstrap/router'

import useFirebase from './composables/useFirebase'
import { i18n } from './bootstrap/i18n'
import PrimeVue from 'primevue/config'

import useCustomUser from './composables/useCustomUser'
import 'primevue/resources/themes/saga-blue/theme.css' //theme
import 'primevue/resources/primevue.min.css' //core css
import Calendar from 'primevue/calendar'
import VueGoogleMaps from '@fawmi/vue-google-maps'
import withUUID from 'vue-uuid'

const app = createApp(App)
const { restoreUser, firebaseUser } = useFirebase()
const { restoreCustomUser } = useCustomUser()

app.use(i18n) // moet altijd voor de router!
;(async () => {
  await restoreUser()
  console.log(firebaseUser.value)
  if (firebaseUser.value) await restoreCustomUser()

  app.use(PrimeVue)
  app.component('Calendar', Calendar)
  app.use(router)

  app.mount('#app')
})()

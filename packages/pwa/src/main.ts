import { createApp } from 'vue'

import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'

import App from './App.vue'
import router from './bootstrap/router'

import useFirebase from './composables/useFirebase'
import { i18n } from './bootstrap/i18n'
import useCustomUser from './composables/useCustomUser'

const app = createApp(App)
const { restoreUser, firebaseUser } = useFirebase()
const { restoreCustomUser } = useCustomUser()

app.use(i18n) // moet altijd voor de router!
;(async () => {
  await restoreUser()
  console.log(firebaseUser.value)
  if (firebaseUser.value) await restoreCustomUser()

  app.use(router)
  app.mount('#app')
})()

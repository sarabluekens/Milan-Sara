import { createApp } from 'vue'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'

import App from './App.vue'
import router from './bootstrap/router'

import useFirebase from './composables/useFirebase'
import { i18n } from './bootstrap/i18n'
import useLanguage from './composables/useLanguage'
import { useI18n } from 'vue-i18n'

const app = createApp(App)
const { restoreUser } = useFirebase()

app.use(i18n) // moet altijd voor de router!

restoreUser().then(() => {
  // ;async () => {
  //?????
  // await restoreUser() //???
  app.use(router)

  app.mount('#app')
  // }
})

<template>
  <div>
    {{ $t('account.welcome', { user: firebaseUser?.displayName }) }}
  </div>
  <label class="block" for="language">Select language</label>
  <select
    class="block"
    name="language"
    id="language"
    @change="setLanguage"
    :value="locale"
  >
    <option v-for="(value, key) in SUPPORTED_LOCALES" :value="key">
      {{ value }}
    </option>
  </select>
</template>

<script setup lang="ts">
import useFirebase from '@/composables/useFirebase'
import { SUPPORTED_LOCALES } from '@/bootstrap/i18n'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import useLanguage from '@/composables/useLanguage'

const { firebaseUser } = useFirebase()
const { replace } = useRouter()
const { setLocale } = useLanguage()
const { locale } = useI18n()

firebaseUser.value?.getIdToken().then(token => {
  console.log(`{"Authorization": "Bearer ${token}"}`)
})

// const logoutUser = () => {
//   logout().then(() => {
// replace ({path:'/'})
//})
// }

const setLanguage = (event: Event) => {
  const target = event.target as HTMLSelectElement
  console.log(target.value)
  setLocale(target.value)
}
</script>

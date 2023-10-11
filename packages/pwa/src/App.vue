<script lang="ts">
import { provide } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'

import AppFooter from './components/generic/AppFooter.vue'
import AppHeader from './components/generic/AppHeader.vue'

import useGraphql from './composables/useGraphql'
import useLanguage from './composables/useLanguage'
import { useI18n } from 'vue-i18n'
//import { customUser } from './composables/useCustomUser' error

export default {
  components: {
    AppFooter,
    AppHeader,
  },
  setup() {
    const { apolloClient } = useGraphql()
    // const { locale } = useLanguage()
    const { setLocale } = useLanguage()
    const { locale } = useI18n()
    // Maakt alles beschikbaar in de scope
    provide(DefaultApolloClient, apolloClient)

    // if (customUser.value?.locale) {
    //   setLocale(customUser.value.locale)
    // } error

    setLocale(locale.value)

    return {
      locale,
    }
  },
}
</script>

<template>
  <div class="bg-pink-400 text-yellow-500">
    <AppHeader />
    <RouterView />
    {{ locale }}
    {{ $t('hello') }}
    <AppFooter />
  </div>
</template>

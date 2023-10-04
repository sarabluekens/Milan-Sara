<script lang="ts">
import { provide } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'

import AppFooter from './components/generic/AppFooter.vue'
import AppHeader from './components/generic/AppHeader.vue'

import useGraphql from './composables/useGraphql'

export default {
  components: {
    AppFooter,
    AppHeader,
  },
  setup() {
    const { apolloClient } = useGraphql()

    // Maakt alles beschikbaar in de scope
    provide(DefaultApolloClient, apolloClient)
  },
}
</script>

<template>
  <div class="bg-pink-400 text-yellow-500">
    <AppHeader />
    <RouterView />
    <AppFooter />
  </div>
</template>

<template>
  <section
    class="class= flex sm:h-20vh h-24vh sm:flex-row sm:justify-evenly sm:w-48vw m-auto h-"
  >
    <p>Dit is de naam van het event: {{ event.event.name }}</p>
  </section>
</template>

<script lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { GET_EVENT_BY_ID } from '@/graphql/event.query'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    const {
      loading: eventLoading,
      result: event,
      error: eventError,
    } = useQuery(GET_EVENT_BY_ID, { id: route.params.id })

    return {
      eventLoading,
      event: event,
      eventError,
    }
  },
}
</script>

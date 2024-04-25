<template class="h-100vh">
  <section
    class="w-15% flex flex-col sm:flex-row justify-end gap-3 mt-3 absolute right-1 top-1 md:right-5 md:top-5"
  >
    <div
      v-for="(value, key) in SUPPORTED_LOCALES"
      :value="locale"
      class="w-2rem xl:w-15vw"
      @click="setLanguage(key)"
    >
      <img
        :src="key + '.png'"
        alt=""
        width="100"
        height="100"
        class="cursor-pointer"
      />
    </div>
  </section>
  <section
    class="md:ml-5rem pt-3 bg-beige w-3/4 md:w-auto flex flex-col gap-5 md:gap-1 sm:flex-row-reverse items-center justify-center"
  >
    <h1 class="title-red leading-none">
      {{ $t('landing.title') }} <br /><span
        class="text-3rem sm:text-4rem md:text-8rem"
        >{{ $t('landing.title.span') }}
      </span>
    </h1>
    <img
      src="/redCross.svg"
      alt="logo"
      class="w-20vw xl:w-15rem h-auto"
      width="100"
      height="100"
    />
  </section>
  <section class="ml-2rem md:ml-7rem mt-3rem">
    <h2 class="subtitle-red text-left">{{ $t('landing.subtitle') }}</h2>
    <p class="body-black text-left pb-4">
      {{ $t('landing.action') }}
    </p>

    <div class="flex flex-wrap flex-row">
      <div
        class="w-12rem md:w-14rem lg:w-16rem m-2 h-fit md:h-23rem bg-red rounded-lg flex items-start justify-evenly"
        v-if="!eventsLoading && events.eventsToday.length > 0"
        v-for="item in events.eventsToday"
        :key="item.id"
      >
        <EventCard :event="item" />
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { GET_EVENT_BY_DATE } from '@/graphql/event.query'
import EventCard from '../components/EventCard.vue'
import { useQuery } from '@vue/apollo-composable'
import { SUPPORTED_LOCALES } from '@/bootstrap/i18n'
import { useI18n } from 'vue-i18n'
import useLanguage from '@/composables/useLanguage'

const { setLocale } = useLanguage()
const { locale } = useI18n()

const setLanguage = (key: string) => {
  console.log(key)
  setLocale(key)
}

const {
  loading: eventsLoading,
  result: events,
  error: eventsError,
} = useQuery(GET_EVENT_BY_DATE)

const tempEvents = [
  {
    id: '1',
    name: 'Belgie - Nederland',
    category: 'Sport',
    city: 'Gent',
  },
  {
    id: '2',
    name: 'Tomrrowland Winter Edition',
    category: 'Festival',
    city: 'Boom',
  },
  {
    id: '3',
    name: 'Boekenbeurs Eutopia',
    category: 'Expo',
    city: 'Antwerpen',
  },
  {
    id: '4',
    name: "Panic at the disco's concert",
    category: 'Concert',
    city: 'Brussel',
  },
]
</script>

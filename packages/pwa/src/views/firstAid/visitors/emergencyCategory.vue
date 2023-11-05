<template>
  <article class="ml-7rem">
    <h1 class="title-red">What happened?</h1>
    <p class="subtitle-red">What kind of help do you need?</p>
    <div v-for="item in items" class="flex flex-wrap justify-center m-3">
      <EmergencyCard
        :image="item.image"
        :title="item.text"
        :icon="item.icon"
        :subtitle="item.subtitle"
        :category="item.category"
        @setCategory="setCategory(item.category)"
      />
    </div>
  </article>
</template>

<script setup lang="ts">
import EmergencyCard from '../../../components/generic/emergencyCard.vue'
const items = [
  {
    text: 'Unconscious',
    category: 'unconscious',
    icon: 'i-ic-baseline-phone',
    subtitle: 'You will be called for urgent aid',
    image: 'unconscious.svg',
  },
  { text: 'Fell', image: 'fell.svg', category: 'fell' },
  { text: 'Drug and/or alcohol abuse', category: 'drugs', image: 'drugs.svg' },
  { text: 'Heavy bleeding', category: 'bleed', image: 'bleed.svg' },
  { text: 'Allergic reaction', category: 'allergy', image: 'allergy.svg' },
  {
    text: "I don't know, something else",
    category: 'otherInjury',
    image: 'otherInjury.svg',
  },
]
const setCategory: any = (category: string) => {
  console.log(category)
}
</script>

<style scoped>
/* Your CSS styles here */
</style>

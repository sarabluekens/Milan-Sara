<template>
  <article class="ml-7rem">
    <h1 class="title-red">What happened?</h1>
    <p class="subtitle-red">What kind of help do you need?</p>

    <div class="flex flex-wrap justify-center m-3">
      <EmergencyCard
        image="unconscious.svg"
        title="Victim is unconscious"
        icon="i-ic-baseline-phone"
        subtitle="You will be called for urgent aid"
      />
      <EmergencyCard image="fell.svg" title="Victim fell" />
      <EmergencyCard image="drugs.svg" title="Drug and/or alcohol abuse" />
      <EmergencyCard image="bleed.svg" title="Heavy bleeding" />
      <EmergencyCard image="allergy.svg" title="Allergic reaction" />
      <EmergencyCard
        image="otherInjury.svg"
        title="I don't know, something else"
      />
    </div>
  </article>
</template>

<script lang="ts">
import EmergencyCard from '../../../components/generic/emergencyCard.vue'
export default {
  name: 'EmergencyCategory',
  components: {
    EmergencyCard,
  },
  // Your Vue component logic here
}
</script>

<style scoped>
/* Your CSS styles here */
</style>

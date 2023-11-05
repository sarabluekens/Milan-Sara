<template>
  <section class="bg-red rounded-md p-3 m-3 w-1/4 h-1/3">
    <h2 class="body-beige text-center p-3">{{ title }}</h2>
    <img class="m-auto p-3" :src="image" :alt="image" />
    <div class="flex items-center justify-center p3">
      <div :class="icon" class="icon-3 color-beige"></div>
      <p class="subbody-beige text-center w-1/2">{{ subtitle }}</p>
    </div>
  </section>
</template>

<script lang="ts">
export default {
  name: 'EmergencyCard',
  // Your Vue component logic here
  props: {
    image: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    subimage: {
      type: String,
      required: false,
    },
    subtitle: {
      type: String,
      required: false,
    },
  },
}
</script>

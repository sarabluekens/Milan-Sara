<template>
  <p>{{ title }}</p>
  <img :src="image" :alt="image" />
  <p>{{ subtitle }}</p>
  <img :src="subimage" :alt="subimage" />
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

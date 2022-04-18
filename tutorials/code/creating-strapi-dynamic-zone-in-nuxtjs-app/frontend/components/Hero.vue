<template>
  <div class="hero-section">
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
  </div>
</template>

<script>
export default {
  name: 'HeroSection',
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
}
</script>

<style>
.hero-section {
  line-height: 1.75;
  margin-bottom: 2em;
  padding: 2vw 0;
}
</style>

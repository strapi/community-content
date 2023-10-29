<template>
  <div class="hero">
    <div v-for="section in sections" :key="section.id">
      <!-- Display Texts -->
      <div
        v-if="section.__component === 'rich.text'"
        v-html="$md.render(section.text)"
      />

      <!-- Displays Quotes -->
      <figure v-if="section.__component === 'rich.quote'">
        <blockquote>{{ section.quote }}</blockquote>
        <figcaption>by {{ section.quoter }}</figcaption>
      </figure>

      <!-- Displays Images -->
      <figure v-if="section.__component === 'rich.image'">
        <img :src="`${strapiEndpoint}${section.image.data.attributes.url}`" />
        <figcaption>{{ section.caption }}</figcaption>
      </figure>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GridBloc',
  props: {
    sections: {
      type: Array,
      required: true,
    },
  },
  computed: {
    strapiEndpoint() {
      return process.env.strapiEndpoint
    },
  },
}
</script>

<style>
img {
  height: auto;
  max-width: 100%;
}
</style>

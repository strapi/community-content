<template>
  <div>
    <Header />
    <div class="uk-section uk-section-default">
      <div class="uk-container uk-container-large">

        <nuxt />

      </div>
    </div>

  </div>
</template>

<script>
import Header from '~/components/Header.vue'
export default {
  components: {
    Header
  }
}
</script>

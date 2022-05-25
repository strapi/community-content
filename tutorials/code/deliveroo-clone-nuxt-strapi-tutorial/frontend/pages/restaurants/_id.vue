<template>
  <div class="uk-container uk-container-xsmall">
    <span class="uk-heading-small">
      <NuxtLink class="uk-button uk-button-text" to="/">
        <span uk-icon="arrow-left"></span> go back
      </NuxtLink>
    </span>

    <div
      v-for="dish in dishes"
      :key="dish.id"
      class="
        uk-card uk-card-default uk-grid-collapse uk-child-width-1-2@s uk-margin
      "
      uk-grid
    >
      <figure class="uk-flex-last@s uk-card-media-right uk-cover-container">
        <canvas class="uk-height-max-small"></canvas>
        <img
          :src="getStrapiMedia(dish.attributes.image.data.attributes.url)"
          :alt="dish.attributes.image.data.attributes.alternativeText"
          uk-cover
        />
      </figure>
      <div class="uk-card-body uk-card-small">
        <h2 class="uk-card-title">{{ dish.attributes.name }}</h2>
        <p>{{ restaurant.data.attributes.name }}</p>
        <p>{{ dish.attributes.price }}&euro;</p>
        <button class="uk-button uk-button-primary" @click="addToCart(dish)">
          Add to cart
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { getStrapiMedia } from '@/utils/media'
import restaurantQuery from '@/apollo/queries/restaurant'

export default {
  data() {
    return {
      restaurant: Object,
    }
  },
  apollo: {
    restaurant: {
      prefetch: true,
      query: restaurantQuery,
      variables() {
        return { id: this.$route.params.id }
      },
    },
  },
  computed: {
    dishes() {
      if (!this.restaurant?.data) return []

      return this.restaurant.data.attributes.dishes.data
    },
  },
  methods: {
    getStrapiMedia,
    ...mapMutations({
      addToCart: 'cart/add',
      removeFromCart: 'cart/remove',
    }),
  },
}
</script>

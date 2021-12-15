<template>
  <div class="uk-container uk-container-xsmall">
    <h1 class="uk-heading-small">
      <span class="uk-invisible">Restaurants</span>
      <input
        v-model="query"
        class="uk-search-input"
        type="search"
        placeholder="Type to search"
      />
    </h1>

    <div
      v-for="restaurant in filteredList"
      :key="restaurant.id"
      class="
        uk-card uk-card-default uk-grid-collapse uk-child-width-1-2 uk-margin
      "
      uk-grid
    >
      <figure class="uk-flex-last uk-card-media-right uk-cover-container">
        <img
          :src="getStrapiMedia(restaurant.attributes.image.data.attributes.url)"
          :alt="restaurant.attributes.image.data.attributes.alternativeText"
          uk-cover
        />
      </figure>
      <div>
        <div class="uk-card-body uk-card-small">
          <h2 class="uk-card-title">{{ restaurant.attributes.name }}</h2>
          <NuxtLink
            class="uk-button uk-button-text"
            :to="{ name: 'restaurants-id', params: { id: restaurant.id } }"
          >
            See dishes
          </NuxtLink>
        </div>
      </div>
    </div>

    <div v-if="filteredList.length == 0" class="uk-heading-small">
      <p>No restaurants found</p>
    </div>
  </div>
</template>

<script>
import { getStrapiMedia } from '@/utils/media'
import restaurantsQuery from '@/apollo/queries/restaurants'

export default {
  data() {
    return {
      restaurants: [],
      query: '',
    }
  },
  apollo: {
    restaurants: {
      prefetch: true,
      query: restaurantsQuery,
    },
  },
  computed: {
    filteredList() {
      if (!this.restaurants?.data) return []

      return this.restaurants?.data?.filter((restaurant) => {
        return restaurant.attributes.name
          .toLowerCase()
          .includes(this.query.toLowerCase())
      })
    },
  },
  methods: {
    getStrapiMedia,
  },
}
</script>

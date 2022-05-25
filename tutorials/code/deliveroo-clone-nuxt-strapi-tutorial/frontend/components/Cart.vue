<template>
  <div>
    <div v-if="price > 0">
      <div
        v-for="dish in selectedDishes"
        :key="dish.id"
        class="uk-grid-small uk-flex"
        uk-grid
      >
        <div class="uk-width-expand">
          <p class="uk-margin-remove-bottom">{{ dish.attributes.name }}</p>
          <p class="uk-text-meta uk-margin-remove-top">
            {{ dish.quantity }} &times; {{ dish.attributes.price }}&euro;
          </p>
        </div>
        <div v-if="checkout" class="uk-width-auto">
          <button type="button" uk-close @click="removeFromCart(dish)"></button>
        </div>
      </div>
      <div class="uk-grid-small uk-flex" uk-grid>
        <div class="uk-width-expand">Subtotal</div>
        <div>{{ price }}&euro;</div>
      </div>
      <div v-if="checkout">
        <NuxtLink
          class="uk-button uk-button-secondary uk-width-1-1"
          to="/checkout"
        >
          Checkout
        </NuxtLink>
      </div>
    </div>
    <div v-else class="uk-text-meta">Empty</div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    checkout: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapGetters({
      selectedDishes: 'cart/items',
      price: 'cart/price',
    }),
  },
  methods: {
    ...mapMutations({
      addToCart: 'cart/add',
      removeFromCart: 'cart/remove',
    }),
  },
}
</script>

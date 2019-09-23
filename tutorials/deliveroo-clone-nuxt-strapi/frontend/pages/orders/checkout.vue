<template>
<div>

  <a class="uk-button uk-button-primary uk-margin" @click="$router.go(-1)"><span uk-icon="arrow-left"></span> go back</a>

  <client-only placeholder="Chargement...">

    <div uk-grid>
        <div class="uk-width-1-3@m">

          <div class="uk-card uk-card-default uk-card-body uk-width-1-1@m">

            <form @submit.stop.prevent="handleSubmit">
                <fieldset class="uk-fieldset">

                    <legend class="uk-legend">Checkout</legend>

                    <div class="uk-margin">
                        <label class="uk-form-label" for="form-stacked-text">Address</label>
                        <input class="uk-input" v-model="address" type="text" placeholder="13 boulevard francis">
                    </div>

                    <div class="uk-margin">
                        <label class="uk-form-label" for="form-stacked-text">City</label>
                        <input class="uk-input" v-model="city" type="text" placeholder="San francisco">
                    </div>

                    <div class="uk-margin">
                        <label class="uk-form-label" for="form-stacked-text">Postal code</label>
                        <input class="uk-input" v-model="postalCode" type="text" placeholder="92000">
                    </div>

                    <div class="uk-margin">
                      <label for="card">Card</label>
                        <card
                          ref="card-stripe"
                          stripe="YOUR_STRIPE_PUBLIC_API_KEY"
                          @change='complete = $event.complete'
                        />

                    </div>

                    <div class="uk-margin">
                    </div>

                </fieldset>
            </form>
          </div>

        </div>
        <div class="uk-width-expand@m">
            <Cart />
        </div>
    </div>
  </client-only>


</div>
</template>

<script>
import Cart from '~/components/Cart.vue'
import { Card, createToken } from 'vue-stripe-elements-plus'
import strapi from '~/utils/Strapi'

export default {
  components: {
    Card,
    Cart
  },
  data() {
    return {
      address: '',
      postalCode: '',
      city: '',
      complete: false,
      loading: false
    }
  },
  methods: {
    async handleSubmit() {
      this.loading = true
      let token
      try {
        const response = await createToken()
        token = response.token.id
      } catch (err) {
        alert('An error occurred.')
        this.loading = false
        return
      }
      try {
        await strapi.createEntry('orders', {
          amount: this.$store.getters['cart/price'],
          dishes: this.$store.getters['cart/items'],
          address: this.address,
          postalCode: this.postalCode,
          city: this.city,
          token
        })
        alert('Your order have been successfully submitted.')
        this.emptyCart()
        this.$router.push('/')
      } catch (err) {
        this.loading = false
        alert('An error occurred.')
      }
    }
  }
}
</script>

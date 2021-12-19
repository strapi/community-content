<template>
  <div class="uk-container uk-container-xsmall">
    <h1 class="uk-heading-small">Checkout</h1>

    <div v-if="success" class="uk-alert-success" uk-alert>
      <a class="uk-alert-close" uk-close></a>
      <p>{{ success.message }}</p>
    </div>

    <div v-if="err" class="uk-alert-danger" uk-alert>
      <a class="uk-alert-close" uk-close></a>
      <p>{{ err.message }}</p>
    </div>

    <Cart :checkout="false" />

    <div class="uk-margin">
      <label class="uk-form-label">
        Address
        <input v-model="address" class="uk-input" type="email" />
      </label>
    </div>

    <div class="uk-margin-top">
      <StripeElements v-slot="{ elements }" ref="elms" :stripe-key="stripeKey">
        <StripeElement ref="card" type="card" :elements="elements" />
      </StripeElements>

      <button
        class="uk-button uk-button-secondary uk-margin-top uk-width-1-1"
        @click="pay"
      >
        Pay
      </button>
    </div>
  </div>
</template>

<script>
import { StripeElements, StripeElement } from 'vue-stripe-elements-plus'
import { mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    StripeElements,
    StripeElement,
  },
  data() {
    return {
      success: null,
      err: null,
      address: '',
      stripeKey:
        '##Clé publique##', // test key, don't hardcode
    }
  },
  computed: {
    ...mapGetters({
      username: 'auth/username',
      token: 'auth/token',
    }),
  },
  methods: {
    async pay() {
      // ref in template
      const groupComponent = this.$refs.elms
      const cardComponent = this.$refs.card
      // Get stripe element
      const cardElement = cardComponent.stripeElement

      const address = this.address

      const username = this.username

      let token = this.token
      this.$http.setToken(token, 'Bearer')

      try {
        // Access instance methods, e.g. createToken()
        token = await groupComponent.instance.createToken(cardElement)
      } catch (err) {
        this.err = err.response?.data?.error
      }

      try {
        await this.$http.$post('orders', {
          data: {
            address,
            amount: this.$store.getters['cart/price'],
            user: username,
            dishes: this.$store.getters['cart/items'],
            token,
          },
        })

        // this.emptyCart()
        this.success = {
          message: 'Payment completed successfuly',
        }
      } catch (err) {
        this.err = err.response?.data?.error
      }
    },
    ...mapMutations({
      emptyCart: 'cart/emptyList',
    }),
  },
}
</script>

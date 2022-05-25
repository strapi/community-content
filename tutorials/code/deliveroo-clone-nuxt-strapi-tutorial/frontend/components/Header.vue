<template>
  <nav class="uk-navbar uk-navbar-container" uk-navbar>
    <div class="uk-navbar-left">
      <NuxtLink class="uk-navbar-item uk-logo" to="/">Deliveroo clone</NuxtLink>
    </div>

    <div class="uk-navbar-right">
      <ul v-if="username" class="uk-navbar-nav">
        <li>
          <button class="uk-button uk-button-link uk-navbar-toggle">
            Shopping Cart
            <span v-if="numberOfItems" class="uk-badge">{{
              numberOfItems
            }}</span>
          </button>
          <div class="uk-navbar-dropdown">
            <Cart />
          </div>
        </li>
        <li>
          <button
            class="uk-button uk-button-link uk-navbar-toggle"
            @click="logout"
          >
            Log out
          </button>
        </li>
      </ul>
      <ul v-else class="uk-navbar-nav">
        <li><NuxtLink to="/auth/login">Log In</NuxtLink></li>
        <li><NuxtLink to="/auth/register">Register</NuxtLink></li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      username: 'auth/username',
      numberOfItems: 'cart/numberOfItems',
    }),
  },
  methods: {
    ...mapMutations({
      logout: 'auth/logout',
    }),
  },
}
</script>

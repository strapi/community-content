<template>
  <client-only>
  <nav class="uk-navbar-container" uk-navbar>
      <div class="uk-navbar-left">

          <ul class="uk-navbar-nav">
              <li class="uk-active"><router-link tag="a" class="navbar-brand" to="/" exact>Deliveroo clone</router-link></li>
              <li><router-link tag="a" class="navbar-brand" to="/restaurants" exact>Restaurants</router-link></li>
          </ul>

      </div>

      <div class="uk-navbar-right">

          <ul class="uk-navbar-nav" v-if="username">
              <li><a href="#" class="uk-link-reset">{{ username }}</a></li>
              <li><a href="#" @click="logout">Logout</a></li>
          </ul>

          <ul class="uk-navbar-nav" v-else>
              <li><a href="/users/register">Signup</a></li>
              <li><a href="/users/signin">Signin</a></li>
          </ul>

      </div>

  </nav>
</client-only>

</template>

<script>
import { mapMutations } from 'vuex'

export default {
  computed: {
    username() {
      return this.$store.getters['auth/username']
    }
  },
  methods: {
    ...mapMutations({
      logout: 'auth/logout'
    })
  }
}
</script>

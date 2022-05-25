<template>
  <div class="uk-container uk-container-xsmall">
    <h1 class="uk-heading-xsmall uk-margin-top">Sign up</h1>

    <form @submit.stop.prevent="handleSubmit">
      <div v-if="err" class="uk-alert-danger" uk-alert>
        <a class="uk-alert-close" uk-close></a>
        <p>{{ err.message }}</p>
      </div>

      <div class="uk-margin">
        <label class="uk-form-label">
          Username
          <input v-model="username" class="uk-input" type="text" />
        </label>
      </div>

      <div class="uk-margin">
        <label class="uk-form-label">
          Email
          <input v-model="email" class="uk-input" type="email" />
        </label>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label">
          Password
          <input v-model="password" class="uk-input" type="password" />
        </label>
      </div>

      <button class="uk-button uk-button-primary uk-width-1-1" type="submit">
        Log In
      </button>
    </form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      err: null,
    }
  },
  methods: {
    async handleSubmit() {
      try {
        const { jwt, user } = await this.$http.$post('auth/local/register', {
          username: this.username,
          email: this.email,
          password: this.password,
        })

        this.setUser({
          jwt,
          id: user.id,
          username: user.username,
        })

        this.$router.push({
          path: '/',
        })
      } catch (err) {
        this.err = err.response?.data?.error
      }
    },
    ...mapMutations({
      setUser: 'auth/setUser',
    }),
  },
}
</script>

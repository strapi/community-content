<template>
  <div class="max-w-md w-full mx-auto mt-8">
    <h1 class="text-3xl font-extrabold mb-4">New password</h1>
    <form @submit.prevent="userPassword">
      <div
        v-if="err"
        class="
          p-4
          mb-4
          text-sm text-red-700
          bg-red-100
          rounded-lg
          dark:bg-red-200 dark:text-red-800
        "
        role="alert"
      >
        {{ err }}
      </div>

      <div class="mb-6">
        <label
          for="email"
          class="
            block
            mb-2
            text-sm
            font-medium
            text-gray-900
            dark:text-gray-300
          "
          >Your email</label
        >
        <input
          v-model="email"
          type="email"
          class="
            shadow-sm
            bg-gray-50
            border border-gray-300
            text-gray-900 text-sm
            rounded-lg
            focus:ring-blue-500 focus:border-blue-500
            block
            w-full
            p-2.5
            dark:bg-gray-700
            dark:border-gray-600
            dark:placeholder-gray-400
            dark:text-white
            dark:focus:ring-blue-500
            dark:focus:border-blue-500
            dark:shadow-sm-light
          "
          placeholder="name@strapi.io"
          required
        />
      </div>

      <button
        type="submit"
        class="
          text-white
          bg-blue-700
          hover:bg-blue-800
          focus:ring-4 focus:outline-none focus:ring-blue-300
          font-medium
          rounded-lg
          text-sm
          px-5
          py-2.5
          text-center
          dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
        "
      >
        New password
      </button>
    </form>
  </div>
</template>

<script>
export default {
  auth: 'guest',
  data() {
    return {
      err: null,
      email: '',
    }
  },
  methods: {
    async userPassword() {
      try {
        await this.$axios.post('auth/forgot-password', {
          email: this.email,
        })
      } catch (e) {
        if (e.response) this.err = e.response.data.error.message
      }
    },
  },
}
</script>

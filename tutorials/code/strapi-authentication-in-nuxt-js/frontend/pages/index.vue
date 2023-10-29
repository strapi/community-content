<template>
  <div class="max-w-md w-full mx-auto mt-8">
    <h1 class="text-3xl font-extrabold">
      Hello, {{ loggedInUser ? loggedInUser.username : 'World!' }}
    </h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['loggedInUser']),
  },
}
</script>

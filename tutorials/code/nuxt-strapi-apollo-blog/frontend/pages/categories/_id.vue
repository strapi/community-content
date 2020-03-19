<template>
  <div>

    <client-only>
    <div class="uk-section">
      <div class="uk-container uk-container-large">
        <h1>{{ category.name }}</h1>

        <Articles :articles="category.articles || []"></Articles>

      </div>
    </div>
  </client-only>
  </div>
</template>

<script>
import articlesQuery from '~/apollo/queries/article/articles-categories'
import Articles from '~/components/Articles'

export default {
  data() {
    return {
      category: []
    }
  },
  components: {
    Articles
  },
  apollo: {
    category: {
      prefetch: true,
      query: articlesQuery,
      variables () {
        return { id: parseInt(this.$route.params.id) }
      }
    }
  }
}
</script>

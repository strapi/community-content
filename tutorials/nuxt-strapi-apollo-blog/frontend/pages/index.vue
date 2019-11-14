<template>
  <div>

    <div class="uk-section">
      <div class="uk-container uk-container-large">
        <h1>Strapi blog</h1>

        <Articles :articles="articles"></Articles>

      </div>
    </div>

  </div>
</template>

<script>
import articlesQuery from '~/apollo/queries/article/articles'
import Articles from '~/components/Articles'

export default {
  data() {
    return {
      articles: [],
    }
  },
  components: {
    Articles
  },
  apollo: {
    articles: {
      prefetch: true,
      query: articlesQuery,
      variables () {
        return { id: parseInt(this.$route.params.id) }
      }
    }
  }
}
</script>

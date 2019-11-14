<template>
  <div>

      <div v-if="article.image" id="banner" class="uk-height-small uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding" :data-src="'http://localhost:1337/' + article.image.url" uk-img>
        <h1>{{ article.title }}</h1>
      </div>

      <div class="uk-section">
        <div class="uk-container uk-container-small">
            <div v-if="article.content" id="editor" v-html="$md.render(article.content)"></div> 
            <p v-if="article.published_at">{{ moment(article.published_at).format("MMM Do YY") }}</p>
        </div>
      </div>

  </div>
</template>

<script>
import articleQuery from '~/apollo/queries/article/article'
var moment = require('moment')

export default {
  data() {
    return {
      article: {},
      moment: moment,
    }
  },
  apollo: {
    article: {
      prefetch: true,
      query: articleQuery,
      variables () {
        return { id: parseInt(this.$route.params.id) }
      }
    }
  }
}
</script>

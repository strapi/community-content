<template>
  <div>
    <div class="uk-child-width-1-2" uk-grid>
      <div>
        <router-link
          v-for="article in leftArticles"
          :to="{ path: '/article/' + article.id }"
          class="uk-link-reset"
          :key="article.id"
        >
          <div class="uk-card uk-card-muted">
            <div class="uk-card-media-top">
              <img :src="api_url + article.image.url" alt="" height="100" />
            </div>
            <div class="uk-card-body">
              <p
                id="category"
                v-if="article.category"
                class="uk-text-uppercase"
              >
                {{ article.category.name }}
              </p>
              <p id="title" class="uk-text-large">{{ article.title }}</p>
            </div>
          </div>
        </router-link>
      </div>
      <div>
        <div class="uk-child-width-1-2@m uk-grid-match" uk-grid>
          <router-link
            v-for="article in rightArticles"
            :to="{ path: '/article/' + article.id }"
            class="uk-link-reset"
            :key="article.id"
          >
            <div class="uk-card uk-card-muted">
              <div class="uk-card-media-top">
                <img :src="api_url + article.image.url" alt="" height="100" />
              </div>
              <div class="uk-card-body">
                <p
                  id="category"
                  v-if="article.category"
                  class="uk-text-uppercase"
                >
                  {{ article.category.name }}
                </p>
                <p id="title" class="uk-text-large">{{ article.title }}</p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      api_url: process.env.VUE_APP_API_URL
    };
  },
  props: {
    articles: Array
  },
  computed: {
    leftArticlesCount() {
      return Math.ceil(this.articles.length / 5);
    },
    leftArticles() {
      return this.articles.slice(0, this.leftArticlesCount);
    },
    rightArticles() {
      return this.articles.slice(this.leftArticlesCount, this.articles.length);
    }
  }
};
</script>

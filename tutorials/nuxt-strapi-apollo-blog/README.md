# Build a blog with Nuxt, Strapi and Apollo

*By Maxime Castres on date*

## Introduction

In this tutorial, you are going to learn how to create a blog using Nuxt, Strapi and Apollo!

## Goal
The goal here is to be able to create a blog website using strapi as the backend, Nuxt for the frontend and Apollo for requesting strapi API with GraphQL.

## Prerequesites
In order to follow this tutorial, you'll need to have Strapi and Nuxt installed on your computer, but don't worry, we are going to install these together!

## Setup

  - Create a `blog-strapi` folder and get inside!

#### Install Strapi
You are going to use [yarn](https://yarnpkg.com/lang/en/) as your package manager

  - Create a strapi `backend` server by running the following command:

`yarn create strapi-app backend --quickstart`

Strapi will generate a `backend` folder containing your strapi server. At the end of the installation, strapi will automatically open your browser and you'll see the root admin creation form

![](/content/images/2019/11/Creation-admin.png)

  - Create your first user which will be the root admin of this application.

Don't forget that strapi is running on this url [http://localhost:1337](http://localhost:1337)

**Nice!** Now that strapi is ready, you are going to create your Nuxt application

#### Install Nuxt

  - Create a Nuxt `frontend` server by running the following command:

`yarn create nuxt-app frontend`

**Note** Nuxt will ask you some details for your project, just be sure to chose yarn as your package manager, for the others juste press enter

  - Run the followings command to get started!
```
cd frontend
yarn dev
```

Your Nuxt server is now running on [http://localhost:3000](http://localhost:3000)

Let's install [Apollo](https://www.apollographql.com/) and [UIkit](https://getuikit.com/), it is an open source css framework you are going to use for this tutorial but feel free to use another one if you want!

#### Install Apollo and UIkit

**Installation of Apollo**

Be sure that you are inside your `frontend` folder

  - Install `@nuxtjs/apollo` and `graphql` with yarn

`yarn add @nuxtjs/apollo graphql`

Modules and Apollo settings must be referenced in `nuxt.config.js`

  - Add the following module and your apollo configurations to your `nuxt.config.js`:

`/frontend/nuxt.config.js`

```js
...
modules: [
  '@nuxtjs/apollo',
],
apollo: {
  clientConfigs: {
    default: {
      httpEndpoint: 'http://localhost:1337/graphql'
    }
  }
},
...
```

Now you need to enable GraphQL on your strapi server.

  - Go in your `backend` folder and install graphql

`yarn strapi install graphql`

  - Restart your server using `strapi dev`

You should now be able to see the GraphQL playground on this address [http://localhost:1337/graphql](http://localhost:1337/graphql) but you'll use it later on the tutorial, when you'll create your first content type
![](/content/images/2019/11/Capture-d-e-cran-2019-11-06-a--15.17.53.png)

**Installation of UIkit**

UIkit is a lightweight and modular front-end framework for developing fast and powerful web interfaces. You are going to use this css framework for this tutorial but feel free to use yours if you want to

  - Install uikit using yarn and be sure that you are inside the `frontend` folder

`yarn add uikit`

Now you need to initialize UIkit's Js in your Nuxt application. You are going to do this by creating a plugin.

  - Create a `/frontend/plugins/uikit.js` file and copy/paste the following code:

```js
import Vue from 'vue'

import UIkit from 'uikit/dist/js/uikit-core'
import Icons from 'uikit/dist/js/uikit-icons'

UIkit.use(Icons)
UIkit.container = '#__nuxt'

Vue.prototype.$uikit = UIkit
```

  - Add the following part in your `nuxt.config.js` file

```
...
css: [
    'uikit/dist/css/uikit.min.css',
    'uikit/dist/css/uikit.css',
    '@assets/css/main.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/uikit.js', ssr: false }
  ],
...
```

As you can see, you are including UIkit css and a `assets/css/main.css` file ! Let's create it!

  - Create a `assets/css/main.css` file containing the following:

```
a {
  text-decoration: none;
}

h1  {
  font-family: Staatliches;
  font-size: 120px;
}

#category {
   font-family: Staatliches;
   font-weight: 500;
}

#title {
  letter-spacing: .4px;
  font-size: 22px;
  font-size: 1.375rem;
  line-height: 1.13636;
}

#banner {
  margin: 20px;
  height: 800px;
}

#editor {
  font-size: 16px;
  font-size: 1rem;
  line-height: 1.75;
}

.uk-navbar-container {
  background: #fff !important;
  font-family: Staatliches;
}

img:hover {
  opacity: 1;
  transition: opacity 0.25s cubic-bezier(0.39, 0.575, 0.565, 1);
}

```

**Note** You don't need to understand what's in this file. It's just some style ;)

Let's add a beautiful font (Staatliches) to the project!

  - Add the following object to your `link` array in your `nuxt.config.js`

```
link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Staatliches' }
    ]
```
**Perfect!** Restart your server and admire the front page of your application!

![](/content/images/2019/11/Capture-d-e-cran-2019-11-06-a--15.30.14.png)

#### Create Articles
You are now going to create your first content type!

  - Dive in your strapi admin panel and click on the `Content Type Builder` link in the sidebar

![](/content/images/2019/11/Capture-d-e-cran-2019-11-06-a--15.39.45.png)

  - Click on `Add A Content Type` and call it `article`

![](/content/images/2019/11/Capture-d-e-cran-2019-11-06-a--15.39.53.png)

Now you'll be ask to create all the fields for your content type:

![](/content/images/2019/11/Capture-d-e-cran-2019-11-06-a--15.40.02.png)


  - Create the following ones:
    - `title` with type **String**
    - `content` with type **Rich Text**
    - `image` with type **Media**
    - `published_at` with type **Date**

**Press Save!** Here you go, your first content type has been created. Now you may want to create your first article but we have one thing to do before that: **Open the article content type permissions**


  - Click on the [Roles & Permission](http://localhost:1337/admin/plugins/users-permissions/roles) and click on the `public` role.
  - Check the article `find` and `findone` routes and save

![](/content/images/2019/11/Capture-d-e-cran-2019-11-06-a--16.00.00.png)

**Awesome!** You should be ready to create your first article right now and fetch it on the GraphQL Playground

  - Create your first article!

*Here's an example*
![](/content/images/2019/11/Capture-d-e-cran-2019-11-13-a--16.51.46.png)

**Great!** Now you may want to reach the moment when you can actually fetch your articles through the API!

  - Go to [http://localhost:1337/articles](http://localhost:1337/articles)

Isn't that cool! You can also play with the [GraphQL Playground](http://localhost:1337/graphql)

![](/content/images/2019/11/Capture-d-e-cran-2019-11-06-a--16.30.06.png)

#### Create categories
You may want to assign a category to your articles (news, trends, opinion). You are going to do this by creating another content type in strapi.

  - Create a `category` content type with the following fields
    - `name` with type **String**

**Press save!**

  - Create a **new field** in the **Article** content type which is a **Relation** `Category has many Articles` like below

![](/content/images/2019/11/Capture-d-e-cran-2019-11-13-a--16.43.33.png)

  - Click on the [Roles & Permission](http://localhost:1337/admin/plugins/users-permissions/roles) and click on the `public` role. And check the category `find` and `findone` routes and save

Now you'll be able to select a category for your article in the right sidebox.

![](/content/images/2019/11/Capture-d-e-cran-2019-11-13-a--16.51.46-1.png)

Now that we are good with strapi, let's work on the frontend part!

#### Create the layout of the application

Nuxt store the default layout of the application in the `layouts/default.vue` file. Let's modify it in order to have your own!

```
<template>
  <div>

    <nav class="uk-navbar-container" uk-navbar>
        <div class="uk-navbar-left">

          <ul class="uk-navbar-nav">
              <li><a href="#modal-full" uk-toggle><span uk-icon="icon: table"></span></a></li>
              <li>
                <a href="/">Strapi Blog
                </a>
              </li>
          </ul>

        </div>

        <div class="uk-navbar-right">
          <ul class="uk-navbar-nav">
              <!-- <li v-for="category in categories">
                <router-link :to="{ name: 'categories-id', params: { id: category.id }}" tag="a">{{ category.name }}
                </router-link>
              </li> -->
          </ul>
        </div>
    </nav>

    <div id="modal-full" class="uk-modal-full" uk-modal>
        <div class="uk-modal-dialog">
            <button class="uk-modal-close-full uk-close-large" type="button" uk-close></button>
            <div class="uk-grid-collapse uk-child-width-1-2@s uk-flex-middle" uk-grid>
                <div class="uk-background-cover" style="background-image: url('https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3308&q=80 3308w');" uk-height-viewport></div>
                <div class="uk-padding-large">
                    <h1 style="font-family: Staatliches;">Strapi blog</h1>
                    <div class="uk-width-1-2@s">
                        <ul class="uk-nav-primary uk-nav-parent-icon" uk-nav>
                          <!-- <li v-for="category in categories">
                            <router-link class="uk-modal-close" :to="{ name: 'categories-id', params: { id: category.id }}" tag="a">{{ category.name }}
                            </router-link>
                          </li> -->
                        </ul>
                    </div>
                    <p class="uk-text-light">Built with strapi</p>
                </div>
            </div>
        </div>
    </div>

    <nuxt />
  </div>
</template>

<script>

export default {
}

</script>

```

As you can see, there is two code blocks that are commented.
```
  <!-- <li v-for="category in categories">
                <router-link :to="{ name: 'categories-id', params: { id: category.id }}" tag="a">{{ category.name }}
                </router-link>
              </li> -->
...

        <!-- <li v-for="category in categories">
                            <router-link class="uk-modal-close" :to="{ name: 'categories-id', params: { id: category.id }}" tag="a">{{ category.name }}
                            </router-link>
                          </li> -->

```

In fact, you want to be able to list every categories in your navbar. To do this we need to fetch them with Apollo, let's write the query!

  - Create a `apollo/queries/category` folder and a `categories.gql` file inside with the following code:

```
query Categories {
  categories {
    id
    name
  }
}
```

  - Uncomment the comments and replace the following script in your `default.vue` file

```
<script>
import categoriesQuery from '~/apollo/queries/category/categories'

export default {
  data() {
    return {
      categories: [],
    }
  },
  apollo: {
    categories: {
      prefetch: true,
      query: categoriesQuery
    }
  }
}

</script>
```

**Note** The way to display your categories is not optimal, indeed if you have many more categories there will be UI problem (categories will overflow through your navbar). For this tutorial you will be satisfied with just few categories but I let you think about a better way to proceed if you want to add more (dropdown for example)

For now the links are not working, you'll work on it later on the tutorial ;)

### Create the Articles component
This component will display every articles. As you will display them on multiples pages, listing them through a component is a good thing.

  - Create a `components/Articles.vue` file containing the following:

```
<template>
  <div>

    <div class="uk-child-width-1-2" uk-grid>
        <div>
          <router-link v-for="article in leftArticles" :to="{ name: 'articles-id', params: {id: article.id} }" class="uk-link-reset">
            <div class="uk-card uk-card-muted">
                 <div class="uk-card-media-top">
                     <img :src="'http://localhost:1337/' + article.image.url" alt="" height="100">
                 </div>
                 <div class="uk-card-body">
                   <p id="category" v-if="article.category" class="uk-text-uppercase">{{ article.category.name }}</p>
                   <p id="title" class="uk-text-large">{{ article.title }}</p>
                 </div>
             </div>
         </router-link>

        </div>
        <div>
          <div class="uk-child-width-1-2@m uk-grid-match" uk-grid>
            <router-link v-for="article in rightArticles" :to="{ name: 'articles-id', params: {id: article.id} }" class="uk-link-reset">
              <div class="uk-card uk-card-muted">
                   <div class="uk-card-media-top">
                       <img :src="'http://localhost:1337/' + article.image.url" alt="" height="100">
                   </div>
                   <div class="uk-card-body">
                     <p id="category" v-if="article.category" class="uk-text-uppercase">{{ article.category.name }}</p>
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
import articlesQuery from '~/apollo/queries/article/articles'

export default {
  props: {
    articles: Array
  },
  computed: {
    leftArticlesCount(){
      return Math.ceil(this.articles.length / 5)
    },
    leftArticles(){
      return this.articles.slice(0, this.leftArticlesCount)
    },
    rightArticles(){
      return this.articles.slice(this.leftArticlesCount, this.articles.length)
    }
  }
}
</script>
```

As you can see, you are fetching articles thanks to a GraphQl query, let's write it!

  - Create a `apollo/queries/article/articles.gql` file containing the following:

```
query Articles {
  articles {
    id
    title
    content
    image {
      url
    }
    category{
      name
    }
  }
}
```

**Awesome!** Now you can create your main page

### Index page

You want to list every articles on your index page, let's use our new component!

  - Update the code in your `pages/index.vue` file with:

```
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

```

**Great!** You should be able to see your articles now!

![](/content/images/2019/11/Capture-d-e-cran-2019-11-13-a--15.38.17.png)

### Article page

You can see that if you click on the article, there is nothing. Let's create the article page together!

  - Create a `pages/articles` folder and a `_id.vue` file inside containing the following:

```
<template>
  <div>

      <div v-if="article.image" id="banner" class="uk-height-small uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding" :data-src="'http://localhost:1337/' + article.image.url" uk-img>
        <h1>{{ article.title }}</h1>
      </div>

      <div class="uk-section">
        <div class="uk-container uk-container-small">
            <div v-if="article.content" id="editor">{{ article.content }}</div>
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
```

Here you are fetching just one article, let's write the query behind!

  - Create a `apollo/queries/article/article.gql` containing the following:

```
query Articles($id: ID!) {
  article(id: $id) {
    id
    title
    content
    image {
      url
    }
    published_at
  }
}
```

![](https://media.giphy.com/media/fwDprKZ2a3dqUwvEtK/giphy.gif)

Alright, you may want to display your content as Markdown right?

  - Install `markdownit` with `yarn add @nuxtjs/markdownit`
  - Add it to your modules inside your `nuxt.config.js` file and add the mardownit object configuration just under

```
...
modules: [
    '@nuxtjs/apollo',
    '@nuxtjs/markdownit'
],
markdownit: {
    preset: 'default',
    linkify: true,
    breaks: true,
    injected: true
  },
...
```

  - Use it to display your content inside your `_id.vue` file by replace the actual line displaying the content

```
...
<div v-if="article.content" id="editor" v-html="$md.render(article.content)"></div>
...
```

![](/content/images/2019/11/Capture-d-e-cran-2019-11-13-a--16.26.32.png)

### Categories

Let's create a page for each category now!

  - Create a `pages/categories` folder and a `_id.vue` file inside containing the following:

```
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
```

And don't forget the query!

  - Create a `apollo/queries/article/articles-categories` containing the following:

```
query Category($id: ID!){  
  category(id: $id) {
    name
    articles {
         id
      title
      content
      image {
        url
      }
      category {
        id
        name
      }
    }
  }
}
```

![](/content/images/2019/11/Capture-d-e-cran-2019-11-14-a--10.57.13.png)

**Awesome!** You can now navigate through categories :)

### Conclusion
Huge congrats, you successfully achieved this tutorial. I hope you enjoyed it!

![](http://giphygifs.s3.amazonaws.com/media/b5LTssxCLpvVe/giphy.gif)

The source code is available on GitHub: https://github.com/strapi/strapi-tutorials/tree/master/tutorials/nuxt-strapi-apollo-blog/

Still hungry?

Feel free to add additional features, adapt this projects to your own needs and give your feedback in the comments section.

**If you are interested in improving this tutorial, feel free to join our slack channel here: https://slack.strapi.io/ and contact me `@Maxime Castres`**

# Deliveroo clone with Nuxt, GraphQL, Strapi and Stripe

*By [Pierre Burgy](https://github.com/pierreburgy), revised by [Maxime Castres](https://github.com/Mcastres) on August 19, 2019.*

Get ready to develop a **Deliveroo clone, using amazing technologies: [Nuxt](https://nuxtjs.org) ([Vuejs](https://vuejs.org)), [GraphQL](https://graphql.org), [Stripe](http://stripe.com/) and [Strapi](https://strapi.io/)**! From signup to order, you are going to let users discover restaurants, dishes and select their happy meal.

![Tutorial illustration](https://blog.strapi.io/content/images/2018/07/nuxt-article.png)

This demo, of the final result, below should make you hungry:

![final result](https://blog.strapi.io/content/images/2018/07/full-2.gif)

**Note:** The **source code** is **available on GitHub:** [https://github.com/strapi/strapi-examples/tree/master/nuxt-strapi-deliveroo-clone-tutorial](https://github.com/  strapi/strapi-examples/tree/master/nuxt-strapi-deliveroo-clone-tutorial)*

## For Github users

Run strapi server

`/backend`

```shell
yarn
yarn develop
```

Listening on port `http://localhost:1337`

Run nuxt client

`/frontend`

```shell
yarn
yarn dev
```

Listening on port `http://localhost:3000`

## Introduction

### Nuxt

[Nuxt.js](https://nuxtjs.org) is an amazing framework for creating **apps with Vue.js**. Designed to build production ready applications, it provides a solid project structure built with Webpack and Babel.

[Vue.js](https://vuejs.org) is one of the most famous **front-end frameworks**, with more than 100K stars (🙈) on GitHub. Created in 2014 by [Evan You](https://twitter.com/youyuxi), VueJs has quickly become a leading Javascript framework thanks to three main advantages: and extremely simple yet **powerful API**, a **small library size**, and **great performance**.

### GraphQL
REST is the convention powering 99% of the live APIs. Succeeding SOAP, it quickly became the de-facto convention because of its simplicity.

In 2015, Facebook published [GraphQL](https://graphql.org): a **powerful query language to request APIs**. Since its publication, it kept growing and has been adopted by giants, such as GitHub, Twitter and Yelp.

### Strapi

[Strapi](https://strapi.io) is the *The **open source Headless CMS Front-End Developers love***. It saves weeks of API development time.

With its extensible plugin system, it provides a large set of built-in features: Admin Panel, Authentication & Permissions management, Content Management, API Generator, etc. **Strapi is 100% open-source** (take a look at the [GitHub repository](https://github.com/strapi/strapi)), which means:

  - **Strapi is completely free**.
  - You can **host it on your own servers**, so you own the data.
  - It is entirely **customisable and extensible**, thanks to the plugin system.

### Stripe

Stripe is an **online payement processor** which makes developers' life much easier when dealing with payments. In this tutorial, you will use it to process orders.

Looking forward to cook this app? Let's **get started**!

## Setup

## Install Nuxt

First of all, you are going to setup the Nuxt.js project.
  - Instal the Vue cli

```shell
yarn global add @vue/cli
# OR
npm install -g @vue/cli
```

  - Create and enter a directory named `deliveroo-clone-tutorial`:

```shell
mkdir deliveroo-clone-tutorial
cd deliveroo-clone-tutorial
```

  - Then, in this new folder, generate a new Nuxt.js project called `frontend`:
```shell
yarn create nuxt-app frontend
# OR
npx create-nuxt-app frontend
# OR
npm init nuxt-app frontend
```

After running the command above, you may answer the questions, but you only need to answer the following question. Otherwise, just hit `enter`:
  - Choose between **npm** and **yarn** as your package manager (**we recommend yarn**)

```
? Project name: frontend
? Project description: Cooking a Deliveroo clone
? Author name: Me
? Choose the package manager: Yarn
? Choose custom server framework: None (Recommended)
? Choose Nuxt.js modules ...
? Choose linting tools ...
? Choose test framework ...
? Choose rendering mode Universal ...
```

Run either:
  - `cd frontend && yarn dev`
  - `cd frontend && npm run dev`


Here you are! Open [http://localhost:3000](http://localhost:3000) to discover your brand new app.


## Install UIkit

[UIkit](https://getuikit.com) is a lightweight and modular front-end framework for developing fast and powerful web interfaces. You are going to use this css framework for this tutorial.

  - Install uikit
`./frontend`
```shell
yarn add uikit
```

Now you need to initialize UIkit's Js in your Nuxt app. You are going to do this by creating a plugin.
  - Create a `./frontend/plugins/uikit.js` file and copy/paste the following code:

```js
import Vue from 'vue'

import UIkit from 'uikit/dist/js/uikit-core'
import Icons from 'uikit/dist/js/uikit-icons'

UIkit.use(Icons)
UIkit.container = '#__nuxt'

Vue.prototype.$uikit = UIkit
```

Plugins need to be referenced in `nuxt.config.js` file and css files too.
  - Add the following code in your `nuxt.config.js`

```js
...
css: [
  "uikit/dist/css/uikit.min.css",
  "uikit/dist/css/uikit.css",
],
/*
** Plugins to load before mounting the App
*/
plugins: [
  { src: '~/plugins/uikit.js', ssr: false }
],
...
```

Great! UIkit is ready!
Now let's create your first component!

**Creating the Header component**

This `Header.vue` component will be used on every page of your application.

  - Create a `Header.vue` component in `components` directory.

`/frontend/components/Header.vue`

```js
<template>
  <client-only>
    <nav class="uk-navbar-container" uk-navbar>
        <div class="uk-navbar-left">

            <ul class="uk-navbar-nav">
                <li class="uk-active"><router-link tag="a" class="navbar-brand" to="/" exact>Deliveroo clone</router-link></li>
                <li><router-link tag="a" class="navbar-brand" to="/restaurants" exact>Restaurants</router-link></li>
            </ul>

        </div>

    </nav>
  </client-only>
</template>
```

The `layouts/default.vue` component is the root of all yours pages. Inside this component lies your `<nuxt />` application (the pages you are about to create for this tutorial)

In the next step, you will copy/paste the following code in order to use the new Header component, you need to import it in the `<script>` section and delete the unnecessary CSS styles. You'll also define a section and a container where all your code will be
  - Copy/paste the following code to replace the `default.vue` file.

`/frontend/layouts/default.vue`

```js
<template>
  <div>
    // You call your new Header component
    <Header />

    <div class="uk-section uk-section-default">
      <div class="uk-container uk-container-large">

        // This is where all yours pages will be
        <nuxt />

      </div>
    </div>

  </div>
</template>

<script>
// Import your new Header component
import Header from '~/components/Header.vue'
export default {
  components: {
    Header
  }
}
</script>
```

Now let's modify your homepage. This is your `/frontend/pages/index.vue` file

  - Clean your homepage content and remove its style:

`/frontend/pages/index.vue`

```js
<template>
  <div>
    <img src="https://media.giphy.com/media/zBL9j9oiR3VM4/giphy.gif" class="uk-position-center" alt="">
  </div>
</template>
```

Now you should be able to get to your homepage (`index.vue`) that resides in your `layouts/default.vue` which import your `Header.vue` component

  - Reload the page to see your changes at [http://localhost:3000](http://localhost:3000).
  - `yarn dev` or `npm run dev` if you stopped your frontend

![Home page](https://blog.strapi.io/content/images/2018/07/Screen-Shot-2018-07-02-at-15.19.04.png)

### Strapi

Having a frontend is good, but your app obviously needs a backend to manage users, `restaurants`, `dishes` and `orders`. To make the magic happen, let's create a Strapi project to manage your content.

## Install Strapi

**Requirements:** Please make sure to use [Node 10](https://nodejs.org/en/download) (or more) and have either [MongoDB](https://docs.mongodb.com/manual/installation/), Postgres or MySQL installed and running on your machine.*

**Strapi can be used with different databases. You will use the `--quickstart` option which will easily install Strapi with a SQLite database. This is recommended for prototyping and developing with Strapi. (Unless using MongoDB).**

  - Install Strapi and generate a project called `backend`:

`/deliveroo-clone-tutorial`
```shell
yarn create strapi-app backend --quickstart
# OR
npx create-strapi-app backend --quickstart
```

Wait a few seconds until your project is up and running. Your web browser should be automatically open. If not, visit [http://localhost:1337/admin/](http://localhost:1337/admin/) for the next step.

**Note:** This is how to start Strapi server in case you stopped the running process

```shell
strapi develop
```

### Create your first Administrator

  - Add your first administrator from the [registration page](http://localhost:1337/admin/plugins/users-permissions/auth/register).

![Strapi register](https://blog.strapi.io/content/images/2018/07/register.gif)

Good job, you successfully setup both Nuxt.js and Strapi projects! 🎉

## Create Restaurants

First of all, you need to display the list of restaurants in your web app. Of course, this list is going to be managed through your Strapi API. So, you are going to start configuring it.

### Define Content Type

A Content Type, also called a `model`, is a type of data. A Strapi API includes, by default, the `user` Content Type. Right now, you need restaurants, so your new Content Type is going to be, as you already guessed, `restaurant` (Content Types are always singular).

Here are the required steps:

 - Navigate to the Content Type Builder [http://localhost:1337/admin/plugins/content-type-builder](http://localhost:1337/admin/plugins/content-type-builder)
 - Click on `Add Content Type`
 - Set `restaurant` as name and press `save`
 - Create the followings fields:
   - `name` with type **String**
   - `description` with type **Rich Text**
   - `image` with type **Media**
 - Click on Save for the **field types**, and then save the new **Restaurant Content Type**

![Content Type Builder](https://blog.strapi.io/content/images/2018/07/content-type-builder-restaurant-1.gif)

At this point, your server should have automatically restarted and a new link `Restaurant` appears in the left menu.

### Add some entries

Well done! You created your first Content Type. The next step is to add some restaurants to your database. To do so, click on **Restaurants** in the left menu [http://localhost:1337/admin/plugins/content-manager/restaurant](http://localhost:1337/admin/plugins/content-manager/restaurant).

You are now in the Content Manager plugin: a user-interface which lets you see and edit entries.

Let's create a restaurant:

 - Click on `Add New Restaurant`.
 - Give it a `name`, a `description` and drop in an `image`.
 - Save it.

Create as many restaurants as you would like to see in your app.

![Content Manager](https://blog.strapi.io/content/images/2018/07/content-manager-restaurant.gif)

### Allow access

Having the items in database is great. Being able to request them from the Strapi API is even better.
When you were creating your `restaurant` Content Type, Strapi created, behind the scenes, a set of files located in `api/restaurant`. These files include the logic to expose a fully customizable CRUD API. The `find` route is available at [http://localhost:1337/restaurants](http://localhost:1337/restaurants). Try to visit this URL and will be surprised to be blocked by a *403 forbidden error*. This is actually totally normal: New Strapi APIs are secured by design.

Don't worry, making this route accessible is actually super intuitive:

 - Navigate to the `Roles & Permissions` section of the admin plugin [http://localhost:1337/admin/plugins/users-permissions](http://localhost:1337/admin/plugins/users-permissions).
 - Click on the `Public` role.
 - Check the `find` and `findone` checkboxes of the `Restaurant` section.
 - Save.

**Important:** do the same thing for the `authenticated` role:

- Navigate to the `Roles & Permissions` section of the admin plugin [http://localhost:1337/admin/plugins/users-permissions](http://localhost:1337/admin/plugins/users-permissions).
- Click on the `Authenticated` role.
- Check the `find` and `findone` checkboxes of the `Restaurant` section.
- Save.

Now go back to [http://localhost:1337/restaurants](http://localhost:1337/restaurants): at this point, you should be able to see your list of restaurants.

![Users Permissions](https://blog.strapi.io/content/images/2018/07/users-permissions-restaurants-1.gif)

## Enabling GraphQL

By default, the APIs generated with Strapi use REST conventions. What if I  told you that you could transform them into GraphQL within 10 seconds?

Well, let me prove that to you.

A GraphQL plugin is available for Strapi.
  - Install it with the following command:

`/backend`
```shell
yarn strapi install graphql
# OR
npm run strapi install graphql
```

And that's it, you are done for the backend.

![GraphQL installation](https://blog.strapi.io/content/images/2018/07/Screen-Shot-2018-07-02-at-17.03.38.png)

  - Restart your server (`yarn develop` or `npm run develop`)
  - Go to [http://localhost:1337/graphql](http://localhost:1337/graphql) and try the following query:

```graphql
{
  restaurants {
    id # Or _id if you are using MongoDB
    name
  }
}
```

![Strapi GraphQL](https://blog.strapi.io/content/images/2018/07/graphql.gif)

You should see the restaurants, if you did, you are ready to go onto the next step.

  - Install `GraphQL` and `@Nuxt-apollo` in your `frontend` folder

`/frontend`
```shell
yarn add @nuxtjs/apollo graphql
# OR
npm install @nuxtjs/apollo graphql
```

Modules and Apollo settings must be referenced in `nuxt.config.js`

  - Add the following module and your apollo configurations to your `nuxt.config.js`:

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

### Display restaurants

It looks you are going to the right direction. What if you would display these restaurants in your Nuxt.js app?
You want to be organized, that's why we are going to put the pages in their respective folders.

  - Create a `./pages/restaurants/index.vue` file and copy/paste the following code:

`/frontend/pages/restaurants/index.vue`

```js
<template>
  <div>

      // Search input to filters restaurants
      <form class="uk-search uk-search-large uk-align-center uk-margin">
          <span uk-search-icon></span>
          <input class="uk-search-input" v-model="query" type="search" placeholder="Search...">
      </form>

      // Restaurant cards
      <div class="uk-card uk-card-default uk-grid-collapse uk-child-width-1-2@m uk-margin" v-for="restaurant in filteredList" uk-grid>
          <div class="uk-card-media-left uk-cover-container">
              <img :src="'http://localhost:1337/' + restaurant.image.url" alt="" uk-cover>
              <canvas width="600" height="400"></canvas>
          </div>
          <div>
              <div class="uk-card-body">
                  <h3 class="uk-card-title">{{ restaurant.name }}</h3>
                  <p>{{ restaurant.description }}</p>
                  // Link to the restaurant using router-link
                  <router-link :to="{ name: 'restaurants-id', params: { id: restaurant.id }}" tag="a" class="uk-button uk-button-primary">See dishes
                  </router-link>
              </div>
          </div>
      </div>

      // If no restaurants have been found
      <div class="uk-container uk-container-center uk-text-center" v-if="filteredList.length == 0">
       <img src="https://assets-ouch.icons8.com/preview/19/52de2377-696e-4194-8c63-0a81aef60b4f.png" height="800" width="800">
       <p>No restaurants found</p>
     </div>

  </div>

</template>

<script>
// Import the restaurants query
import restaurantsQuery from '~/apollo/queries/restaurant/restaurants'

export default {
  data() {
    return {
      // Initialize an empty restaurants variabkle
      restaurants: [],
      query: ''
    }
  },
  apollo: {
    restaurants: {
      prefetch: true,
      query: restaurantsQuery
    }
  },
  computed: {
    // Search system
    filteredList() {
      return this.restaurants.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(this.query.toLowerCase())
      })
    },
  }
}
</script>
```

**Some explanation, please? 🤔**

Two main sections are visible here: the template and the script. These are typical in Vue.js applications.

The template section defines the structure of the page. As you can see, some attributes are very specific to Vue.js:

 1. `v-for`: repeat the current tag as many times as the array length (`restaurants` in your case).
 2. `v-if`: display the tag only if the condition is valid.
 3. `v-model`: bind a variable according to the value of the input. Useful here to create a simple search system to filter restaurants according to their name.
 4. `vue-router`: create a link to another page.

In the script section, you imported your required components and node modules. The `fetch` function, which is verify specific to Nuxt, is called when the page is loading: the content is not displayed until this function is resolved.

**GraphQL query 🤔**

As you can see you are calling a `restaurantsQuery` GraphQL query with Apollo here:

```js
...
apollo: {
  restaurants: {
    prefetch: true,
    query: restaurantsQuery
  }
},
...
```

Indeed you will create a folder containing your requests made to the Strapi API
Let's write it!

  - Create a `/frontend/apollo/queries/restaurant/restaurants.gql` and copy/paste the following code:

```gql
query Restaurants {
  restaurants {
    id
    name
    description
    image {
      url
    }
  }
}
```

**Well done! You can now see your restaurants!**

## Create Dishes

Congratulations, you successfully displayed the list of restaurants! This was the first major step. The next step is to create dishes that go with the restaurants. Your Strapi project needs to be running.

  - **Note:** If Strapi is not running, restart it with the following commands: `yarn develop` or `npm run develop`

### Define Content Type

Every restaurant sells dishes, which also must be stored in the database. So, you now need to create a new Content Type named `dish`.

- Navigate to the Content Type Builder [http://localhost:1337/admin/plugins/content-type-builder](http://localhost:1337/admin/plugins/content-type-builder)
- Click on `Add Content Type`
- Set `dish` as name and press `save`
- Create the followings fields:
  - `name` with type `String`
  - `description` with type `Rich Text`
  - `image` with type `Media`
  - `price` with type `Number` (decimal).
  - `restaurant` with type `Relation`: this one is a bit more specific. Your purpose here is to tell to Strapi that every dish can be related to a restaurant. To do so, create a one-to-many relation, as below
    - In the right menu dropdown from `Permission` to `Restaurant`
    - Click on the `many to one` icon (Restaurant has many Dishes)
- Click on Save for the **field types**, and then the new **Dish Content Type**

![Strapi relation](https://blog.strapi.io/content/images/2018/07/Screen-Shot-2018-07-02-at-17.27.19.png)

Don't forget to allow access in the Roles & Permissions section:

- (**Public**) Navigate to the `Roles & Permissions` section of the admin plugin [http://localhost:1337/admin/plugins/users-permissions](http://localhost:1337/admin/plugins/users-permissions)
  - Click on the `Public` role
  - Check the `find` and `findone` checkboxes of the `Dish` section
  - Save

- (**Authenticated**) Navigate to the `Roles & Permissions` section of the admin plugin [http://localhost:1337/admin/plugins/users-permissions](http://localhost:1337/admin/plugins/users-permissions)
  - Click on the `Authenticated` role
  - Check the `find` and `findone` checkboxes of the `Dish` section
  - Save

Here is the final result:

![Dishes fields](https://blog.strapi.io/content/images/2018/10/Screen-Shot-2018-10-19-at-15.21.41.png)

### Add some entries

  - Click on `Dishes` in the left navbar
  - Click on the `Add new Dish` button and add some dishes. Make sure they all have an image and are linked to a restaurant

### Display dishes

  - Create a file called `_id.vue` in the `/frontend/pages/restaurants` and copy/paste the following code:

`/frontend/pages/restaurants/_id.vue`

```js
<template>
<div>

  // Link to go back to the previous page
  <a class="uk-button uk-button-primary uk-margin" @click="$router.go(-1)"><span uk-icon="arrow-left"></span> go back</a>

  <client-only>
  <div uk-grid>

      // Left card displaying dishes
      <div class="uk-width-1-3@m">
        <div v-for="dish in restaurant.dishes" class="uk-margin">
            <div class="uk-card uk-card-default">
                <div class="uk-card-media-top">
                    <img :src="'http://localhost:1337/' + dish.image.url" alt="" />
                </div>
                <div class="uk-card-body">
                    <h3 class="uk-card-title">{{ dish.name }} <span class="uk-badge">{{ dish.price }}€</span></h3>
                    <p>{{ dish.description }}</p>
                </div>
                <div class="uk-card-footer">
                  // Doing nothing for the moment :)
                  <button class="uk-button uk-button-primary">Add to cart</button>
                </div>
            </div>
        </div>
      </div>

      // Right card that will display your cart
      <div class="uk-width-expand@m">
      </div>

  </div>

  </client-only>
</div>
</template>

<script>
import restaurantQuery from '~/apollo/queries/restaurant/restaurant'

export default {
  data() {
    return {
      restaurant: Object
    }
  },
  apollo: {
    restaurant: {
      prefetch: true,
      query: restaurantQuery,
      variables () {
        return { id: this.$route.params.id }
      }
    }
  }
}
</script>

```
You need to create a new `restaurantQuery` GraphQL query with Apollo in order to fetch data from each restaurant

  - Create a `/frontend/apollo/queries/restaurant/restaurant.gql` and copy/paste the following code:

```gql
query Restaurant($id: ID!) {
  restaurant(id: $id) {
    id
    name
    dishes {
      id
      name
      description
      price
      image {
        url
      }
    }
  }
}
```

So you have two queries for your application:
  - `restaurantsQuery` that fetch every restaurants from your Strapi API
  - `restaurantQuery` that fetch data from one restaurant depending on the given id in the url. ex: `/restaurant/2`

![Dishes list](https://blog.strapi.io/content/images/2018/07/dishes.gif)

The dishes page should be accessible from `http://localhost:3000/restaurants/1` where `1` is the id of the restaurant. Nuxt.js creates urls according to the name of the files located in `/frontend/pages`.

Nothing particular here: exactly like for the restaurants, you defined a template and then add the logic in the script section.

## Authentication

At this point, you may have expected to get ready to order. But before that, you need to give the user the possibility to register and login to your app. No worries, Strapi comes to the rescue with its `Users & Permissions` plugin already installed in your project.

To quicken your front-end development, you are going to install the [Strapi JavaScript SDK](https://github.com/strapi/strapi-sdk-javascript):

`/frontend`

```shell
yarn add strapi-sdk-javascript
# OR
npm install strapi-sdk-javascript
```

  - Create a `/frontend/utils/Strapi.js` file and copy/paste the following:

```js
import Strapi from 'strapi-sdk-javascript/build/main'

const apiUrl = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)

export default strapi;
export { apiUrl }
```

### Auth store

For this tutorial, you will store `user` data in cookies.
You have to install `js-cookie`:

  - Go into your `frontend` folder
  - Install `js-cookie` with the following command:

```shell
yarn add js-cookie
# OR
npm i js-cookie
```

- Create a file called `auth.js` in the `/frontend/store` folder and copy/paste the following code:

`/frontend/store/auth.js`

```js
import Cookies from 'js-cookie'

// Defining an empty state
export const state = () => {}

// Create a mutation that set a user to your state and in a 'user' cookie
export const mutations = {
  setUser(state, user) {
    state.user = user
    Cookies.set('user', user)
  }
}
```

**Why cookies? 🍪**

Nothing related to this food tutorial...

Most of the time, progressive web apps store a JSON Web Token (JWT) in the local storage. That works pretty well, and this is what the Strapi JavaScript SDK does by default (it also stores it as a cookie).

The fact is that you would like to display the username in the header (coming later in this tutorial). So you need to store it somewhere.

You could have stored it in the local storage, but since Nuxt.js supports server-side rendering, which does not have access to the local storage, you need to store it in the browser cookies.


### Register

Let's create a register form in order to create a user!

  - Create a new file `/frontend/pages/users/register.vue` and copy/paste the following content:

`/frontend/pages/users/register.vue`

```js
<template>
<div>

  <div class="uk-child-width-1-2@m uk-grid">
      <div>
          // Nice image to make this app more beautiful
          <div class="uk-card uk-card-default uk-card-small uk-card-body">
            <img src="https://assets-ouch.icons8.com/preview/294/e25a0374-0657-45d5-98d9-2408473a744c.png" height="500" width="500" class="uk-align-center" alt="">
          </div>
      </div>
      <div>
          <div class="uk-card uk-card-default uk-card-large uk-card-body">

              <form @submit.stop.prevent="handleSubmit">
                  <fieldset class="uk-fieldset">

                      <legend class="uk-legend">Register</legend>

                      <div class="uk-margin">
                        <label class="uk-form-label">Username</label>
                        <input class="uk-input" v-model="username" type="text" placeholder="pbocuse">
                      </div>

                      <div class="uk-margin">
                        <label class="uk-form-label" for="form-stacked-text">Email</label>
                        <input class="uk-input" v-model="email" type="email" placeholder="paul.bocuse@gmail.com">
                      </div>

                      <div class="uk-margin">
                        <label class="uk-form-label" for="form-stacked-text">Password</label>
                        <input class="uk-input" v-model="password" type="password">
                      </div>

                      <div class="uk-margin">
                        <button class="uk-button uk-button-primary uk-width-1-1" :disabled="loading" type="submit">Submit</button>
                      </div>

                      <div class="uk-margin">
                        <p>
                          Already have an account?
                          <router-link :to="{ name: 'users-signin'}">
                            Login
                          </router-link>
                        </p>
                      </div>

                  </fieldset>
              </form>

          </div>
      </div>
  </div>

</div>
</template>

<script>
// Import mapMutations in order to call mutations from your store
import { mapMutations } from 'vuex'
import strapi from '~/utils/Strapi'

export default {
  data() {
    return {
      email: '',
      password: '',
      username: '',
      loading: false
    }
  },
  methods: {
    // Method that will register your users
    async handleSubmit() {
      try {
        this.loading = true
        const response = await strapi.register(
          this.username,
          this.email,
          this.password
        )
        this.loading = false
        // Call your setUser mutation from your auth.js store file
        this.setUser(response.user)
        this.$router.go(-1)
      } catch (err) {
        this.loading = false
        alert(err.message || 'An error occurred.')
      }
    },
    // Define all your needed mutations, here: auth/setUser
    ...mapMutations({
      setUser: 'auth/setUser'
    })
  }
}
</script>
```

In this page, you insert a form which has three inputs: **username**, **email** and **address**. You also defined a method named `handleSubmit` which uses the Strapi SDK to register the user before redirecting them to the previous page.

### Logout

The user must be able to logout, ideally from a button in the header.

  - Add a `logout` mutation and a `username` getter in the `auth` store:

`/frontend/store/auth.js`

```js
import Cookies from 'js-cookie'

export const state = () => {}

export const mutations = {
  setUser(state, user) {
    state.user = user
    Cookies.set('user', user)
  },
  // Mutation that you need to add
  logout(state) {
    state.user = null
    Cookies.set('user', null)
  }
}

// Define a getter in order to get your current username from your state
export const getters = {
  username: state => {
    return state.user && state.user.username
  }
}
```

- Modify the `Header.vue` to get something like this

`/frontend/components/Header.vue`

```js
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

          // If you are logged in
          <ul class="uk-navbar-nav" v-if="username">
              <li><a href="#" class="uk-link-reset"><img src="https://png2.cleanpng.com/sh/a7adacc7226d2dc438dafb37913a8ab8/L0KzQYm3V8E2N5tqipH0aYP2gLBuTfVudZZ5ReZxZT3vdbj2Tf1wfppqRehyZHXyd7L0hb1xeppze9d8cz34frryigR1gV58Rdd2bXX3Pb3shB8udZD7gdc2NXK3coG9UMRibGJrfqI3Mkm0RoS7VMYyPWQ2TqY8M0m5R4GCUb5xdpg=/kisspng-emmet-the-lego-movie-videogame-princess-unikitty-w-emmet-lego-movie-5b4b0604ad1ff0.2916344615316433967091.png" class="uk-border-circle" height="40" width="40" alt="">{{ username }}</a></li>
              <li><a href="#" @click="logout">Logout</a></li>
          </ul>

          // If you are not logged in
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
    // Set your username thanks to your getter
    username() {
      return this.$store.getters['auth/username']
    }
  },
  methods: {
    // Define your needed mutations, here: auth/logout
    ...mapMutations({
      logout: 'auth/logout'
    })
  }
}
</script>
```

Try to reload the page and you will see that no changes have been made: You still see the `signin` and `signup` links although you registered a user a few minutes ago. This happens because you did not use the `auth/setUser` mutation on the load page. Since Nuxt.js is rendered server side, you need to do a little trick using the `nuxtServerInit` action which is invoked when the Nuxt.js server starts:

  - Install `cookieparser`:

```shell
yarn add cookieparser
# OR
npm install cookieparser
```

- Create an `index.js` file in the `store` folder and copy/paste the following code:

`/frontend/store/index.js`

```js
import cookieparser from 'cookieparser'

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    let user = null
    if (req && req.headers && req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      user = (parsed.user && JSON.parse(parsed.user)) || null
    }

    commit('auth/setUser', user)
  }
}
```

Perfect! You can register again to check if that works but you are going to create a sign in page right now.

### Login

  - Create a `signin.vue` in the `pages` folder and copy/paste the following code

`/frontend/pages/users/signin.vue`

```js
<template>
<div>

  <div class="uk-child-width-1-2@m uk-grid">
      <div>
          <div class="uk-card uk-card-default uk-card-small uk-card-body">
            <img src="https://assets-ouch.icons8.com/preview/457/0b338840-2e33-432e-a547-4d3e5acc960c.png" height="500" width="500" class="uk-align-center" alt="">
          </div>
      </div>
      <div>
          <div class="uk-card uk-card-default uk-card-large uk-card-body">

              <form @submit.stop.prevent="handleSubmit">
                  <fieldset class="uk-fieldset">

                      <legend class="uk-legend">Sign in</legend>

                      <div class="uk-margin">
                        <label class="uk-form-label" for="form-stacked-text">Email</label>
                        <input class="uk-input" v-model="email" type="email" placeholder="paul.bocuse@gmail.com">
                      </div>

                      <div class="uk-margin">
                        <label class="uk-form-label" for="form-stacked-text">Password</label>
                        <input class="uk-input" v-model="password" type="password">
                      </div>

                      <div class="uk-margin">
                        <button class="uk-button uk-button-primary uk-width-1-1" :disabled="loading" type="submit">Submit</button>
                      </div>

                      <div class="uk-margin">
                        <p>
                          No account yet?
                          <router-link :to="{ name: 'users-register'}">
                            Register
                          </router-link>
                        </p>
                      </div>

                  </fieldset>
              </form>

          </div>
      </div>
  </div>

</div>
</template>

<script>
import { mapMutations } from 'vuex'
import strapi from '~/utils/Strapi'

export default {
  data() {
    return {
      email: '',
      password: '',
      loading: false
    }
  },
  methods: {
    async handleSubmit() {
      try {
        this.loading = true
        const response = await strapi.login(
          this.email,
          this.password
        )
        this.loading = false
        this.setUser(response.user)
        this.$router.go(-1)
      } catch (err) {
        this.loading = false
        alert(err.message || 'An error occurred.')
      }
    },
    ...mapMutations({
      setUser: 'auth/setUser'
    })
  }
}
</script>
```

**Note:** You will be redirected to the last page you visited when you sign in

![Authentication](https://blog.strapi.io/content/images/2018/07/authentication.gif)

That's it for the authentication!
  - Reload your page and play with this new user system you just created!

## Shopping cart

All of these dishes look so tasty! What if you could add some of them in a shopping cart?

  - Create a new store named `cart.js` and copy/paste the following code:

`./frontend/store/cart.js`

```js
import Cookies from 'js-cookie'

export const state = () => ({
  items: []
})

export const mutations = {
  setItems(state, items) {
    state.items = items
  },
  add(state, item) {
    const record = state.items.find(i => i.id === item.id)

    if (!record) {
      state.items.push({
        quantity: 1,
        ...item
      })
    } else {
      record.quantity++
    }
    Cookies.set('cart', state.items)
  },
  remove(state, item) {
    const record = state.items.find(i => i.id === item.id)

    if (record.quantity > 1) {
      record.quantity--
    } else {
      const index = state.items.findIndex(i => i.id === item.id)
      state.items.splice(index, 1)
    }
    Cookies.set('cart', state.items)
  },
  emptyList(state) {
    state.items = []
    Cookies.set('cart', state.items)
  }
}

export const getters = {
  items: state => {
    return state.items
  },
  price: state => {
    return state.items.reduce(
      (accumulator, item) => accumulator + item.price * item.quantity,
      0
    )
  },
  numberOfItems: state => {
    return state.items.reduce(
      (accumulator, item) => accumulator + item.quantity,
      0
    )
  }
}
```
To make sure the items stay in the cart even after page reload, you will are also use cookies. So you need to update the `nuxtInitServer` function:

  - Update the `index.js` store to get the following:

`/frontend/store/index.js`

```js
import cookieparser from 'cookieparser'

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    let user = null
    let cart = []
    if (req && req.headers && req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      user = (parsed.user && JSON.parse(parsed.user)) || null
      cart = (parsed.cart && JSON.parse(parsed.cart)) || []
    }

    commit('auth/setUser', user)
    commit('cart/setItems', cart)
  }
}
```

Now you want to add the cart to your pages. To do so you are going to create a `Cart`component that will be used in your `restaurants/_id.vue` and your future `orders/checkout.vue`

  - Update the `_id.vue` file to get the following code:

`/frontend/pages/restaurants/_id.vue`

```js
<template>
<div>

  <a class="uk-button uk-button-primary uk-margin" @click="$router.go(-1)"><span uk-icon="arrow-left"></span> go back</a>

  <client-only>
  <div uk-grid>
      <div class="uk-width-1-3@m">

        // Left card displaying dishes
        <div v-for="dish in restaurant.dishes" class="uk-margin">
            <div class="uk-card uk-card-default">
                <div class="uk-card-media-top">
                    <img :src="'http://localhost:1337/' + dish.image.url" alt="" />
                </div>
                <div class="uk-card-body">
                    <h3 class="uk-card-title">{{ dish.name }} <span class="uk-badge">{{ dish.price }}€</span></h3>
                    <p>{{ dish.description }}</p>
                </div>
                <div class="uk-card-footer">
                  <button class="uk-button uk-button-primary" @click="addToCart(dish)">Add to cart</button>
                </div>
            </div>
        </div>

      </div>


      // Right card displaying you cart
      <div class="uk-width-expand@m">
          // Call a Cart component
          <Cart />
      </div>
  </div>

  </client-only>
</div>
</template>

<script>
import { mapMutations } from 'vuex'
import Cart from '~/components/Cart.vue'
import restaurantQuery from '~/apollo/queries/restaurant/restaurant'

export default {
  data() {
    return {
      restaurant: Object
    }
  },
  apollo: {
    restaurant: {
      prefetch: true,
      query: restaurantQuery,
      variables () {
        return { id: this.$route.params.id }
      }
    }
  },
  components: {
    Cart
  },
  methods:{
    ...mapMutations({
      addToCart: 'cart/add',
      removeFromCart: 'cart/remove'
    }),
  }
}
</script>
```

As you may see, you imported a `Cart` component. In fact you want to reuse this component in two pages: `restaurants/index.vue` and `orders/checkout.vue` that you'll create soon

  - Create a `/frontend/components/Cart.vue` and copy/paste the following code:

```js
<template>
<div class="uk-card uk-card-default uk-card-body uk-margin" uk-sticky="offset: 20; bottom: true">
  <img src="https://assets-ouch.icons8.com/preview/125/6414b067-ba59-46ef-8693-4e190aa466c7.png" class="uk-align-center" height="250" width="250" alt="" />

  <div v-if="price > 0">

    <table class="uk-table uk-table-striped uk-table-small uk-table-responsive">
        <thead>
            <tr>
                <th>Name</th>
                <th>Price (unit)</th>
                <th>Quantity</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="dish in selectedDishes">
                <td class="uk-width-1-2">{{ dish.name }}</td>
                <td class="uk-table-shrink">{{ dish.price }}€</td>
                <td class="uk-table-shrink">{{ dish.quantity }}</td>
                <td>
                  <a class="uk-margin-left"><span class="uk-badge" @click="addToCart(dish)">+</span></a>
                  <a><span class="uk-badge" style="background: #f0506e;" @click="removeFromCart(dish)">-</span></a>
                </td>

            </tr>
        </tbody>
    </table>

    <button class="uk-button uk-button-primary" name="button">Process to checkout ({{ price }}€)</button>
  </div>

</div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  methods:{
    ...mapMutations({
      addToCart: 'cart/add',
      removeFromCart: 'cart/remove'
    })
  },
  computed: {
    id() {
      return this.$route.params.id
    },
    selectedDishes() {
      return this.$store.getters['cart/items']
    },
    price() {
      return this.$store.getters['cart/price']
    },
    numberOfItems() {
      return this.$store.getters['cart/numberOfItems']
    }
  }
}
</script>
```

Good job! You can now add dishes to your cart, check it out!

![Shopping cart](https://blog.strapi.io/content/images/2018/07/shopping-card.gif)

## Order and Checkout

You must be start being starving by now... I am sure you want to be able to order!

### Define Content Type

You need to store the orders in your database
  - Create a new Content Type in your Strapi API.

Same process as usual:

 - Navigate to the Content Type Builder [http://localhost:1337/admin/plugins/content-type-builder](http://localhost:1337/admin/plugins/content-type-builder).
 - Click on `Add Content Type`
 - Set `order` as name
 - Click on `Add New Field` and create the followings fields:
   - `address` with type **String**
   - `postalCode` with type **String**
   - `city` with type **String**
   - `dishes` with type **JSON**
   - `amount` with type **Number** (decimal)
   - `user` with type **Relation:** User has many orders
     - In the right menu dropdown from `Permission` to `User`
     - Click on the `many to one` icon (User has many Orders)
  - Click on Save for the **field types**, and then the new **Order Content Type**


![Order Content Type Builder](https://blog.strapi.io/content/images/2019/02/Screenshot-2019-02-19-at-18.16.08.png)

![Order Content Type Builder](https://blog.strapi.io/content/images/2019/02/Screenshot-2019-02-19-at-18.15.51.png)

### Allow access

To create new orders from the frontend, you are going to hit the `create` endpoint of the `order` API.
  - To allow access, navigate to the Roles & Permissions section [http://localhost:1337/admin/plugins/users-permissions](http://localhost:1337/admin/plugins/users-permissions), select the `authenticated` role, check the `order/create` checkbox
  - Save

### Stripe setup

In this section you will need Stripe API keys.
  - Create a Stripe account and navigate to [https://dashboard.stripe.com/account/apikeys](https://dashboard.stripe.com/account/apikeys)

### Add logic

If you have already used Stripe, you may know that the credit card information does not go through your backend server. Instead, the information di directly sent to the Stripe API (ideally using their SDK). Then, your frontend receives a token. The `id` of the token must be sent to your backend which will create the Stripe charge.

  - Install the `stripe` package in your `backend` folder

`/backend`

```shell
yarn add stripe
# OR
npm install stripe
```

In order to integrate the Stripe logic, you need to update the `create` charge endpoint in your Strapi API.

  - Update `/backend/api/order/controllers/Order.js` and replace its content with:

`./backend/api/order/controllers/Order.js`

```js

'use strict';
const stripe = require('stripe')('YOU_STRIPE_API_KEY');

module.exports = {
  create: async ctx => {
    const {
      address,
      amount,
      dishes,
      postalCode,
      token,
      city,
    } = ctx.request.body;

    // Charge the customer
    try {
      await stripe.charges.create({
        // Transform cents to dollars.
        amount: amount * 100,
        currency: 'usd',
        description: `Order ${new Date()} by ${ctx.state.user.id}`,
        source: token,
      });

      // Register the order in the database
      try {
        const order = await strapi.services.order.create({
          user: ctx.state.user.id,
          address,
          amount,
          dishes,
          postalCode,
          city,
        });

        return order;
      } catch (err) {
        // Silent
      }
    } catch (err) {
      // Silent
    }
  },
};
```

Don't forget to replace `YOU_STRIPE_API_KEY` by your stripe API key

**Note:** In a real-world example, the amount should be checked on the backend side and the list of dishes related to the command should be stored in a more specific Content Type called `orderDetail`.

  - Restart the Strapi backend with `yarn develop` or `npm run devlelop`.

  - Install the `vue-stripe-elements-plus` package in your `frontend` folder to make it work:

`/frontend`

```shell
yarn add vue-stripe-elements-plus
# OR
npm i vue-stripe-elements-plus
```

  - Add the Stripe script in the `nuxt.config.js` file:

`/frontend/nuxt.config.js`

```js
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    //...
    ,
    script: [
      { src: 'https://js.stripe.com/v3' }
    ]
  },

  // ...
}
```

### Checkout page

You are going to create a checkout page that will display your cart thanks to the `Cart` component and the Stripe form.

  - In `/frontend/components/Cart.vue`, add the click handler `@click="goToCheckout"` to the Order button and add the `goToCheckout` method

`/frontend/components/Cart.vue`

```js
<button class="uk-button uk-button-primary" @click="goToCheckout" name="button">Process to checkout ({{ price }}€)</button>
```

```
goToCheckout() {
  // Redirect to signin page if not logged in.
  const isConnected = this.$store.getters['auth/username']
  if (!isConnected) {
    this.$router.push('/signin')
    return
  }
  this.$router.push('/checkout')
},

```
You will get this result:

`./frontend/components/Cart.vue`

```js
<template>
  <div class="uk-card uk-card-default uk-card-body uk-margin" uk-sticky="offset: 20; bottom: true">
    <img src="https://assets-ouch.icons8.com/preview/125/6414b067-ba59-46ef-8693-4e190aa466c7.png" class="uk-align-center" height="250" width="250" alt="" />

    <div v-if="price > 0">

      <table class="uk-table uk-table-striped uk-table-small uk-table-responsive">
          <thead>
              <tr>
                  <th>Name</th>
                  <th>Price (unit)</th>
                  <th>Quantity</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="dish in selectedDishes">
                  <td class="uk-width-1-2">{{ dish.name }}</td>
                  <td class="uk-table-shrink">{{ dish.price }}€</td>
                  <td class="uk-table-shrink">{{ dish.quantity }}</td>
                  <td>
                    <a class="uk-margin-left"><span class="uk-badge" @click="addToCart(dish)">+</span></a>
                    <a><span class="uk-badge" style="background: #f0506e;" @click="removeFromCart(dish)">-</span></a>
                  </td>

              </tr>
          </tbody>
      </table>

      <button class="uk-button uk-button-primary" @click="goToCheckout" name="button">Process to checkout ({{ price }}€)</button>
    </div>

  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  methods:{
    ...mapMutations({
      addToCart: 'cart/add',
      removeFromCart: 'cart/remove'
    }),
    goToCheckout() {
      // Redirect to signin page if not logged in.
      const isConnected = this.$store.getters['auth/username']
      if (!isConnected) {
        this.$router.push('/users/signin')
        return
      }
      this.$router.push('/orders/checkout')
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    },
    selectedDishes() {
      return this.$store.getters['cart/items']
    },
    price() {
      return this.$store.getters['cart/price']
    },
    numberOfItems() {
      return this.$store.getters['cart/numberOfItems']
    }
  }
}
</script>
```

  - Create the `/frontend/pages/orders/checkout.vue` file and copy/paste the following code:

`/frontend/pages/orders/checkout.vue`

```js
<template>
<div>

  <a class="uk-button uk-button-primary uk-margin" @click="$router.go(-1)"><span uk-icon="arrow-left"></span> go back</a>

  <client-only placeholder="Chargement...">

    <div uk-grid>
        <div class="uk-width-1-3@m">

          <div class="uk-card uk-card-default uk-card-body uk-width-1-1@m">

            <form @submit.stop.prevent="handleSubmit">
                <fieldset class="uk-fieldset">

                    <legend class="uk-legend">Checkout</legend>

                    <div class="uk-margin">
                        <label class="uk-form-label" for="form-stacked-text">Address</label>
                        <input class="uk-input" v-model="address" type="text" placeholder="13 boulevard francis">
                    </div>

                    <div class="uk-margin">
                        <label class="uk-form-label" for="form-stacked-text">City</label>
                        <input class="uk-input" v-model="city" type="text" placeholder="San francisco">
                    </div>

                    <div class="uk-margin">
                        <label class="uk-form-label" for="form-stacked-text">Postal code</label>
                        <input class="uk-input" v-model="postalCode" type="text" placeholder="92000">
                    </div>

                    <div class="uk-margin">
                      <label for="card">Card</label>
                        <card
                          ref="card-stripe"
                          stripe="YOUR_PUBLIC_STRIPE_API_KEY"
                          @change='complete = $event.complete'
                        />

                    </div>

                    <div class="uk-margin">
                    <button class="uk-button uk-button-primary" v-if="$route.path !== '/orders/checkout'" @click="goToCheckout" name="button">Proceed to checkout ({{ price }}€)</button>
                    </div>

                </fieldset>
            </form>
          </div>

        </div>
        <div class="uk-width-expand@m">
            <Cart />
        </div>
    </div>
  </client-only>


</div>
</template>

<script>
import Cart from '~/components/Cart.vue'
import { Card, createToken } from 'vue-stripe-elements-plus'
import strapi from '~/utils/Strapi'

export default {
  components: {
    Card,
    Cart
  },
  data() {
    return {
      address: '',
      postalCode: '',
      city: '',
      complete: false,
      loading: false
    }
  },
  methods: {
    async handleSubmit() {
      this.loading = true
      let token
      try {
        const response = await createToken()
        token = response.token.id
      } catch (err) {
        alert('An error occurred.')
        this.loading = false
        return
      }
      try {
        await strapi.createEntry('orders', {
          amount: this.$store.getters['cart/price'],
          dishes: this.$store.getters['cart/items'],
          address: this.address,
          postalCode: this.postalCode,
          city: this.city,
          token
        })
        alert('Your order have been successfully submitted.')
        this.emptyCart()
        this.$router.push('/')
      } catch (err) {
        this.loading = false
        alert('An error occurred.')
      }
    }
  }
}
</script>
```

Don't forget to replace `YOUR_PUBLIC_STRIPE_API_KEY` by your public stripe API key

**Explanation 🕵️**

In this page, you display a form to get user's address and debit card information. You use the [Stripe Elements](https://stripe.com/elements) system. When the form is submitted, you get a token from Stripe. Then, you create the order in your Strapi API.

You are now able to let users submit their order.

Bon appétit! 🇫🇷

![Order](https://blog.strapi.io/content/images/2018/07/order-1.gif)

## Deploy Backend on Heroku

Init a git project and commit your files:

```shell
cd backend

rm package-lock.json # May involve errors if not removed
# OR
rm yarn.lock

git init
git add .
git commit -am "Initial commit"
```

Make sure the [Heroku CLI is installed](https://devcenter.heroku.com/articles/heroku-cli#download-and-install) on your computer and deploy:

```shell
heroku create
heroku addons:create mongolab:sandbox --as DATABASE
git push heroku master
```

![Heroku deploy](https://blog.strapi.io/content/images/2018/07/Screen-Shot-2018-07-02-at-19.05.02.png)

Visit the URL provided by Heroku and keep it for the next step.

**Note:** You will have to redefine your permissions rules from the interface. This workflow will be [improved in the near future](https://github.com/strapi/strapi/issues/672).**

## Deploy Frontend on Netlify

Init a git project and commit your files:

```shell
cd frontend
git init
git add .
git commit -am "Initial commit"
git remote add origin https://github.com/<you>/<your-project>.git
git push -u origin master
```

Then:

 - Signup to [Netlify](https://www.netlify.com).
 - Create a new site.
 - Select your repository.
 - Add the build command: `npm run generate`.
 - Add the publish directory: `dist`.
 - Add the Strapi API URL as environment variable: `API_URL` with the value of the Heroku project url.
 - Add the Graphql URL as environment variable: `GRAPHQL_URL` with the value of the Heroku project graphql url.

![Netlify setup](https://blog.strapi.io/content/images/2018/07/Screen-Shot-2018-07-01-at-19.48.24.png)

## Conclusion

Huge congrats, you successfully achieved this tutorial. I hope you enjoyed it!

<iframe src="https://giphy.com/embed/tyxovVLbfZdok" width="480" height="301" frameBorder="0" class="giphy-embed" allowFullScreen style="margin:1.75em auto;"></iframe>

The source code is available on GitHub: [https://github.com/strapi/strapi-examples/tree/master/nuxt-strapi-deliveroo-clone-tutorial](https://github.com/strapi/strapi-examples/tree/master/nuxt-strapi-deliveroo-clone-tutorial).


*Still hungry?*

Feel free to add additional features, adapt this projects to your own needs and give your feedback in the comments section.

*Share your meal!*

You enjoyed this tutorial? Share it around you!

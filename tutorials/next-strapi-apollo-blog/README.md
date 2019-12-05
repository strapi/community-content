![](https://blog.strapi.io/content/images/2019/11/Capture-d-e-cran-2019-11-25-a--16.30.50.png)

## Introduction

Two weeks ago I published a tutorial on [How to create a blog with Nuxt.js Strapi and Apollo](https://strapi.io/blog/build-a-blog-using-nuxt-strapi-and-apollo/) But I started to feel bad about React developers who may love to get a tutorial for them!

The thing is I know VueJs more than React and I wasn't sure if I was able to propose to the community a proper tutorial but thanks to [soupette](https://github.com/soupette), one of the frontend developper at strapi, who helped me to understand how React works, this tutorial has been made possible!

## Goal

If you are familiar with our blog, you should have already learned how to create a blog with [Gatsby](https://strapi.io/blog/building-a-static-website-using-gatsby-and-strapi) or [Nuxt](https://strapi.io/blog/build-a-blog-using-nuxt-strapi-and-apollo/). But what if you would instead use another language? Let me tell you that I got that covered as today, we are going to learn how to do it with React this time!

The goal here is to be able to create a blog website using Strapi as the backend, Next for the frontend, and Apollo for requesting the Strapi API with GraphQL.

The source code is available on GitHub: https://github.com/strapi/strapi-tutorials/tree/master/tutorials/next-strapi-apollo-blog/

## Prerequisites

To follow this tutorial, you'll need to have Strapi and Next installed on your computer, but don't worry, we are going to install these together!

**This tutorial use Strapi v3.0.0-beta.17.5.**

**You need to have node v.12 installed and that's all.**

## Setup

- Create a blog-strapi folder and get inside!

`mkdir blog-strapi && cd blog-strapi`

#### Back-end setup

So that's the easy part, since the beta.9 we have an awesome package [create strapi-app](<[https://www.npmjs.com/package/create-strapi-app](https://www.npmjs.com/package/create-strapi-app)>) that allows you to create a Strapi project in seconds without needing to install Strapi globally so let's try it out.

(For the tutorial we will use `yarn` as your package manager)

- `yarn create strapi-app backend --quickstart --no-run`.

This single command line will create all you need for your back-end. Make sure to add the `--no-run` flag as it will prevent your app from automatically starting the server because **SPOILER ALERT: we need to install some awesome Strapi plugins.**

Now that you know that we need to install some plugins to enhance your app, let's install one of our most popular. The `graphql` plugin:

- `yarn strapi install graphql`

Once the installation is completed, you can finally start your Strapi server `strapi dev` and create your first Administrator. That's the one that has all the rights in your application, so please make sure to enter a proper password (_password123_) is really not safe...

![](https://blog.strapi.io/content/images/2019/11/Creation-admin.png)

Don't forget that Strapi is running on [http://localhost:1337](http://localhost:1337)

**Nice!** Now that Strapi is ready, you are going to create your Nuxt application.

#### Front-end setup

Well, the easiest part has been completed, let's get our hands dirty developing our blog!

**Next setup**

- Create a Next `frontend` server by running the following command:

`npx create-next-app frontend`

Once the installation is completed you can start your front-end app to make sure everything went ok.

    cd frontend
    yarn dev

As you might want people to read your blog or to make it "cute & pretty" we will use a popular CSS framework for styling: UiKit and also Apollo to query Strapi with GraphQL:

**Dependencies setup**

Make sure you are in the `frontend` folder before running the following commands:

**Apollo setup**

- `yarn add @apollo/react-hooks apollo-cache-inmemory apollo-client apollo-link-http graphql graphql-tag isomorphic-unfetch next-with-apollo`

- Create a `./utils` folder and create an `apollo.js` file containing the following code:

```
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import withApollo from "next-with-apollo";
import { createHttpLink } from "apollo-link-http";
import fetch from "isomorphic-unfetch";

// Update the GraphQL endpoint to any instance of GraphQL that you like
const GRAPHQL_URL = process.env.BACKEND_URL || "http://localhost:1337/graphql";

const link = createHttpLink({
  fetch, // Switches between unfetch & node-fetch for client & server.
  uri: GRAPHQL_URL
});

// Export a HOC from next-with-apollo
// Docs: https://www.npmjs.com/package/next-with-apollo
export default withApollo(
  // You can get headers and ctx (context) from the callback params
  // e.g. ({ headers, ctx, initialState })
  ({ initialState }) =>
    new ApolloClient({
      link: link,
      cache: new InMemoryCache()
        //  rehydrate the cache using the initial data passed from the server:
        .restore(initialState || {})
    })
);

```

**Note:** As you can see, you want apollo to point to this address `http://localhost:1337/graphql`. That's the one where you'll be able to fetch your data from your Strapi server

**UIkit setup**

In order to import [UIkit](https://getuikit.com/), you need, before that, to create your `_app.js` file

Next.js uses the App component to initialize pages. You can override it and control the page initialization. Since we want to use UlKit we need to override this file to include the CDN on all your pages:

- Create the `./pages/_app.js` file and override the App class and turn it to functionnal component:

```
import React from "react";
import Head from "next/head";
import "../assets/css/style.css";
import { ApolloProvider } from "@apollo/react-hooks";
import withData from "../utils/apollo";

const App = ({ Component, pageProps, apollo }) => {
  return (
    <ApolloProvider client={apollo}>
      <Head>
        <title>Strapi blog</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Staatliches"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/uikit@3.2.3/dist/css/uikit.min.css"
        />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.2.0/js/uikit.min.js" />
        <script src="https://cdn.jsdelivr.net/npm/uikit@3.2.3/dist/js/uikit-icons.min.js" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.2.0/js/uikit.js" />
      </Head>
      <Component {...pageProps} />
    </ApolloProvider>
  )
};

// Wraps all components in the tree with the data provider
export default withData(App);

```

![Pump the brakes](https://media.giphy.com/media/1jkV91aVoL39SXmBuL/giphy.gif)

**Ok sorry! That's too much! Let me explain what's in this file.**

```
import { ApolloProvider } from "@apollo/react-hooks";
import withData from "../utils/apollo";
...
<ApolloProvider client={apollo}>
...
</ApolloProvider>
...
export default withData(MyApp);
```

The `_app.js` file is the perfect place to put our Apollo Provider, which wraps the entire application. [Learn more about Apollo Client](https://www.apollographql.com/docs/react/get-started/)

```
<Head>
          <title>Strapi blog</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Staatliches"
          />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/uikit@3.2.3/dist/css/uikit.min.css"
          />
          <script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.2.0/js/uikit.min.js" />
          <script src="https://cdn.jsdelivr.net/npm/uikit@3.2.3/dist/js/uikit-icons.min.js" />
          <script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.2.0/js/uikit.js" />
        </Head>
```

You include a `Head` component which imports `UIkit` and a beautiful font that you'll use for this tutorial: `Staatliches`

As you can see, you are importing a css file: `import "../assets/css/style.css";`

Prior to coding it, we need to install some packages first:

- Install `@zeit/next-css` and `next-fonts` by running the following command:

`yarn add @zeit/next-css next-fonts`

- Create a `next.config.js` file containing the following code:

```
const withCSS = require("@zeit/next-css");
const withFonts = require("next-fonts");
```

- Create a `./assets/css/style.css` ...

```
a {
  text-decoration: none;
}

h1 {
  font-family: Staatliches;
  font-size: 120px;
}

#category {
  font-family: Staatliches;
  font-weight: 500;
}

#title {
  letter-spacing: 0.4px;
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

**Note:** Do you really want me to explain some CSS???

**Awesome!** Your app should be ready now!

![](https://blog.strapi.io/content/images/2019/11/Capture-d-e-cran-2019-11-25-a--15.11.18.png)

#### Designing the data structure

Finally! we are going to structure the data shape of our article by creating an `Article` content type

- Dive in your strapi admin panel and click on the `Content Type Builder` link in the sidebar

![](https://blog.strapi.io/content/images/2019/11/Capture-d-e-cran-2019-11-06-a--15.39.45.png)

- Click on `Add A Content Type` and call it `article`

![](https://blog.strapi.io/content/images/2019/11/Capture-d-e-cran-2019-11-06-a--15.39.53.png)

Now you'll be asked to create all the fields for your content-type:

![](https://blog.strapi.io/content/images/2019/11/Capture-d-e-cran-2019-11-06-a--15.40.02.png)

- Create the following ones:
  - `title` with type **String** (**required**)
  - `content` with type **Rich Text** (**required**)
  - `image` with type **Media** and (**required**)
  - `published_at` with type **Date** (**required**)

**Press Save!** Here you go, your first content type has been created. Now you may want to create your first article, but we have one thing to do before that: **Open the article content type permissions**

- Click on the [Roles & Permission](http://localhost:1337/admin/plugins/users-permissions/roles) and click on the `public` role.
- Check the article `find` and `findone` routes and save

![](https://blog.strapi.io/content/images/2019/11/Capture-d-e-cran-2019-11-06-a--16.00.00.png)

**Awesome!** You should be ready to create your first article right now and fetch it on the GraphQL Playground

- Create your first article and many more!

_Here's an example_
![](https://blog.strapi.io/content/images/2019/11/Capture-d-e-cran-2019-11-13-a--16.51.46.png)

**Great!** Now you may want to reach the moment when you can actually fetch your articles through the API!

- Go to [http://localhost:1337/articles](http://localhost:1337/articles)

Isn't that cool! You can also play with the [GraphQL Playground](http://localhost:1337/graphql)

![](https://blog.strapi.io/content/images/2019/11/Capture-d-e-cran-2019-11-06-a--16.30.06.png)

#### Create categories

You may want to assign a category to your article (news, trends, opinion). You are going to do this by creating another content type in strapi.

- Create a `category` content type with the following fields
  - `name` with type **String**

**Press save!**

- Create a **new field** in the **Article** content type which is a **Relation** `Category has many Articles` like below

![](https://blog.strapi.io/content/images/2019/11/Capture-d-e-cran-2019-11-13-a--16.43.33.png)

- Click on the [Roles & Permission](http://localhost:1337/admin/plugins/users-permissions/roles) and click on the `public` role. And check the category `find` and `findone` routes and save

Now you'll be able to select a category for your article in the right sidebox.

![](https://blog.strapi.io/content/images/2019/11/Capture-d-e-cran-2019-11-13-a--16.51.46-1.png)

Now that we are good with Strapi, let's work on the frontend part!

#### Create the Query component

You are going to use apollo in order to fetch your data from different pages. We don't want you to write the same code everytime in your pages, this is why you are going to write a `Query` component that will be reusable!

- Create a `./components/query.js` file containing the following code:

```
import React from "react";
import { useQuery } from "@apollo/react-hooks";

const Query = ({ children, query, id }) => {
  const { data, loading, error } = useQuery(query, {
    variables: { id: parseInt(id) }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  return children({ data });
};

export default Query;
```

We are using the `useQuery` hook to call your strapi server at this adress `http://localhost:1337/graphql`. We are sending an `id` if it exists (it will be necessary when you'll want to fetch just one article)

If the request is successful, you will return the children component with the retrieved data as prop

Lets try it out by creating our navbar that will fetch all our categories

- Remove the code inside your `./components/nav.js` and replace it with the following code:

```
import React from "react";
import Link from "next/link"
import Query from "../components/query";
import CATEGORIES_QUERY from "../apollo/queries/category/categories";

const Nav = () => {
  return (
    <div>
      <Query query={CATEGORIES_QUERY} id={null}>
        {({ data: { categories } }) => {
          return (
            <div>
              <nav className="uk-navbar-container" data-uk-navbar>
                <div className="uk-navbar-left">
                  <ul className="uk-navbar-nav">
                    <li>
                      <Link href="/">
                        <a>Strapi Blog</a>
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="uk-navbar-right">
                  <ul className="uk-navbar-nav">
                    {categories.map((category, i) => {
                      return (
                        <li key={category.id}>
                          <Link
                            href={{
                              pathname: "category",
                              query: { id: category.id }
                            }}
                          >
                            <a className="uk-link-reset">{category.name}</a>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </nav>
            </div>
          );
        }}
      </Query>
    </div>
  );
};

export default Nav;
```

![](https://blog.strapi.io/content/images/2019/11/Capture-d-e-cran-2019-11-25-a--15.23.40.png)

Oh oh! Seems like we forgot something!
In fact, you need to write the query!

- Create the `./apollo/queries/category/categories.js` file containing the following code:

```
import gql from "graphql-tag";

const CATEGORIES_QUERY = gql`
  query Categories {
    categories {
      id
      name
    }
  }
`;

export default CATEGORIES_QUERY;
```

**Great!** You should now be able to see your brand new nav containing your categories but links are not working right now, you'll do this later on the tutorial don't worry

**Note:** The current code is not suited to display a lot of categories as you may encounter an UI issue. Since this blog post is supposed to be short, I will let you improve the code to maybe add a lazy load or something.

You may want to have your nav on every pages of your application, not just the `index.js` page.

- Move the following parts from your `index.js` and put it in your `_app.js`

**Take from `index.js`**

```
import Nav from "../components/nav";
...
<Nav />
```

**Put in `_app.js`**

```
import Nav from "../components/nav";
...
<Nav /> // Put the Nav component just after the Head component
```

#### Create the Articles component

This component will display all your articles on different pages, so listing them through a component is not a bad idea.

But first we need to do something about your strapi url:

You'll need to store your API url in an `.env` file.

- Create an `.env` file at the root of your `frontend` folder containing the following:

`API_URL="http://localhost:1337"`

- Install dotenv by running the following command:

`yarn add dotenv`

- Add this code to your `next.config.js` file:

```
require("dotenv").config();
const withCSS = require("@zeit/next-css");
const withFonts = require("next-fonts");

module.exports = withCSS({
  env: {
    API_URL: process.env.API_URL
  }
});
```

Alright you are now ready to create your `Articles` component

Create a `./components/Articles.js` file containing the following:

```
import React from "react";
import Card from "./card";

const Articles = ({ articles }) => {
  const leftArticlesCount = Math.ceil(articles.length / 5);
  const leftArticles = articles.slice(0, leftArticlesCount);
  const rightArticles = articles.slice(leftArticlesCount, articles.length);

  return (
    <div>
      <div className="uk-child-width-1-2" data-uk-grid>
        <div>
          {leftArticles.map((article, i) => {
            return <Card article={article} key={`article__${article.id}`} />;
          })}
        </div>
        <div>
          <div className="uk-child-width-1-2@m uk-grid-match" data-uk-grid>
            {rightArticles.map((article, i) => {
              return <Card article={article} key={`article__${article.id}`} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Articles;
```

As you can see, you are giving this component a prop `const Articles = ({ articles })`! Where the articles come from then ?! **From your index page**. You are goin to edit the `index.js` page but first let's create a `Card` component. In fact you want to display the right and left items in the same way. To avoid duplicating code, it is interesting to use a component

- Create a `./components/card.js` file containing the following:

```
import React from "react";
import Link from "next/link";

const Card = ({ article }) => {
  return (
    <Link href={{ pathname: "article", query: { id: article.id } }}>
      <a className="uk-link-reset">
        <div className="uk-card uk-card-muted">
          <div className="uk-card-media-top">
            <img
              src={process.env.API_URL + article.image.url}
              alt={article.image.url}
              height="100"
            />
          </div>
          <div className="uk-card-body">
            <p id="category" className="uk-text-uppercase">
              {article.category.name}
            </p>
            <p id="title" className="uk-text-large">
              {article.title}
            </p>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Card;

```

Awesome! Now you can modify your `index.js` file

- Replace the code in your `index.js` file with the following:

```
import React from "react";
import Articles from "../components/articles";
import Query from "../components/query";
import ARTICLES_QUERY from "../apollo/queries/article/articles";

const Home = () => {
  return (
    <div>
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>Strapi blog</h1>
          <Query query={ARTICLES_QUERY}>
            {({ data: { articles } }) => {
              return <Articles articles={articles} />;
            }}
          </Query>
        </div>
      </div>
    </div>
  );
};

export default Home;
```

And don't forget the query!

- Create a `./apollo/queries/article/articles.js` containing the following code:

```
import gql from "graphql-tag";

const ARTICLES_QUERY = gql`
  query Articles {
    articles {
      id
      title
      category {
        id
        name
      }
      image {
        url
      }
    }
  }
`;

export default ARTICLES_QUERY;
```

![](https://blog.strapi.io/content/images/2019/11/Capture-d-e-cran-2019-11-25-a--15.45.14.png)

**Look's good right?** You can now list every articles on your main page

#### Article page

You can see that if you click on the article, there is nothing. Let's create the article page together! But first, you'll need two packages:

- Install `react-moment` and `react-markdown` by running the following command:

`yarn add react-moment react-markdown`

`react-moment` will give you the ability to display the publication date of your article and `react-markdown` will be used to display the content of your article in markdown

- Create a `./pages/article.js` file containing the following:

```
import { useRouter } from "next/router";
import Query from "../components/query";
import ReactMarkdown from "react-markdown";
import Moment from "react-moment";
import ARTICLE_QUERY from "../apollo/queries/article/article";

const Article = () => {
  const router = useRouter();
  return (
    <Query query={ARTICLE_QUERY} id={router.query.id}>
      {({ data: { article } }) => {
        return (
          <div>
            <div
              id="banner"
              className="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding uk-margin"
              data-src={process.env.API_URL + article.image.url}
              data-srcset={process.env.API_URL + article.image.url}
              data-uk-img
            >
              <h1>{article.title}</h1>
            </div>

            <div className="uk-section">
              <div className="uk-container uk-container-small">
                <ReactMarkdown source={article.content} />
                <p>
                  <Moment format="MMM Do YYYY">{article.published_at}</Moment>
                </p>
              </div>
            </div>
          </div>
        );
      }}
    </Query>
  );
};

export default Article;
```

Let's write the query for just one article now!

- Create a `./apollo/queries/article/article.js` containing the following code:

```
import gql from "graphql-tag";

const ARTICLE_QUERY = gql`
  query Articles($id: ID!) {
    article(id: $id) {
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
      published_at
    }
  }
`;

export default ARTICLE_QUERY;
```

**Great!** You should be able to get your article now!

![](https://blog.strapi.io/content/images/2019/11/Capture-d-e-cran-2019-11-25-a--15.58.25.png)

#### Categories

You may want to separate your article depending on categories!
Let's create a page for each category then

- Create a `./pages/category.js` file containing the following:

```
import { useRouter } from "next/router";
import Articles from "../components/articles";
import Query from "../components/query";
import CATEGORY_ARTICLES_QUERY from "../apollo/queries/category/articles";

const Category = () => {
  const router = useRouter();

  return (
    <Query query={CATEGORY_ARTICLES_QUERY} id={router.query.id}>
      {({ data: { category } }) => {
        return (
          <div>
            <div className="uk-section">
              <div className="uk-container uk-container-large">
                <h1>{category.name}</h1>
                <Articles articles={category.articles} />
              </div>
            </div>
          </div>
        );
      }}
    </Query>
  );
};

export default Category;
```

- Create a `./apollo/queries/category/articles.js` file containing the following:

```
import gql from 'graphql-tag';

const CATEGORY_ARTICLES_QUERY = gql`
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
`;

export default CATEGORY_ARTICLES_QUERY;
```

**Awesome!** You can list articles depending on the selected category now

![](https://blog.strapi.io/content/images/2019/11/Capture-d-e-cran-2019-11-25-a--16.04.09.png)

### Conclusion

Huge congrats, you successfully achieved this tutorial. I hope you enjoyed it!

![](https://media.giphy.com/media/8q92vsFOM9I2s/giphy.gif)

Still hungry?

Feel free to add additional features, adapt this project to your own needs, and give your feedback in the comments section.

If you want to deploy your application, check our documentation: https://strapi.io/documentation/3.0.0-alpha.x/guides/deployment.html#configuration

**If you are interested in improving this tutorial, feel free to join our slack channel here: https://slack.strapi.io/ and contact me `@Maxime Castres`**

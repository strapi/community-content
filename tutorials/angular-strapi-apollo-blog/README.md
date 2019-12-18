![strapi-blog](/content/images/2019/11/Capture-d-e-cran-2019-11-19-a--10.27.26.png)

## Introduction

This month, we published two tutorials on [how to create a blog with Nuxt.js](https://strapi.io/blog/build-a-blog-using-nuxt-strapi-and-apollo/) and [how to create a blog with Next.js](http://blog.strapi.io/build-a-blog-with-next-react-js-strapi-and-apollo/) with Strapi. But as the saying goes, good things come in threes!

So we decided to also create a tutorial for Angular developers on how to create a blog using Strapi and Apollo and we hope you'll like it!

## Goal
If you are familiar with our blog, you should have already learned how to create a blog with [Gatsby](https://strapi.io/blog/building-a-static-website-using-gatsby-and-strapi), [Nuxt.js](https://strapi.io/blog/build-a-blog-using-nuxt-strapi-and-apollo/) or [Next.js](http://blog.strapi.io/build-a-blog-with-next-react-js-strapi-and-apollo/). But what if you would instead use Angular? Let me tell you that I got that covered as today, we are going to learn how to do it with Angular js.

The goal here is to be able to create a blog website using Strapi as the backend, Angular for the frontend, and Apollo for requesting the Strapi API with GraphQL.

The source code is available on GitHub: https://github.com/strapi/strapi-tutorials/tree/master/tutorials/angular-strapi-apollo-blog/

## Prerequisites
To follow this tutorial, you'll need to have Strapi and Angular installed on your computer, but don't worry, we are going to install these together!

**This tutorial use Strapi v3.0.0-beta.17.5.**

**You need to have node  v.12 installed and that's all.**

## Setup

Create a blog-strapi folder and get inside!

  - `mkdir blog-strapi && cd blog-strapi`

#### Back-end setup
So that's the easy part, since the beta.9 we have an awesome package [create strapi-app]([https://www.npmjs.com/package/create-strapi-app](https://www.npmjs.com/package/create-strapi-app)) that allows you to create a Strapi project in seconds without needing to install Strapi globally so let's try it out.

(For the tutorial we will use `yarn` as your package manager)

  - `yarn create strapi-app backend --quickstart --no-run`.

This single command line will create all you need for your back-end. Make sure to add the `--no-run` flag as it will prevent your app from automatically starting the server because **SPOILER ALERT: we need to install some awesome Strapi plugins.**

Now that you know that we need to install some plugins to enhance your app, let's install one of our most popular. The `graphql` plugin:

  - `yarn strapi install graphql`

Once the installation is completed, you can finally start your Strapi server `strapi dev` and create your first Administrator. That's the one that has all the rights in your application, so please make sure to enter a proper password (*password123*) is really not safe...

![](/content/images/2019/11/Creation-admin.png)

Don't forget that Strapi is running on [http://localhost:1337](http://localhost:1337)

**Nice!** Now that Strapi is ready, you are going to create your Nuxt application.

#### Front-end setup

Well, the easiest part has been completed, let's get our hands dirty developing our blog!

**Angular setup**

  - Install the Angular CLI by running the following command:

  `npm install -g @angular/cli`

  - Create an Angular `frontend` project, and **accept** to add `Angular routing`:

  `ng new frontend`

Now you project is all set, you can dive in it and run the server:

```
cd frontend
ng serve
```

![](/content/images/2019/12/Capture-d-e-cran-2019-12-16-a--11.38.57.png)

As you might want people to read your blog or to make it "cute & pretty" we will use a popular CSS framework for styling: UiKit and also Apollo to query Strapi with GraphQL:

**Dependencies setup**

Make sure you are in the frontend folder before running the following commands:

**Apollo setup**

  - Install `apollo-angular` by running the following command:

  `ng add apollo-angular`

  - Go in `src/app/graphql.modules.ts` and modify the `uri` const:

  `const uri = 'http://localhost:1337/graphql'`;

This way, apollo will call this address which is the GraphQL route of your Strapi API

**UIkit setup**

UIkit is a lightweight and modular front-end framework for developing fast and powerful web interfaces.

  - Install UIkit by running the following command:

  `yarn add uikit`

  - Open your `angular.json` file and add the following code in the first `scripts` array. It should look like this:

```
"scripts": [
  "node_modules/jquery/dist/jquery.min.js",
  "node_modules/uikit/dist/js/uikit.min.js",
  "node_modules/uikit/dist/js/uikit-icons.min.js"
]
```

  - Open your `src/style.css` and paste the following code:

```
/* You can add global styles to this file, and also import other style files */
@import "../node_modules/uikit/dist/css/uikit.min.css";
@import "../node_modules/uikit/dist/css/uikit.css";
@import "../node_modules/uikit/dist/css/uikit-core.css";
@import url("https://fonts.googleapis.com/css?family=Staatliches");

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

**Note**: You're importing UIkit style and a beautiful font that you'll use for this tutorial.

#### Designing the data structure
Finally! we are going to structure the data shape of our article by creating an `Article` content type

**Note**: Be sure to be inside your `backend` folder

  - Dive in your strapi admin panel and click on the `Content Type Builder` link in the sidebar

![](/content/images/2019/11/Capture-d-e-cran-2019-11-06-a--15.39.45.png)

  - Click on `Add A Content Type` and call it `article`

![](/content/images/2019/11/Capture-d-e-cran-2019-11-06-a--15.39.53.png)

Now you'll be asked to create all the fields for your content-type:

![](/content/images/2019/11/Capture-d-e-cran-2019-11-06-a--15.40.02.png)


  - Create the following ones:
    - `title` with type **String** (**required**)
    - `content` with type **Rich Text** (**required**)
    - `image` with type **Media** and (**required**)
    - `published_at` with type **Date** (**required**)

**Press Save!** Here you go, your first content type has been created. Now you may want to create your first article, but we have one thing to do before that: **Open the article content type permissions**


  - Click on the [Roles & Permission](http://localhost:1337/admin/plugins/users-permissions/roles) and click on the `public` role.
  - Check the article `find` and `findone` routes and save

![](/content/images/2019/11/Capture-d-e-cran-2019-11-06-a--16.00.00.png)

**Awesome!** You should be ready to create your first article right now and fetch it on the GraphQL Playground

  - Create your first article and many more!

*Here's an example*
![](/content/images/2019/11/Capture-d-e-cran-2019-11-13-a--16.51.46.png)

**Great!** Now you may want to reach the moment when you can actually fetch your articles through the API!

  - Go to [http://localhost:1337/articles](http://localhost:1337/articles)

Isn't that cool! You can also play with the [GraphQL Playground](http://localhost:1337/graphql)

![](/content/images/2019/11/Capture-d-e-cran-2019-11-06-a--16.30.06.png)

#### Create categories
You may want to assign a category to your article (news, trends, opinion). You are going to do this by creating another content type in strapi.

  - Create a `category` content type with the following fields
    - `name` with type **String**

**Press save!**

  - Create a **new field** in the **Article** content type which is a **Relation** `Category has many Articles` like below

![](/content/images/2019/11/Capture-d-e-cran-2019-11-13-a--16.43.33.png)

  - Click on the [Roles & Permission](http://localhost:1337/admin/plugins/users-permissions/roles) and click on the `public` role. And check the category `find` and `findone` routes and save

Now you'll be able to select a category for your article in the right sidebox.

![](/content/images/2019/11/Capture-d-e-cran-2019-11-13-a--16.51.46-1.png)

Now that we are good with Strapi, let's work on the frontend part!

### Nav component

Let's create our first component and see what happens

  - Create a `nav` component by running the following command:

  `ng generate c nav --skip-import`

![](/content/images/2019/12/Capture-d-e-cran-2019-12-16-a--12.03.22.png)

Four files have been created but we'll only work with the `.html` and `.ts` files. In fact your `.html` file is the view of your component and your `.ts` file defines what your component will basically do.

I'm going to explain this component in details, but it will be the same procedures for the other ones.

First of all you want to fetch categories you've created on strapi, to do so, you'll create a graphql request and use it in your component.

  - Create a `app/apollo/queries/category` directory
  - Create a `app/apollo/queries/category/categories.js` file and paste the following code inside:

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

Now lets import this query and the necessary packages:

  - Add this to the top of your `nav/nav.component.ts` file:

```
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import CATEGORIES_QUERY from "../apollo/queries/category/categories";
import { Subscription } from "rxjs";
```

  - Replace the export by the following one:

```
export class NavComponent implements OnInit {
  data: any = {};
  loading = true;
  errors: any;

  private queryCategories: Subscription;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.queryCategories = this.apollo
      .watchQuery({
        query: CATEGORIES_QUERY
      })
      .valueChanges.subscribe(result => {
        this.data = result.data;
        this.loading = result.loading;
        this.errors = result.errors;
      });
  }
  ngOnDestroy() {
    this.queryCategories.unsubscribe();
  }
}
```

What you're doing here is fetching all your articles with apollo on the component initialisation.
Let's write our Navbar!

  - Open `nav/nav.component.html` and paste the following code:

```
<nav class="uk-navbar-container" uk-navbar>
  <div class="uk-navbar-left">
    <ul class="uk-navbar-nav">
      <li class="uk-active"><a href="#">Strapi blog</a></li>
    </ul>
  </div>

  <div class="uk-navbar-right">
    <ul *ngIf="data" class="uk-navbar-nav">
      <li *ngFor="let category of data.categories" class="uk-active">
        <a
          routerLink="/category/{{ category.id }}"
          routerLinkActive="active"
          class="uk-link-reset"
        >
          {{ category.name }}
        </a>
      </li>
    </ul>
  </div>
</nav>
```

**Perfect!** Now we need to to two things!

  - Open your `app.modules.ts` file and import your newly created nav component by importing it and adding it to the `declarations` array like this:

```
...
import { NavComponent } from "./nav/nav.component";
...

declarations: [
  AppComponent,
  NavComponent
],
...
```

  - Open your `app.component.html` file and declare your nav component by pasting the following code:

```
<app-nav></app-nav>

<router-outlet></router-outlet>
```

![](/content/images/2019/12/Capture-d-e-cran-2019-12-16-a--14.39.14.png)

**Note** The current code is not suited to display a lot of categories as you may encounter a UI issue. Since this blog post is supposed to be short, I will let you improve the code to maybe add a lazy load or something.

For now, the links are not working, you'll work on it later on the tutorial ;)

**Note** It will now be the same exact logic for every other components:

  - Generate the component
  - Create the GraphQL query
  - Fetch your data in your `.ts` file
  - Create the view in your `.html` file
  - Register your component in `app.module.ts`
  - Some routing :)


### Articles component

This component will display all your articles and will be displayed on the main page

  - Create an `articles` component by running the following command:

   `ng generate c articles --skip-import`

  - Create a `app/apollo/queries/article` directory
  - Create a `app/apollo/queries/article/articles.js` file and paste the following code inside:

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

  - Open your `articles/articles.component.ts` file and paste the following code:

```
import { Component, OnInit } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import ARTICLES_QUERY from "../apollo/queries/article/articles";
import { Subscription } from "rxjs";

@Component({
  selector: "app-articles",
  templateUrl: "./articles.component.html",
  styleUrls: ["./articles.component.css"]
})
export class ArticlesComponent implements OnInit {
  data: any = {};
  loading = true;
  errors: any;
  leftArticlesCount: any;
  leftArticles: any[];
  rightArticles: any[];

  private queryArticles: Subscription;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.queryArticles = this.apollo
      .watchQuery({
        query: ARTICLES_QUERY
      })
      .valueChanges.subscribe(result => {
        this.data = result.data;
        this.leftArticlesCount = Math.ceil(this.data.articles.length / 5);
        this.leftArticles = this.data.articles.slice(0, this.leftArticlesCount);
        this.rightArticles = this.data.articles.slice(
          this.leftArticlesCount,
          this.data.articles.length
        );
        this.loading = result.loading;
        this.errors = result.errors;
      });
  }

  ngOnDestroy() {
    this.queryArticles.unsubscribe();
  }
}
```

  - Open your `articles/articles.component.html` and paste the following code:

```
<div class="uk-section">
  <div class="uk-container uk-container-large">
    <h1>Strapi blog</h1>

    <div class="uk-child-width-1-2" uk-grid>
      <div>
        <a
          routerLink="/article/{{ article.id }}"
          routerLinkActive="active"
          *ngFor="let article of leftArticles"
          class="uk-link-reset"
        >
          <div class="uk-card uk-card-muted">
            <div *ngIf="article.image" class="uk-card-media-top">
              <img
                src="http://localhost:1337{{ article.image.url }}"
                alt=""
                height="100"
              />
            </div>
            <div class="uk-card-body">
              <p
                id="category"
                *ngIf="article.category"
                class="uk-text-uppercase"
              >
                {{ article.category.name }}
              </p>
              <p id="title" class="uk-text-large">{{ article.title }}</p>
            </div>
          </div>
        </a>
      </div>
      <div>
        <div class="uk-child-width-1-2@m uk-grid-match" uk-grid>
          <a
            routerLink="/article/{{ article.id }}"
            routerLinkActive="active"
            *ngFor="let article of rightArticles"
            class="uk-link-reset"
          >
            <div class="uk-card uk-card-muted">
              <div *ngIf="article.image" class="uk-card-media-top">
                <img
                  src="http://localhost:1337{{ article.image.url }}"
                  alt=""
                  height="100"
                />
              </div>
              <div class="uk-card-body">
                <p
                  id="category"
                  *ngIf="article.category"
                  class="uk-text-uppercase"
                >
                  {{ article.category.name }}
                </p>
                <p id="title" class="uk-text-large">{{ article.title }}</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
```

  - Open your `app.modules.ts` file, import your component and add it to the declarations array like this:

```
...
import { ArticlesComponent } from "./articles/articles.component";
...

declarations: [
  AppComponent,
  ArticlesComponent,
  NavComponent,
],
```

It's time to use the router from angular. You want to display this `ArticlesComponent` on your main page

  - Import `RouterModule`, `Routes` from Angular and define the following `appRoutes`:

```
import { RouterModule, Routes } from "@angular/router";
...

const appRoutes: Routes = [
  { path: "", component: ArticlesComponent }
];

```

  - And then add your RouterModule to your `imports` array:

```
...
imports: [
  RouterModule.forRoot(appRoutes, { enableTracing: true }),
  BrowserModule,
  AppRoutingModule,
  GraphQLModule,
  HttpClientModule
],
...
```

![](/content/images/2019/12/Capture-d-e-cran-2019-12-16-a--15.39.07.png)

**Great!** You can now list every articles on your main page

### Article Component

  - Create an article component by running the following command:

  `ng generate c article --skip-import`


  - Create a `app/apollo/queries/article/article.js` file and paste the following code inside:

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

  - Open your `article/article.component.ts` and paste the following code:

```
import { Component, OnInit } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import ARTICLE_QUERY from "../apollo/queries/article/article";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-article",
  templateUrl: "./article.component.html",
  styleUrls: ["./article.component.css"]
})
export class ArticleComponent implements OnInit {
  data: any = {};
  loading = true;
  errors: any;

  private queryArticle: Subscription;

  constructor(private apollo: Apollo, private route: ActivatedRoute) {}

  ngOnInit() {
    this.queryArticle = this.apollo
      .watchQuery({
        query: ARTICLE_QUERY,
        variables: {
          id: this.route.snapshot.paramMap.get("id")
        }
      })
      .valueChanges.subscribe(result => {
        this.data = result.data;
        this.loading = result.loading;
        this.errors = result.errors;
      });
  }
  ngOnDestroy() {
    this.queryArticle.unsubscribe();
  }
}
```

  - Install `ngx-mardown` by running the following command:

  `yarn add ngx-markdown`

  - Open your `app.modules.ts`, import add the MarkdownModule to your `imports` array:

```
...
import { MarkdownModule } from "ngx-markdown";
...

imports: [
  MarkdownModule.forRoot(),
  RouterModule.forRoot(appRoutes, { enableTracing: true }),
  BrowserModule,
  AppRoutingModule,
  GraphQLModule,
  HttpClientModule
],
...
```

It will be used to convert your article content in markdown

  - Open your `article/article.component.html` and paste the following code:

```
<div
  id="banner"
  class="uk-height-small uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding"
  [style.background-image]="
    'url(http://localhost:1337' + data.article.image.url + ')'
  "
  uk-img
>
  <h1>{{ data.article.title }}</h1>
</div>

<div class="uk-section">
  <div class="uk-container uk-container-small">
    <p>
      <markdown ngPreserveWhitespaces>
        {{ data.article.content }}
      </markdown>
    </p>
    <p></p>
  </div>
</div>
```

  - Open your `app.modules.ts` file, import your component, add it to the declarations array and add another route for this component:

```
...
import { ArticleComponent } from "./article/article.component";
...

const appRoutes: Routes = [
  { path: "", component: ArticlesComponent },
  { path: "article/:id", component: ArticleComponent },
];
...

declarations: [
  AppComponent,
  NavComponent,
  ArticlesComponent,
  ArticleComponent
],
...
```

  - Click on any article!

![](/content/images/2019/12/Capture-d-e-cran-2019-12-16-a--15.56.24.png)

**Awesome** you can now visit any article !

### Category component

With this component, you'll be able to fetch articles depending on the selected category your are

  - Create a `category` component by running the following command:

  `ng generate c category --skip-import`

  - Create a `app/apollo/queries/category/articles.js` file containing the following:

```
import gql from "graphql-tag";

const CATEGORY_ARTICLES_QUERY = gql`
  query Category($id: ID!) {
    category(id: $id) {
      id
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

  - Open your `category/category.component.ts` file and paste the following code:

```
import { Component, OnInit } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import CATEGORY_ARTICLES_QUERY from "../apollo/queries/category/articles";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.css"]
})
export class CategoryComponent implements OnInit {
  data: any = {};
  category: any = {};
  loading = true;
  errors: any;
  leftArticlesCount: any;
  leftArticles: any[];
  rightArticles: any[];
  id: any;

  private queryCategoriesArticles: Subscription;

  constructor(private apollo: Apollo, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get("id");
      this.queryCategoriesArticles = this.apollo
        .watchQuery({
          query: CATEGORY_ARTICLES_QUERY,
          variables: {
            id: this.id
          }
        })
        .valueChanges.subscribe(result => {
          this.data = result.data
          this.category = this.data.category.name
          console.log(this.data)
          this.leftArticlesCount = Math.ceil(this.data.category.articles.length / 5);
          this.leftArticles = this.data.category.articles.slice(0, this.leftArticlesCount);
          this.rightArticles = this.data.category.articles.slice(
            this.leftArticlesCount,
            this.data.category.articles.length
          );
          this.loading = result.loading;
          this.errors = result.errors;
        });
    });
  }
  ngOnDestroy() {
    this.queryCategoriesArticles.unsubscribe();
  }
}
```

  - Open your `category/category.component.html` file and paste the following code:

```
<div class="uk-section">
  <div class="uk-container uk-container-large">
    <h1>{{ category }}</h1>

    <div class="uk-child-width-1-2" uk-grid>
      <div>
        <a
          routerLink="/article/{{ article.id }}"
          routerLinkActive="active"
          *ngFor="let article of leftArticles"
          class="uk-link-reset"
        >
          <div class="uk-card uk-card-muted">
            <div *ngIf="article.image" class="uk-card-media-top">
              <img
                src="http://localhost:1337{{ article.image.url }}"
                alt=""
                height="100"
              />
            </div>
            <div class="uk-card-body">
              <p
                id="category"
                *ngIf="article.category"
                class="uk-text-uppercase"
              >
                {{ article.category.name }}
              </p>
              <p id="title" class="uk-text-large">{{ article.title }}</p>
            </div>
          </div>
        </a>
      </div>
      <div>
        <div class="uk-child-width-1-2@m uk-grid-match" uk-grid>
          <a
            routerLink="/article/{{ article.id }}"
            routerLinkActive="active"
            *ngFor="let article of rightArticles"
            class="uk-link-reset"
          >
            <div class="uk-card uk-card-muted">
              <div *ngIf="article.image" class="uk-card-media-top">
                <img
                  src="http://localhost:1337{{ article.image.url }}"
                  alt=""
                  height="100"
                />
              </div>
              <div class="uk-card-body">
                <p
                  id="category"
                  *ngIf="article.category"
                  class="uk-text-uppercase"
                >
                  {{ article.category.name }}
                </p>
                <p id="title" class="uk-text-large">{{ article.title }}</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
```

  - Open your `app.modules.ts` file, import your component, add it to the declarations array and add another route for this component:


```
...
import { CategoryComponent } from "./category/category.component";
...

const appRoutes: Routes = [
  { path: "", component: ArticlesComponent },
  { path: "article/:id", component: ArticleComponent },
  { path: "category/:id", component: CategoryComponent }
];
...

declarations: [
  AppComponent,
  ArticlesComponent,
  ArticleComponent,
  NavComponent,
  CategoryComponent
],

...
```

![](/content/images/2019/12/Capture-d-e-cran-2019-12-16-a--17.24.46.png)


**Awesome**! You can now navigate through categories :)

### Conclusion
Huge congrats, you successfully achieved this tutorial. I hope you enjoyed it!

![](https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif)

Still hungry?

Feel free to add additional features, adapt this project to your own needs, and give your feedback in the comments section.

If you want to deploy your application, check our documentation: https://strapi.io/documentation/3.0.0-beta.x/guides/deployment.html

**If you are interested in improving this tutorial, feel free to join our slack channel here: https://slack.strapi.io/ and contact me `@Maxime Castres`**

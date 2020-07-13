# Strapi API

## Available Scripts

In the project directory, you can run:

### `yarn`

`yarn` installs all dependencies to make this project work.

### `yarn seed`

`yarn seed` seeds demo data **You need to run this command before starting your project**.

### `yarn develop`

`yarn develop` starts the server in developement environment and builds the administration panel.
Open [http://localhost:1337/admin](http://localhost:1337/admin) to view it in the browser.

## Strapi features used

### Collection types

#### Users

Users are automatically created by Strapi. We don't use them in this project.

#### Pages

Each entry in this collection creates a new page. The `slug` attribute is used to build the page's URL. To create the root page of your site, leave the `slug` attribute empty. You can also create nested pages by replacing slashes (`/`) by double underscores (`__`).

If your website was `yoursite.com`, you'd be able to create these pages:

| slug            | generated page              |
|-----------------|-----------------------------|
|                 | yoursite.com                |
| contact         | yoursite.com/contact        |
| customers       | yoursite.com/customers      |
| customers__acme | yoursite.com/customers/acme |

By default, a page has the `draft` status. Once you're ready to make it public, set the status to `published`.

### Single types

#### Global

Global is where we store the data for configs that have an impact on the entire site. It contains the default site metadata, as well as the navbar and footer contents.

### Components

The `Section` folder contains components that are used to build your website pages. They contain the data required to display blocks of UI on the frontend.

The other folders – elements, links and meta – contain other data structures that are used in several places.

### Dynamic Zones

The `Pages` collection type has a `ContentSections` collection which is a dynamic zone. It allows you to select a list of components in the Section folder. This is where you build your UI: you can pick your components, fill them with your data, reorder them.

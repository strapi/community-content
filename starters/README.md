![Starters](/assets/banner-starters.png)

# Starters

Show the community your starters with Strapi!

A template is a Strapi project containing existing content-types and data.
A starter is a front-end project ready to fetch a Strapi template project data.

Feel free to use our official templates right below or [create your own template](https://github.com/strapi/community-content/tree/master/templates):
   - E-commerce: https://github.com/strapi/strapi-template-ecommerce
   - Corporate: https://github.com/strapi/strapi-template-corporate
   - Blog: https://github.com/strapi/strapi-template-blog
   - Portfolio: https://github.com/strapi/strapi-template-portfolio
   - Catalog: https://github.com/strapi/strapi-template-catalog


## How to add your starter

  - Edit the `starters.yml` file by adding your submission with the following format:

```yaml
- title: Title of your Starter
  author: John Doe
  photo: https://via.placeholder.com/300
  repo: johndoe/awesome-strapi-starter
  slug: johndoe-awesome-strapi-starter
  use_cases:
    - blog
  integration: Gatsby
  preview: https://johndoe.github.io/awesome-strapi-starter
  description: Bootstrap a great blog application using Gatsby and Strapi. In this starter, you'll be able to use all the latest features available in Strapi.
  features:
    - 1 Single type
    - 4 Components
    - "3 Collection types: Article, Category, User"
    - 6 Created articles
  youtube: https://www.youtube.com/embed/4g3Pzj-wdXo
  how_to_install: Add a short description here, application using Gatsby and Strapi. lorem ipsum dolor sit you'll be able to use all the latest features
  command: yarn create strapi-starter https://github.com/strapi/strapi-starter-gatsby-blog
```

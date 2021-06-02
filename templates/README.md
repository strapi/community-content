![Starters](/assets/banner-starters.png)

# Template

A template is a Strapi project containing existing content-types and data.

Show the community your template with Strapi!

## How to develop a template

**Create** a Strapi project from scratch using:

```bash
# yarn
yarn create strapi-app my-project

# npm 
npx create-strapi-app my-project
```

**Build** out your project by adding content-types, components, dynamic zones or plugins.

**Generate** the template by running:

```bash
# yarn
yarn strapi generate:template <path/to/name-of-template>

# npm 
npx strapi generate:template <path/to/name-of-template>
```


## How to add your template

  - Edit the `templates.yml` file by adding your submission with the following format:

```yaml
- title: <name> Template
  author: John Doe
  repo: johndoe/awesome-strapi-template
  slug: awesome-strapi-template
  use_cases:
    - <name>
  description: A pre-configured Strapi <name> template to build projects with any frontend.
  features:
    - 2 Collection types
    - 2 Created articles
    - 3 Created categories
    - Permissions set to true for the required content types
    - Responsive design using UIkit
  command:
    yarn: yarn create strapi-app my-project --template <name>
    npm: npx create-strapi-app my-project --template <name>
```
![Templates](/assets/banner-templates.png)

# Template

A template is a Strapi project containing existing content-types and data.

Show the community your template with Strapi!

Learn more about templates [here](https://strapi.io/documentation/developer-docs/latest/developer-resources/cli/CLI.html#strapi-generate-template)

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
    - Permissions set to true for the required content types
    - Internationalization with i18n
    - Draft and publish
  starters:
    - https://github.com/<username>/<some-public-repo>
  command:
    yarn: yarn create strapi-app my-project --template <name>
    npm: npx create-strapi-app my-project --template <name>
```
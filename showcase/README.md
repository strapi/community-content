![Showcase](/assets/banner-showcase.png)

# Showcase

Show to the community what your Strapi project looks like!

The entire Strapi team is very curious to see what you all can build using our solution. Others in the community are eager to see first-hand what we can create with Strapi and be reassured about the feasibility of their own projects.

We decided to create a [Showcase](https://github.com/strapi/community-content/tree/master/showcase) section where anyone can list their websites, which have been made with love and care, and Strapi of course! 

This list is displayed on our [website](https://strapi.io/showcases).

## How to add your site

  - First of all, verify that your site is not already listed. You never know, someone could have done it before you.
  - Edit the `sites.yml` file by adding your submission with the following format:

```yaml
- title: Title of your Site
  url: https://yourawesomesite.com
  description: This awesome website is using Strapi for managing the content of my Nuxt.js application
  categories:
    - Corporate website
  frontend:
    - Nuxt.js
    - UIkit
  made_by: John smith
  made_by_url: https://john-smith.io
```

- `title` - Title of your site (`string`; **required**)
- `url` - Url of your site (`string`; **required**)
- `description` - Little description (`string`; **required**)
- `categories` - Categories of your site (`array` of `strings`; **required**)
- `frontend` - Frontend teck used in your site (`array` of `strings`; **required**)
- `made_by` - Who made this awesome website? (`string`; **required**)
- `made_by_url` - Url of the person/agency who made this site (`string`; **required**)

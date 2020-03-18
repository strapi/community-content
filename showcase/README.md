![Showcase](/assets/banner-showcase.png)

# Showcase

Show to the community what your Strapi project looks like!

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

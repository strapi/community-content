![](/assets/banner.png)

# Strapi Tutorials

Strapi is very excited to gather a collection of tutorials on the new [Strapi Tutorials page](https://www.strapi.io/tutorials)

## How to add a tutorial

There are different cases for adding a tutorial:

1. You want to list an existing tutorial on the web
   - Create a new branch: `git checkout -b request/<name-of-tutorial>`
   - Create a `<name-of-tutorial>.yml` inside the `tutorials` folder and fill it like the example under
   - Create a pull request
2. You want to add your own tutorial
   - [How to write a tutorial](#how-to-write-a-tutorial)

This one is an example of the Strapi-Gatsby tutorial

```yaml
- title: Building a Static Blog using Gatsby and Strapi
 link: https://blog.strapi.io/building-a-static-website-using-gatsby-and-strapi/
 formats:
   - article
 language: en
 date: 2018-01-18
 authors:
   - David Kartuzinski
 github_authors:
   - davidkartuzinski
 source: 'https://blog.strapi.io/'
 image_url: 'https://blog.strapi.io/content/images/2018/11/gatsby-strapi.png'
 topics:
   - gatsby
   - strapi
   - blog
 version: beta
```

### How to request a tutorial

- Create an issue with the template `Request a tutorial`
- Assign all the necessary labels including the `To do` label

### How to consult tutorials ideas

- Go on the Github repository and consult either the issue or the project

## How to write a tutorial

If you intend to create a tutorial, please check our [guidelines](https://github.com/Mcastres/tutorials/blob/master/GUIDELINES.md) first.

There are different cases:

1. The tutorial hasn't been proposed yet
   - Create an issue with the template `Create a tutorial`
   - Create a new branch: `git checkout -b create/<name-of-tutorial>`
   - Create the tutorial and make a pull request by adding a new folder inside `tutorials` containing the content of your tutorial as well as the `<name-of-tutorial>.yml` file. (the .yml file must be **inside** your new tutorial folder)
   - We will update the issue from **In progress** to **Done**
2. The tutorial is looking for an author (you are doing a proposed tutorial)
   - Create a new branch: `git checkout -b create/<name-of-tutorial>`
   - Create the tutorial and make a pull request by adding a new folder inside `tutorials` containing the content of your tutorial as well as the `<name-of-tutorial>.yml` file. (the .yml file must be **inside** your new tutorial folder)
   - We will update the issue from **Looking for author** to **Done**

**Please follow this format and indentation:**

```yaml
- title: Building a Static Blog using Gatsby and Strapi
 link: https://blog.strapi.io/building-a-static-website-using-gatsby-and-strapi/
 formats:
   - article
 language: en
 date: 2018-01-18
 authors:
   - David Kartuzinski
 github_authors:
   - davidkartuzinski
 source: 'https://blog.strapi.io/'
 image_url: 'https://blog.strapi.io/content/images/2018/11/gatsby-strapi.png'
 topics:
   - gatsby
   - strapi
   - blog
 version: beta
```

- `title` - Title of tutorial (`string`; **required**)
- `link` - Working URL where tutorial can be found (`string`; **required**)
- `formats` - Media format of tutorial (`array` of `strings` with values `video`, `audio` or `article`; **required**)
- `language` - Spoken/written language of the tutorial (`string` with a two-letter [ISO 639-1 language code](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes); optional)
- `date` - Date tutorial was published (`string` in `YYYY-MM-DD` format; optional)
- `authors` - Name of author(s) or speaker(s) (`array` of `strings`; **required**)
- `github_authors` - Github username of author(s) or speaker(s) (`array` of `strings`; optional)
- `source` - Source of the tutorial (`string`; optional)
- `image_url` - Url image of the tutorial (`string`; optional)
- `topics` - Main topic(s) covered by the tutorial (`array` of `strings`; **required**)
- `version` - Version of Strapi used in the tutorial (`string`; require)

## Why write for us?

Here are few things that writing for strapi can do for you:

- Learn while sharing your knowledge. You know how to create an application with Strapi and Nuxt? Pass this knowledge to others!
- Get your name on this repository README
- Get access to a private slack channel `makers`
- Get a custom emoji on our slack channel
- Get some strapi goodies (stickers, cap, t-shirt)

**By making a tutorial for us you participate in the growth of an open source project.**

## Makers

Thank you to all the people who made tutorials for the community!

<p float="left">
  <img src="https://github.com/iam4x.png" width="80" height="80" />
  <img src="https://github.com/ryanbelke.png" width="80" height="80" />
  <img src="https://github.com/bahdcoder.png" width="80" height="80" />
  <img src="https://github.com/john-smilga.png" width="80" height="80" />
  <img src="https://github.com/pappinvijak.png" width="80" height="80" />
  <img src="https://github.com/jlengstorf.png" width="80" height="80" />
  <img src="https://github.com/rpragana.png" width="80" height="80" />
  <img src="https://github.com/pgmichael.png" width="80" height="80" />
  <img src="https://github.com/shahinrostami.png" width="80" height="80" />
  <img src="https://github.com/tamirandtom.png" width="80" height="80" />
  <img src="https://github.com/femithz.png" width="80" height="80" />
  <img src="https://github.com/reedbarger.png" width="80" height="80" />
  <img src="https://github.com/davidkartuzinski.png" width="80" height="80" />
  <img src="https://github.com/pierreburgy.png" width="80" height="80" />
  <img src="https://github.com/mcastres.png" width="80" height="80" />
  <img src="https://github.com/fabio-nettis.png" width="80" height="80" />
</p>

[Join them by creating your tutorial](https://github.com/strapi/strapi-tutorials/issues/new?assignees=Mcastres&labels=In+progress&template=create-a-tutorial.md&title=%5BCREATE%5D)

![Articles](/assets/banner-articles.png)

# Articles

Write about your experience with Strapi.

We're looking for writers who'd like to talk about their experience using Strapi, JAMstack or open source related things. Although we're mostly looking for experienced authors who have already published blog posts on websites such as [Medium](https://medium.com), [Dev.to](http://dev.to/), [Hackernoon](https://hackernoon.com), [Scotch.io](http://scotch.io/) or your personal blog, we're also supportive of people who have never published anything but are interested in writing their first technical piece.

You will definitely pick our interest if you can write articles that go quite in-depth and include a significant number of learning nuggets. We're absolutely NOT looking for promotional pieces or marketing pitches. It's all about interesting things to tell to the community concerning everything that operates in the Strapi environment.

## How to add an article

  - First of all, verify that this article is not already listed. You never know, someone could have done it before you.
  - Edit the `articles.yml` file by adding your submission with the following format:

```yaml
- title: Title of the article
  url: https://medium.com/strapi-single-types
  source: https://medium.com/
  description: Nicely written article explaining how Single Types work
  categories:
    - Feature
  written_by: John smith
  written_by_url: https://john-smith.io
```


- `title` - Title of the article (`string`; **required**)
- `url` - Url of the article (`string`; **required**)
- `source` - Source of the article (`string`; **required**)
- `description` - Little description (`string`; **required**)
- `categories` - Categories of the article (`array` of `strings`; **required**)
- `written_by` - Who wrote this awesome article? (`string`; **required**)
- `written_by_url` - Url of the person/agency who wrote this article (`string`; **required**)

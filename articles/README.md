![Articles](/assets/banner-articles.png)

# Articles

Write about your experience with Strapi.

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

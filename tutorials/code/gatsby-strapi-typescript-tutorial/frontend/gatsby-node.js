'use strict'

const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(
    `
      {
        articles: allStrapiArticle {
          edges {
            node {
              strapiId
            }
          }
        }
        categories: allStrapiCategory {
          edges {
            node {
              strapiId
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog articles pages.
  const articles = result.data.articles.edges
  const categories = result.data.categories.edges

  articles.forEach((article, index) => {
    createPage({
      path: `/article/${article.node.strapiId}`,
      component: require.resolve('./src/templates/article.tsx'),
      context: {
        id: article.node.strapiId
      }
    })
  })

  categories.forEach((category, index) => {
    createPage({
      path: `/category/${category.node.strapiId}`,
      component: require.resolve('./src/templates/category.tsx'),
      context: {
        id: category.node.strapiId
      }
    })
  })
}

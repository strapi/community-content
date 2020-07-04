import React from 'react'
import { graphql } from 'gatsby'

import LayoutRoot from '../components/LayoutRoot'
import ArticlesComponent from '../components/articles'

interface CategoryProps {
  data: {
    articles: {
      edges: Article[]
    }
    category: {
      name: string
    }
  }
}

export const query = graphql`
  query Category($id: Int!) {
    articles: allStrapiArticle(filter: { category: { id: { eq: $id } } }) {
      edges {
        node {
          strapiId
          title
          category {
            name
          }
          image {
            childImageSharp {
              fluid(maxWidth: 595, quality: 100) {
                ...GatsbyImageSharpFluid
                ...GatsbyImageSharpFluidLimitPresentationSize
              }
            }
          }
        }
      }
    }
    category: strapiCategory(strapiId: { eq: $id }) {
      name
    }
  }
`

const Category: React.FC<CategoryProps> = ({ data }) => {
  const articles = data.articles.edges
  const category = data.category.name

  return (
    <LayoutRoot>
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>{category}</h1>
          <ArticlesComponent articles={articles} />
        </div>
      </div>
    </LayoutRoot>
  )
}

export default Category

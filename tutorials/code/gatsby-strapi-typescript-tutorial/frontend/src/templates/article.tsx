import React from 'react'
import { graphql } from 'gatsby'
import Img, { FixedObject } from 'gatsby-image'

import ReactMarkdown from 'react-markdown'

import LayoutRoot from '../components/LayoutRoot'

interface ArticleProps {
  data: {
    strapiArticle: {
      image: {
        childImageSharp: {
          fixed: FixedObject
        }
      }
      title: string
      content: string
    }
  }
}

export const query = graphql`
  query ArticleQuery($id: Int!) {
    strapiArticle(strapiId: { eq: $id }) {
      strapiId
      title
      content
      published_at
      image {
        childImageSharp {
          fixed(width: 660) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  }
`

const Article: React.FC<ArticleProps> = ({ data }) => {
  const article = data.strapiArticle
  return (
    <LayoutRoot>
      <div>
        <div
          id="banner"
          className="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding uk-margin"
        >
          <Img className="banner-bg" fixed={article.image.childImageSharp.fixed} />
          <h1 className="uk-position-z-index">{article.title}</h1>
        </div>

        <div className="uk-section">
          <div className="uk-container uk-container-small">
            <ReactMarkdown source={article.content} />
          </div>
        </div>
      </div>
    </LayoutRoot>
  )
}

export default Article

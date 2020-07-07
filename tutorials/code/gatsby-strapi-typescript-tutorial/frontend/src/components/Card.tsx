import React from 'react'
import { Link } from 'gatsby'
import Img, { FixedObject } from 'gatsby-image'

interface ArticleProps {
  article: Article
}

const Card: React.FC<ArticleProps> = ({ article }) => {
  return (
    <Link to={`/article/${article.node.strapiId}`} className="uk-link-reset">
      <div className="uk-card uk-card-muted">
        <div className="uk-card-media-top">
          <Img fluid={article.node.image.childImageSharp.fluid} />
        </div>
        <div className="uk-card-body">
          <p id="category" className="uk-text-uppercase">
            {article.node.category.name}
          </p>
          <p id="title" className="uk-text-large">
            {article.node.title}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default Card

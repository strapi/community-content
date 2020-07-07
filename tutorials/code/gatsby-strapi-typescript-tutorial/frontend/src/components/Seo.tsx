import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { useStaticQuery, StaticQuery, graphql } from 'gatsby'

interface StaticQueryProps {
  site: {
    siteMetadata: {
      title: string
      description: string
      author: string
      keywords: string
    }
  }
}

interface Props {
  readonly title?: string
  readonly children?: React.ReactNode
}

const SEO: React.FC<Props> = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SeoQuery {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `}
    render={(data: StaticQueryProps) => (
      <Helmet
        htmlAttributes={{
          lang: `en`
        }}
        title={data.site.siteMetadata.title}
        titleTemplate={`%s | ${data.site.siteMetadata.title}`}
        link={[
          {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css?family=Staatliches'
          },
          {
            rel: 'stylesheet',
            href: 'https://cdn.jsdelivr.net/npm/uikit@3.2.3/dist/css/uikit.min.css'
          }
        ]}
        script={[
          {
            src: 'https://cdnjs.cloudflare.com/ajax/libs/uikit/3.2.0/js/uikit.min.js'
          },
          {
            src: 'https://cdn.jsdelivr.net/npm/uikit@3.2.3/dist/js/uikit-icons.min.js'
          },
          {
            src: 'https://cdnjs.cloudflare.com/ajax/libs/uikit/3.2.0/js/uikit.js'
          }
        ]}
        meta={[
          {
            name: `description`,
            content: data.site.siteMetadata.description
          },
          {
            property: `og:title`,
            content: data.site.siteMetadata.title
          },
          {
            property: `og:description`,
            content: data.site.siteMetadata.description
          },
          {
            property: `og:type`,
            content: `website`
          },
          {
            name: `twitter:card`,
            content: `summary`
          },
          {
            name: `twitter:creator`,
            content: 'kilinkis'
          },
          {
            name: `twitter:title`,
            content: data.site.siteMetadata.title
          },
          {
            name: `twitter:description`,
            content: data.site.siteMetadata.description
          }
        ]}
      />
    )}
  />
)

export default SEO

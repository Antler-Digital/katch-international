import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ description, lang, meta, path, title, metaImage, article, twitterUsername }) {
  const { site, contentfulSite} = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
          }
        }
        contentfulSite: contentfulSiteSettings(contentful_id: {eq: "2qyIV95SHuSmul974kg5VR"}) {
          siteDescription {
            text: siteDescription
          }
          siteName
          siteImage {
            gatsbyImageData(
              height: 600
              width: 1200
              layout: FIXED
              cropFocus: CENTER
              resizingBehavior: FILL
            )
          }
        }
      }
    `
  )
  const metaDescription = description || contentfulSite?.siteDescription?.text || site.siteMetadata.description
  // const metaImage = `${site.siteMetadata.siteUrl}${image ? `${image}` : logo }` // placeholder logo here
  const metaTitle = title ? `${title} | ${contentfulSite.siteName}` : contentfulSite.siteName

  const metaImageRender = metaImage ? `${metaImage}` : `${contentfulSite?.siteImage?.gatsbyImageData?.images.fallback?.src}` // placeholder logo here 

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
    >
      <noscript>Your browser does not support JavaScript! A London List works best with javascript ( and by best only ). </noscript>

      <meta name="description" content={metaDescription} />
      <meta name="google-site-verification" content="PD6tyitBu8QELW0ECvtmf5SyAecUyD7DBnuucSsr3gk" />
      <meta name="image" content={metaImageRender} />
      <link rel="canonical" href={`${site.siteMetadata.siteUrl}${path ?? ''}`} />
      {/* Facebook */}
      <meta property="og:url" content={`${site.siteMetadata.siteUrl}${path && `${path}`}`} />
      <meta property="og:type" content={article ? `article` : `website`} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImageRender} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={`${site.siteMetadata.siteUrl}${path && `${path}`}`} />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImageRender} />

      {twitterUsername && (
        <meta name="twitter:creator" content={twitterUsername} />
      )}

      <meta charSet="UTF-8" />
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO

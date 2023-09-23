function getEnv() {
  switch (process.env.NODE_ENV) {
    case "dev":
      return "development"
    case "development":
      return "development"
    case "prod":
      return "production"
    default:
      return process.env.NODE_ENV
  }
}

require("dotenv").config({
  path: `.env.${getEnv()}`,
})

let contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  // Learn about environment variables: https://gatsby.dev/env-vars
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  host: "cdn.contentful.com"
}
// handle the preview environments
if (process.env.CONTENTFUL_HOST) {
  contentfulConfig.host = "preview.contentful.com"
  contentfulConfig.accessToken = process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
}

console.log(contentfulConfig)
console.log(process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN)

module.exports = {
  flags: {
    DEV_SRR: true,
  },
  siteMetadata: {
    title: `Katch`,
    description: `Maximize your brand's visibility in the GCC with the help of our award-winning PR firm based in Dubai. Our services include press relations, social media strategy, and creative design to get you noticed.`,
    author: `Sam Loyd`,
    siteUrl: "https://katchinternational.com",
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          "G-18WB6K7M09", // Google Analytics / GA
          "AW-941166757", // Google Ads / Adwords / AW
          "G-EBGLW844WN",
          'GTM-MGZBGFJ3'
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          optimize_id: "OPT_CONTAINER_ID",
          anonymize_ip: true,
          cookie_expires: 0,
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: true,
        },
      },
    },
    // {
    //   resolve: `gatsby-source-instagram`,
    //   options: {
    //     username: !isDev ? `1450358585` : "",
    //     access_token: process.env.INSTAGRAM_ACCESS_TOKEN,
    //     instagram_id: "17841401637572661",
    //     paginate: 100,
    //     maxPosts: 1000,
    //     hashtags: false
    //   },
    // },
    "gatsby-plugin-image",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-fontawesome-css`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: "gatsby-plugin-anchor-links",
      // If you want to add options
      // options: {
      //   offset: -50
      // }
    },
    {
      resolve: `gatsby-plugin-postcss`,
    },
    {
      resolve: "gatsby-plugin-hubspot",
      options: {
        trackingCode: "4292192",
        respectDNT: true,
        productionOnly: true,
      },
    },
    // Uncomment to add in contentful
    {
      resolve: `gatsby-source-contentful`,
      options: contentfulConfig,
    },
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          "@src": "src",
          "@components": "src/components",
          "@elements": "src/components/elements",
        },
        extensions: ["js"],
      },
    },
    "gatsby-plugin-readingtime-contentful",
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            {
              family: "Open Sans",
              variants: ["300", "400", "600", "700"],
            },
            {
              family: "Fjalla One",
              variants: ["400"],
            },
          ],
        },
      },
    },

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    `gatsby-plugin-sitemap`,
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        env: {
          host: "https://katchinternational.com",
          production: {
            sitemap: "https://katchinternational.com/sitemap.xml",
            policy: [{ userAgent: "*" }],
          },
          // 'branch-deploy': {
          //   policy: [{ userAgent: '*', disallow: ['/'] }],
          //   sitemap: null,
          //   host: null
          // },
          // 'deploy-preview': {
          //   policy: [{ userAgent: '*', disallow: ['/'] }],
          //   sitemap: null,
          //   host: null
          // }
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `katch-international `,
        short_name: `katch`,
        start_url: `/`,
        background_color: `#000000`,
        theme_color: `#FA064A`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
  ],
}

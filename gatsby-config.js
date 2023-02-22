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

// Handles removing the robot crawlers from Netlify preview domains and improves SEO
const {
  NODE_ENV,
  URL: NETLIFY_SITE_URL = 'https://katchinternational.com',
  DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
  CONTEXT: NETLIFY_ENV = NODE_ENV
} = process.env;
const isNetlifyProduction = NETLIFY_ENV === 'production';
const siteUrl = isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL;
const isDev = getEnv() !== 'production'

let contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  // Learn about environment variables: https://gatsby.dev/env-vars
  accessToken: process.env.NODE_ENV === 'production' ? process.env.CONTENTFUL_ACCESS_TOKEN : process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN,
  host: process.env.NODE_ENV === 'production' ? 'cdn.contentful.com' : 'preview.contentful.com',
}
// handle the preview environments
if (process.env.CONTENTFUL_HOST) {
  contentfulConfig.host = 'preview.contentful.com';
  contentfulConfig.accessToken = process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN;
}

module.exports = {
  siteMetadata: {
    title: `Katch`,
    description: `Maximize your brand's visibility in the GCC with the help of our award-winning PR firm based in Dubai. Our services include press relations, social media strategy, and creative design to get you noticed.`,
    author: `Sam Loyd`,
    siteUrl: 'https://katchinternational.com'
  },
  plugins: [

    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "UA-128392128-1",

        // Include GTM in development.
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: false,
        defaultDataLayer: { platform: "gatsby" },
      },
    },

    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: { 
    //     // AW-941166757 - gTag
    //     // UA-128392128-1 - GA
    //     trackingId: "UA-128392128-1", // add your own tracking code
    //     // this option places the tracking script into the head of the DOM
    //     head: true,
    //     // other options
    //   },
    // },
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
    'gatsby-plugin-image',
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
      resolve: `gatsby-plugin-postcss`
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
      options: contentfulConfig
    },
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          "@src": "src",
          "@components": "src/components",
          "@elements": "src/components/elements",
        },
        extensions: [
          "js",
        ],
      }
    },
    'gatsby-plugin-readingtime-contentful',
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
      resolve: 'gatsby-plugin-sitemap',
      options: {
        path: '/',
      }
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        env: {
          host: 'https://katchinternational.com',
          production: {
            policy: [{ userAgent: '*' }]
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
        }
      }
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
    {
      resolve: `gatsby-plugin-gatsby-cloud`,
      options: {
        // headers: {}, // option to add more headers. `Link` headers are transformed by the below criteria
        // allPageHeaders: [], // option to add headers for all pages. `Link` headers are transformed by the below criteria
        // mergeSecurityHeaders: true, // boolean to turn off the default security headers
        // mergeLinkHeaders: true, // boolean to turn off the default gatsby js headers
        // mergeCachingHeaders: true, // boolean to turn off the default caching headers
        // transformHeaders: (headers, path) => headers, // optional transform for manipulating headers under each path (e.g.sorting), etc.
        // generateMatchPathRewrites: true, // boolean to turn off automatic creation of redirect rules for client only paths
      },
    },
  ],
}

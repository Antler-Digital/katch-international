const path = require(`path`);
const { slash } = require(`gatsby-core-utils`);


exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  // Handles the lack of Instagram Node
  // make sure to 'implements' Node in order to solve any sorting or limit issues
  const typeDefs = `
    type InstaNode implements Node {
      id: ID!
      parent: Node
      children: [Node!]!
      internal: Internal!
      type: String
      username: String
      likes: Int
      caption: String
      thumbnails: [InstaNodeThumbnails]
      mediaType: String
      preview: String
      original: String
      timestamp: Int
      dimensions: InstaNodeDimensions
      comments: Int
      localFile: File
    }

    type InstaNodeThumbnails {
      src: String
      config_width: Int
      config_height: Int
    }

    type InstaNodeDimensions {
      height: Int
      width: Int
    }
  `
  createTypes(typeDefs)
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;


  const PageTemplate = path.resolve(`./src/templates/PageTemplate.js`)
  const CaseStudyTemplate = path.resolve(`./src/templates/CaseStudyTemplate.js`)
  const BlogPostTemplate = path.resolve(`./src/templates/BlogPostTemplate.js`)

  try {

    const pages = await graphql(`
    query Pages {
      allContentfulPage {
        nodes {
          slug
          contentful_id
        }
      }
    }
  `).then((result) => {
      result.data.allContentfulPage.nodes.forEach(({ slug, contentful_id }) => {

        if (slug !== "/") {
          createPage({
            path: slug,
            component: slash(PageTemplate),
            context: {
              id: contentful_id,
              slug
            },
          });
        }

      });
    });
  } catch (e) {
    console.log("Error trying to create pages", e)
  }

  try {

    const caseStudies = await graphql(`
    query CaseStudies {
      allContentfulCaseStudy {
        nodes {
          slug
          contentful_id
        }
      }
    }
  `).then((result) => {
      result.data.allContentfulCaseStudy.nodes.forEach(({ slug, contentful_id }) => {

        createPage({
          path: `projects/${slug}`,
          component: slash(CaseStudyTemplate),
          context: {
            id: contentful_id,
            slug
          },
        });
      });
    });
  } catch (e) {
    console.log("Error trying to create case studies", e)
  }

  // blog posts
  try {
    const blogPosts = await graphql(`
    query BlogPosts {
      allContentfulBlogPost {
        nodes {
          slug
          contentful_id
        }
      }
    }
  `).then((result) => {
      result.data.allContentfulBlogPost.nodes.forEach(({ slug, contentful_id }) => {
        createPage({
          path: `blog/${slug}`,
          component: slash(BlogPostTemplate),
          context: {
            id: contentful_id,
            slug
          },
        });
      });
    });
  } catch (e) {
    console.log("Error trying to create case studies", e)
  }
}
// second instance to avoid having to use ES6 syntax in one file and node syntax (module.exports) in another
function slugify(string) {
  const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
  const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
  const p = new RegExp(a.split('').join('|'), 'g')

  return string.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w-]+/g, '') // Remove all non-word characters
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}

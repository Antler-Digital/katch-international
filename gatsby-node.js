const path = require(`path`);
const { slash } = require(`gatsby-core-utils`);


exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;


  // Testing for Comeet
  const pageTemplate = path.resolve(`./src/templates/PageTemplate.js`)

  try {

    const result = await graphql(`
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
        console.log("Creating page")
        createPage({
          path: slug,
          component: slash(pageTemplate),
          context: {
            contentful_id,
            slug
          },
        });
      });
    });
  } catch (e) {
    console.log("Error trying to create pages", e)
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

const path = require(`path`);
const fs =require('fs');

// gatsby-node.js
exports.onPreBootstrap = ({ actions }) => {
  // read _redirects
  // call createRedirect for each

  const redirects = fs.readFileSync("./static/_redirects").toString()

  for (const line of redirects.split("\n")) {
    if (line.trim().length > 0) {
      // found a redirect
      const [fromPath, toPath] = line.trim().split(/\s+/)
      actions.createRedirect({
        fromPath,
        toPath,
      })
    }
  }

  console.log(`create redirects from _redirects`)
}


// exports.createSchemaCustomization = ({ actions }) => {
//   const { createTypes } = actions
//   // Handles the lack of Instagram Node
//   // make sure to 'implements' Node in order to solve any sorting or limit issues
//   const typeDefs = `
//     type InstaNode implements Node {
//       id: ID!
//       parent: Node
//       children: [Node!]!
//       internal: Internal!
//       type: String
//       username: String
//       likes: Int
//       caption: String
//       thumbnails: [InstaNodeThumbnails]
//       mediaType: String
//       preview: String
//       original: String
//       timestamp: Int
//       dimensions: InstaNodeDimensions
//       comments: Int
//       localFile: File
//     }

//     type InstaNodeThumbnails {
//       src: String
//       config_width: Int
//       config_height: Int
//     }

//     type InstaNodeDimensions {
//       height: Int
//       width: Int
//     }
//   `
//   createTypes(typeDefs)
// }

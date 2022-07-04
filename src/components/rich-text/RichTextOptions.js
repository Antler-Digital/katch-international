import React from "react"

// To Do: update Rich Text to new form
// https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-source-contentful/CHANGELOG.md#400-next0-2020-11-09

import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types"
import Linked from "../elements/Linked"

const RichTextOptions = {
  // renderMark: {
  //   [MARKS.BOLD]: text => <span className="font-bold">{text}</span>,
  //   [MARKS.CODE]: text => <pre className="text-gray-600 bg-gray-300 px-2 py-1 rounded mb-0" style={{ fontFamily: 'monospace' }}>  {text}</pre>,
  // },
  renderNode: {
    // [BLOCKS.HEADING_1]: (node, children) => <h2>{children}</h2>,
    // [BLOCKS.HEADING_2]: (node, children) => <h3>{children}</h3>,
    // [BLOCKS.HEADING_3]: (node, children) => <h4>{children}</h4>,
    [BLOCKS.PARAGRAPH]: (node, children) => (
      <p className="font-sans my-4">{children}</p>
    ),
    // [BLOCKS.QUOTE]: (node, children) => <Quote>{children}</Quote>,
    // [BLOCKS.HR]: () => <Hr />,
    // [BLOCKS.LIST_ITEM]: (node, children) => <li className="md:pl-2">{children}</li>,
    // [BLOCKS.UL_LIST]: (node, children) => <ul className="list-disc  ">{children}</ul>,
    [BLOCKS.OL_LIST]: (node, children) => <ol className="list-">{children}</ol>,
    [INLINES.HYPERLINK]: (node, children) => {
      const cleanLink = node.data.uri.replace(
        /https?:\/\/katchinternational.com/,
        ""
      )
      return (
        <Linked linkTo={cleanLink} className="hover:text-secondary">
          {children}
        </Linked>
      )
    },
    // [INLINES.EMBEDDED_ENTRY]: (node, children) => {

    //   console.log(node)
    //   // if (node.data.target.sys.contentType.sys.contentful_id === "inlinePostPhoto") {
    //   //   // This stupid object for determining if there is an image at the end
    //   //   if (node.data.target.fields.photo["en-US"].fields.file["en-US"].contentType.includes('image')) {
    //   //     const image = node.data.target.fields.photo["en-US"].fields.file["en-US"]
    //   //     return <RichInlineImage image={image} className="max-w-3xl my-8 mx-auto" />
    //   //   }

    //   // }
    // },
  },
}

export default RichTextOptions

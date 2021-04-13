import React from 'react'



// To Do: update Rich Text to new form 
// https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-source-contentful/CHANGELOG.md#400-next0-2020-11-09


import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types"


const RichTextOptions = {
  // renderMark: {
  //   [MARKS.BOLD]: text => <span className="font-bold">{text}</span>,
  //   [MARKS.CODE]: text => <pre className="text-gray-600 bg-gray-300 px-2 py-1 rounded mb-0" style={{ fontFamily: 'monospace' }}>  {text}</pre>,
  // },
  renderNode: {
    // [BLOCKS.HEADING_1]: (node, children) => <h2>{children}</h2>,
    // [BLOCKS.HEADING_2]: (node, children) => <h3>{children}</h3>,
    // [BLOCKS.HEADING_3]: (node, children) => <h4>{children}</h4>,
    [BLOCKS.PARAGRAPH]: (node, children) => <p className="font-sans">{children}</p>,
    // [BLOCKS.QUOTE]: (node, children) => <Quote>{children}</Quote>,
    // [BLOCKS.HR]: () => <Hr />,
    // [BLOCKS.LIST_ITEM]: (node, children) => <li className="md:pl-2">{children}</li>,
    // [BLOCKS.UL_LIST]: (node, children) => <ul className="list-disc  ">{children}</ul>,
    [BLOCKS.OL_LIST]: (node, children) => <ol className="list-">{children}</ol>,
    // [BLOCKS.EMBEDDED_ENTRY]: (node) => {

    //   const photo = node.data.target.fields.photo || false
    //   const isInlinePhoto = node.data.target.sys.contentType.sys.contentful_id === "inlinePostPhoto" || false
    //   const isPost = node.data.target.sys.contentType.sys.contentful_id === "post" || false
    //   if (isInlinePhoto) {
    //     const image = photo["en-US"].fields.file["en-US"]
    //     const alt = photo["en-US"].fields?.title?.["en-US"]
    //     return <RichInlineImage image={image} alt={alt || false} className="max-w-3xl mx-auto " />
    //   }

    //   if (isPost) {
    //     return <RichInlinePost node={node} />
    //   }
    //   return ""

    // },
    // [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
    //   if (!node.data.target || !node.data.target.fields.file) return ""
    //   if (node.data.target.fields.file["en-US"].contentType.includes('image')) {
    //     const image = node.data.target.fields.file['en-US']
    //     const alt = node.data.target.fields?.title?.["en-US"]
    //     return <RichInlineImage image={image} alt={alt} />
    //   }
    // },
    // [INLINES.HYPERLINK]: (node, children) => <LinkTo linkTo={node.data.uri} className="text-highlight underline">{children} </LinkTo>,
    // [INLINES.EMBEDDED_ENTRY]: (node, children) => {
    //   if (node.data.target.sys.contentType.sys.contentful_id === "inlinePostPhoto") {
    //     // This stupid object for determining if there is an image at the end
    //     if (node.data.target.fields.photo["en-US"].fields.file["en-US"].contentType.includes('image')) {
    //       const image = node.data.target.fields.photo["en-US"].fields.file["en-US"]
    //       return <RichInlineImage image={image} className="max-w-3xl my-8 mx-auto" />
    //     }


    //   }
    // },
  },
}

export default RichTextOptions
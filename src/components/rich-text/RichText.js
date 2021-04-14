import React from 'react'



// To Do: update Rich Text to new form 
// https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-source-contentful/CHANGELOG.md#400-next0-2020-11-09


import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import LinkTo from '../components/LinkTo'
import { RichInlineImage, RichInlinePost, Hr, Quote } from './Components'
import RichTextOptions from './RichTextOptions';

const RichText = React.forwardRef(({ text, className }, ref) => (
  <div ref={ref} className={className}>
    {documentToReactComponents(text, RichTextOptions)}
  </div>
))

export default RichText


import { graphql } from 'gatsby';
import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image';
import Markdown from 'markdown-to-jsx';
import CallToAction from './CallToAction';

function Slide({ body, header, image, callToAction }) {
  return (
    <section className="min-h-600 relative">
      <GatsbyImage className="min-h-600 h-screen" image={image.gatsbyImageData} alt={image.title} />
      <div className="w-full h-full absolute top-0">
        <div className="w-full md:w-1/2 xl:w-1/3 md:ml-auto text-white flex h-full items-center justify-center text-center md:text-left md:justify-start">
          <div className="max-w-sm">
            {header && <h2>{header}</h2>}
            {body && <Markdown
              options={{
                overrides: {
                  strong: {
                    props: {
                      className: 'p-2 bg-secondary',
                    },
                  },
                  h2: {
                    props: {
                      className: 'text-5xl leading-relaxed',
                    },
                  },
                },
              }}
            >{body.body}</Markdown>}
            {callToAction && <CallToAction {...callToAction} />}
          </div>

        </div>
      </div>
    </section>
  )
}
export default Slide

export const ContentfulSlideFragment = graphql`
fragment ContentfulSlideFragment on ContentfulSlide {
  image {
    title
    gatsbyImageData(
      width: 1600
      placeholder: BLURRED
      quality: 90
      layout: FULL_WIDTH
    )
  }
  id
  header
  body {
    body
  }
  callToAction {
    displayAs
    linkTo
    text
  }
}

`
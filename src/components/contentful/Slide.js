import { graphql } from "gatsby"
import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import Markdown from "markdown-to-jsx"
import CallToAction from "./CallToAction"

function Slide({ body, header, image, callToAction }) {
  const [state, setState] = React.useState(false)
  React.useEffect(() => {
    !state && setState(true)
  }, [])

  const isLogo = image?.title === "katch-on-black"
  return (
    <section className="relative min-h-600">
      {image?.gatsbyImageData && !isLogo && (
        <GatsbyImage
          className="h-screen min-h-600"
          image={image.gatsbyImageData}
          alt={image.title}
        />
      )}
      {isLogo && image?.gatsbyImageData && (
        <div className="flex items-center justify-center w-full h-screen px-10 bg-black">
          <GatsbyImage
            className="w-full min-h-[100px] relative"
            image={image.gatsbyImageData}
            alt={image.title}
          />
        </div>
      )}
      <div className="absolute top-0 w-full h-full z-front">
        <div
          data-aos="fade-in"
          className="flex items-center justify-center w-full h-full px-4 text-center text-white lg:w-1/2 xl:w-1/3 lg:ml-40 lg:justify-start lg:px-0"
        >
          <div className="flex flex-col max-w-sm px-8 space-y-8 md:max-w-lg">
            {header && <h2 className="text-center">{header}</h2>}
            {body && (
              <Markdown
                options={{
                  overrides: {
                    strong: {
                      props: {
                        className: "p-2 bg-secondary",
                      },
                    },
                    h2: {
                      props: {
                        className: "text-5xl leading-relaxed",
                      },
                    },
                  },
                }}
              >
                {body.body}
              </Markdown>
            )}
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
    internal {
      type
    }
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

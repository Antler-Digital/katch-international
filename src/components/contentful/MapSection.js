import React from 'react'
import { graphql } from 'gatsby';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import RichTextOptions from '../rich-text/RichTextOptions';
const MapSection = ({ address, location }) => {

const dubaiSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3613.0699643501157!2d55.17498211546862!3d25.099492883941732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6b7747548917%3A0xe3bfb5f0bd4ed25!2sTameem+House+Office+Building+-+C008-014+-+Dubai!5e0!3m2!1sen!2sae!4v1546959312230"

const londonSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d565.6053321585733!2d-0.1851498313410247!3d51.47529826403259!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDI4JzMwLjciTiAwwrAxMScwNC4wIlc!5e0!3m2!1sen!2suk!4v1624268459520!5m2!1sen!2suk"

  return (
    <section className="bg-black">

      <div className="mx-auto px-4 max-w-screen-xl prose prose-white flex flex-wrap items-center">
      <iframe
        loading="lazy"
        title={`Google map Showing the location of the ${location === "London" ? "London" : "Dubai"} office`}
        className="w-full md:w-2/5 xl:w-1/2"
        src={location === "London" ? londonSrc : dubaiSrc } style={{ border: 0 }}
        allowFullScreen={false}
        height="250"
        frameBorder="0"
      />

      <div className="highlight-links prose-xl prose-pink py-4 w-full md:w-3/5 xl:w-1/2 md:pl-8">
        { renderRichText(address, RichTextOptions)}
      </div>
      </div>
   
    </section>
  )
}
export default MapSection

export const ContentfulMapSectionFragment = graphql`
fragment ContentfulMapSectionFragment on ContentfulMapSection {
  address {
    raw
  }
  location
  internal {
      type
    }
}

`
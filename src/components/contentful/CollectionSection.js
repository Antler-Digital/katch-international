import React from 'react'
import { graphql } from 'gatsby';

function CollectionSection() {
  return (
    <div>
      Collection Section
    </div>
  )
}

export default CollectionSection


export const ContentfulCollectionSectionFragment = graphql`
  fragment ContentfulCollectionSectionFragment on ContentfulCollectionSection {
    id
    internal {
      type
    }
    header
    contentfulid
    postType
    showAll
    totalToShow
  }

`
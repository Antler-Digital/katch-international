import React from 'react'
import { graphql } from 'gatsby';

function ThreeCardsSection() {
  return (
    <div>
      ThreeCards
    </div>
  )
}

export default ThreeCardsSection


export const ContentfulThreeCardsSectionFragment = graphql`
  fragment ContentfulThreeCardsSectionFragment on ContentfulThreeCardsSection {
    id
    name
    internal {
      type
    }
    cards {
      ...ContentfulServiceCardFragment
    }
  }

`
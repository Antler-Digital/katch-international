import React from 'react'
import { graphql } from 'gatsby';
import { LinkedServiceCard } from './ServiceCard';


function ThreeCardsSection({ cards }) {
  return (
    <section className="grid grid-cols-2 lg:grid-cols-3" >
      { cards && cards.map(card => <LinkedServiceCard key={card.id} {...card} />)}
    </section>
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
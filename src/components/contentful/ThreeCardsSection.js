import React from 'react'
import { graphql } from 'gatsby';
import { LinkedServiceCard } from './ServiceCard';
import useOnScreen from '../../hooks/useOnScreen';


function ThreeCardsSection({ cards }) {
  const sectionRef = React.useRef(null);
  const onScreen = useOnScreen(sectionRef)
  
  React.useEffect(() => {
    if (onScreen) {
      console.log('on screen')
    } else {
      console.log('off screen')
    }
  }, [onScreen])
  return (
    <section ref={sectionRef} className="grid grid-cols-1 grid-row-1 sm:grid-cols-2 lg:grid-cols-3 max-w-screen-2xl mx-auto snap-start" >
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
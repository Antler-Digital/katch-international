import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'

const CaseStudySlide = (
  {
    title, 
    sqrImage,
    slug,
    isActive
  }
) => {
  return (
    <article className={`${isActive ? ' scale-[110%]' : 'scale-90'} relative transform h-full  transition-all duration-500 flex flex-col items-center`}>
      <GatsbyImage className='min-h-[500px] aspect-1 w-full' alt={sqrImage.title} image={sqrImage.gatsbyImageData} />
      <h3 className='absolute bottom-16 w-full px-6 text-white leading-tight text-7xl uppercase'>{title}</h3>
      { isActive && <Link to={`/project/${slug}`} className="bg-secondary text-white block absolute bottom-5 w-4/5 px-4 font-thin py-1 uppercase">Read more</Link>}
    </article> 
  )
}

export default CaseStudySlide
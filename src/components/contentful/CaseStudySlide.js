import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { AnimatePresence, motion } from "framer-motion"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"

const CaseStudySlide = ({ title, sqrImage, slug, isActive }) => {
  return (
    <article
      className={`${
        isActive ? " scale-[110%]" : "scale-90"
      } relative transform h-full  transition-all duration-500 flex flex-col items-center`}
    >
      <GatsbyImage
        className="min-h-[500px] aspect-1 w-full"
        alt={sqrImage.title}
        image={sqrImage.gatsbyImageData}
      />
      <h3 className="absolute bottom-20 w-full px-4 text-white leading-tight text-3xl lg:text-6xl uppercase">
        {title}
      </h3>
      <AnimatePresence>
        {isActive && (
          <motion.div
            key={"link" + title + slug}
            className="bg-secondary w-full text-white block absolute font-thin px-4 py-1 group hover:bg-opacity-80 uppercase"
            animate={{ opacity: 1, bottom: 22, transition: { duration: 0.5 } }}
            initial={{ opacity: 0, bottom: -40 }}
            exit={{ opacity: 0, bottom: -40 }}
          >
            <Link
              to={`/project/${slug}`}
              className="flex justify-between items-center"
            >
              Read more
              <FontAwesomeIcon
                className="group-hover:opacity-100 opacity-0 right-10 duration-500 group-hover:right-0 relative"
                icon={faArrowRight}
              />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  )
}

export default CaseStudySlide

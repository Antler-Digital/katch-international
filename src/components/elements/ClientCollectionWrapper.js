import React from "react"
import { motion } from "framer-motion"
import ClientCarousel from "./ClientCarousel"
import ClientViewAll from "./ClientViewAll"

const containerVariants = {
  whileHover: {},
  whileBlur: {},
}

const ClientCollectionWrapper = ({
  className,
  items,
  order,
  limitTo = 1,
  CardComponent,
}) => {
  const [isHover, setIsHover] = React.useState(false)
  const [showAll, setShowAll] = React.useState(false)

  const itemsToRender = limitTo ? items.slice(0, limitTo) : items

  const ordered = itemsToRender.filter((item) => item.showAtTop)
  const rest = itemsToRender.filter((item) => !item.showAtTop)

  const arrayToRender = [...ordered, ...rest]

  return (
    <div className="flex justify-center">
      <motion.div
        variants={containerVariants}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="flex flex-col items-center justify-center"
      >
        <div className="flex items-center justify-center group w-screen lg:w-fit">
          <ClientCarousel
            arrayToRender={arrayToRender}
            isHover={isHover}
            CardComponent={CardComponent}
            showAll={showAll}
          />
        </div>

        <ClientViewAll
          arrayToRender={arrayToRender}
          CardComponent={CardComponent}
          showAll={showAll}
        />
        <button type="button" onClick={() => setShowAll((prev) => !prev)}>
          {showAll ? "Hide" : "View All"}
        </button>
      </motion.div>
    </div>
  )
}

export default ClientCollectionWrapper

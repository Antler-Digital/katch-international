import React from "react"
import { motion } from "framer-motion"

const containerVariants = {
  show: {
    height: "fit-content",
    transition: {
      staggerChildren: 0.05,
    },
  },
  hide: {
    height: 0,
  },
}

const elementVariants = {
  show: {
    opacity: 1,
    y: 0,
  },
  hide: {
    opacity: 0,
    y: 100,
  },
}

const ClientViewAll = ({ arrayToRender, CardComponent, showAll }) => {
  const items = [
    ...arrayToRender.slice(9, 45),
    ...arrayToRender.slice(9 * 3 * 3),
  ]

  return (
    <motion.div
      className="flex flex-wrap justify-center max-w-[288px] sm:max-w-[576px] lg:max-w-[864px] overflow-hidden"
      variants={containerVariants}
      initial={{ height: 0 }}
      animate={showAll ? "show" : "hide"}
    >
      {items &&
        items.map((item, index) => {
          return (
            <motion.div className="h-24 w-24" variants={elementVariants}>
              <CardComponent key={item.id} {...item} />
            </motion.div>
          )
        })}
    </motion.div>
  )
}

export default ClientViewAll

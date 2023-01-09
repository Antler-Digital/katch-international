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
    <>
      <div className="hidden sm:block">
        <motion.div
          className="flex flex-wrap justify-center max-w-[288px] sm:max-w-[576px] lg:max-w-[864px] overflow-hidden"
          variants={containerVariants}
          initial={{ height: 0 }}
          animate={showAll ? "show" : "hide"}
        >
          {items &&
            items.map((item, index) => {
              return (
                <motion.div
                  key={item.id}
                  className="h-24 w-24 flex items-center justify-center px-3"
                  variants={elementVariants}
                >
                  <CardComponent {...item} />
                </motion.div>
              )
            })}
        </motion.div>
      </div>
      <div className="block sm:hidden">
        <motion.div
          className="grid grid-cols-4 sm:hidden"
          variants={containerVariants}
          initial={{ height: 0 }}
          animate={showAll ? "show" : "hide"}
        >
          {arrayToRender &&
            arrayToRender.slice(24).map((item, index) => {
              return (
                <motion.div
                  key={item.id}
                  className="h-20 w-20 px-3 "
                  variants={elementVariants}
                >
                  <CardComponent {...item} />
                </motion.div>
              )
            })}
        </motion.div>
      </div>
    </>
  )
}

export default ClientViewAll

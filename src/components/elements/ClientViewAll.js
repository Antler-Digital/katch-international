import React from "react"
import { motion } from "framer-motion"

const containerVariants = (display) => ({
  show: {
    display,
    height: "fit-content",
    transition: {
      staggerChildren: 0.05,
    },
  },
  hide: {
    height: 0,
  },
})

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
  const items = [...arrayToRender.slice(9, 9 * 3), ...arrayToRender.slice(36)]

  return (
    <>
      <div className="hidden sm:block">
        <motion.div
          className="flex flex-wrap justify-center max-w-[288px] sm:max-w-[576px] lg:max-w-[864px] overflow-hidden"
          variants={containerVariants("flex")}
          initial={{ height: 0 }}
          animate={showAll ? "show" : "hide"}
        >
          {items &&
            items.map((item) => {
              return (
                <motion.div
                  key={item.id}
                  className="flex items-center justify-center w-24 h-24 px-3"
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
          variants={containerVariants("grid")}
          initial={{ height: 0 }}
          animate={showAll ? "show" : "hide"}
        >
          {arrayToRender &&
            arrayToRender?.slice(24).map((item, index) => {
              return (
                <motion.div
                  key={item.id}
                  className="w-20 h-20 px-3 "
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

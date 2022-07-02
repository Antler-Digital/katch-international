import React from "react"
import { motion } from "framer-motion"
import LeftChevron from "../svgs/LeftChevron"
import RightChevron from "../svgs/RightChevron"

const containerVariants = {
  whileHover: {},
  whileBlur: {},
}

const keyframesEven = [
  ["0%", -2 * (100 / 3) + "%"],
  [-1 * (100 / 3) + "%", -2 * (100 / 3) + "%", -1 * (100 / 3) + "%", "0%"],
  [-2 * (100 / 3) + "%", -1 * (100 / 3) + "%", "0%"],
]

const keyframesOdd = [
  [-2 * (100 / 3) + "%", "0%"],
  [-1 * (100 / 3) + "%", "0%", -1 * (100 / 3) + "%", -2 * (100 / 3) + "%"],
  ["0%", -1 * (100 / 3) + "%", -2 * (100 / 3) + "%"],
]

const evenCollectionVariants = {
  whileHover: (index) => ({
    x: -index * (100 / 3) + "%",
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 30,
    },
  }),
  whileBlur: (index) => ({
    x: keyframesEven[index],
    transition: {
      duration: 30,
      type: "tween",
      repeat: Infinity,
      ease: "linear",
    },
    initial: {
      x: -index * (100 / 3) + "%",
    },
  }),
}

const oddCollectionVariants = {
  whileHover: (index) => ({
    x: -(2 - index) * (100 / 3) + "%",
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 30,
    },
  }),
  whileBlur: (index) => ({
    x: keyframesOdd[index],
    transition: {
      duration: 30,
      type: "tween",
      repeat: Infinity,
      ease: "linear",
    },
  }),
}

const ClientCollectionWrapper = ({
  className,
  items,
  order,
  limitTo = 1,
  CardComponent,
}) => {
  const [index, setIndex] = React.useState(0)
  const [isHover, setIsHover] = React.useState(false)

  const evenAnimate = isHover
    ? evenCollectionVariants.whileHover(index)
    : evenCollectionVariants.whileBlur
  const oddAnimate = isHover
    ? oddCollectionVariants.whileHover(index)
    : oddCollectionVariants.whileBlur

  const itemsToRender = limitTo ? items.slice(0, limitTo) : items

  const ordered = itemsToRender.filter((item) => item.showAtTop)
  const rest = itemsToRender.filter((item) => !item.showAtTop)

  const arrayToRender = [...ordered, ...rest]

  return (
    <motion.div
      variants={containerVariants}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="flex items-center justify-center group"
    >
      <button
        type="button"
        className="invisible opacity-0 group-hover:visible group-hover:opacity-100 duration-200 transition-all"
        onClick={() => setIndex((prev) => (prev === 0 ? 2 : prev - 1))}
      >
        <LeftChevron className="mr-16" />
      </button>
      <div className="flex flex-col overflow-x-hidden max-w-[864px]">
        {Array(3)
          .fill(0)
          .map((_, i) => {
            const isEven = i % 2 === 0
            return (
              <motion.div
                className={"flex flex-nowrap w-max"}
                key={i}
                custom={index}
                initial={isEven ? { x: 0 } : { x: -2 * (100 / 3) + "%" }}
                animate={isEven ? evenAnimate : oddAnimate}
              >
                {arrayToRender &&
                  arrayToRender
                    .slice(i * 9 * 3, (1 + i) * 9 * 3)
                    .map((item) => (
                      <div className="h-24 w-24">
                        <CardComponent key={item.id} {...item} />
                      </div>
                    ))}
              </motion.div>
            )
          })}
      </div>
      <button
        type="button"
        className="invisible opacity-0 group-hover:visible group-hover:opacity-100 duration-200 transition-all"
        onClick={() => setIndex((prev) => (prev === 2 ? 0 : prev + 1))}
      >
        <RightChevron className="ml-16" />
      </button>
    </motion.div>
  )
}

export default ClientCollectionWrapper

import React from "react"
import { motion } from "framer-motion"
import LeftChevron from "../svgs/LeftChevron"
import RightChevron from "../svgs/RightChevron"

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

const ClientCarousel = ({ arrayToRender, isHover, CardComponent, showAll }) => {
  const [index, setIndex] = React.useState(0)

  React.useEffect(() => {
    if (showAll) {
      setIndex(0)
    }
  }, [showAll])

  const evenAnimate =
    isHover || showAll
      ? evenCollectionVariants.whileHover(index)
      : evenCollectionVariants.whileBlur
  const oddAnimate =
    isHover || showAll
      ? oddCollectionVariants.whileHover(index)
      : oddCollectionVariants.whileBlur

  return (
    <>
      <button
        type="button"
        className={`${
          showAll ? "" : "group-hover:visible group-hover:opacity-100"
        } hidden sm:flex invisible opacity-0 duration-200 transition-all`}
        onClick={() => setIndex((prev) => (prev === 0 ? 2 : prev - 1))}
      >
        <LeftChevron className="sm:mr-16" />
      </button>
      <div className="hidden sm:flex flex-col overflow-x-hidden max-w-[288px] sm:max-w-[576px] lg:max-w-[864px]">
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
                      <div className="h-24 w-24" key={item.id}>
                        <CardComponent {...item} />
                      </div>
                    ))}
              </motion.div>
            )
          })}
      </div>
      <div className="grid grid-cols-4 px-5 sm:hidden">
        {arrayToRender &&
          arrayToRender?.slice(0, 24).map((item) => (
            <div className="h-20 w-20" key={item.id}>
              <CardComponent {...item} />
            </div>
          ))}
      </div>
      <button
        type="button"
        className={`${
          showAll ? "" : "group-hover:visible group-hover:opacity-100"
        } hidden sm:flex invisible opacity-0 duration-200 transition-all`}
        onClick={() => setIndex((prev) => (prev === 2 ? 0 : prev + 1))}
      >
        <RightChevron className="sm:ml-16" />
      </button>
    </>
  )
}

export default ClientCarousel

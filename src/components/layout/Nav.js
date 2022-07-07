import React, { useState } from "react"

import Linked from "../elements/Linked"
import UseBodyLock from "../../hooks/useBodyLock"
// import { SocialIcons } from '../elements/SocialIcons';
import { useStaticQuery, graphql } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBars,
  faChevronDown,
  faPlus,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons"
import { Transition } from "@headlessui/react"
import {
  faFacebookF,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons"
import { SocialIcons } from "../elements/SocialIcons"
import KatchLogo from "../../images/logo-katch.png"
import { motion, AnimatePresence } from "framer-motion"

const itemVariant = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, ease: "easeInOut", x: 0 },
}

const ulVariant = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      type: "spring",
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
}

const Nav = (props) => {
  const pathName = typeof window !== "undefined" && window.location?.pathname

  const [menuOpen, setMenuOpen] = useState(false)

  UseBodyLock(menuOpen)

  const { contentfulSiteSettings } = useStaticQuery(graphql`
    query NavBarQuery {
      contentfulSiteSettings {
        navBar {
          ... on ContentfulPage {
            id
            slug
            title
          }
          # ... on ContentfulSubMenu {
          #     id
          #     header
          #     menuItems {
          #         title
          #         slug
          #     }
          # }
          ... on ContentfulLink {
            id
            linkTo
            text
          }
        }
        siteName
        navLogo {
          gatsbyImageData(
            width: 100
            layout: FIXED
            placeholder: TRACED_SVG
            quality: 90
          )
        }
      }
    }
  `)

  const { navBar, navLogo } = contentfulSiteSettings
  const location = typeof window !== "undefined" && window.location.pathname
  const isProject = location.includes("project")
  const isContactUs = location.includes("contact-us")

  const [atTop, setAtTop] = React.useState(
    isProject || isContactUs ? false : true
  )

  const handleScroll = (e) => {
    const scrollTop = e.target.documentElement.scrollTop
    if (scrollTop > 150) {
      return atTop && setAtTop(false)
    } else if (scrollTop < 150 && !isProject && !isContactUs) {
      return setAtTop(true)
    }
  }

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll)

    // return window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav
        className={` w-full fixed ${
          atTop ? "py-4" : "hidden"
        } transition-all duration-300 lg:px-0 z-[999]`}
      >
        <div className="flex max-w-screen-2xl mx-auto px-4">
          <Linked linkTo="/" className="">
            <img className="w-24" src={KatchLogo} alt="Katch Logo" />
          </Linked>
     

          <div className="hidden md:flex space-x-4 text-sm ml-auto mt-2 pr-4 uppercase ">
            {navBar &&
              navBar.map((item) => {
                if (item.menuItems) {
                  return (
                    <DropDown
                      key={item.id}
                      items={item.menuItems}
                      header={item.header}
                    />
                  )
                }
                return (
                  <Linked
                    className="text-white cursor-pointer relative group"
                    linkTo={`${
                      item.slug
                        ? `/${item.slug === "/" ? "" : item.slug}`
                        : item.linkTo
                    }`}
                    key={item.id}
                    underline
                  >
                    {item.title || item.text}
                  </Linked>
                )
              })}
          </div>
        </div>
      </nav>
  
      <nav className=" w-full fixed z-[999]">
      <button
          onClick={() => setMenuOpen(!menuOpen) }
          className={`${!atTop ? "inline-block" : "lg:hidden"} ${
            !menuOpen ? "hover:text-black text-secondary " : "text-white"
          } z-[9999] ml-auto mr-6 mt-6 h-8 w-8 fixed top-0 right-5  duration-300 hover:animate-pulse`}
        >
          <svg
            width="37"
            height="20"
            viewBox="0 0 37 20"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10 2C10 0.895508 10.8955 0 12 0H35C35.6133 0 36.1621 0.276367 36.5293 0.711426C36.8232 1.05957 37 1.50928 37 2C37 3.10449 36.1045 4 35 4H12C10.8955 4 10 3.10449 10 2ZM0 10C0 8.89551 0.895508 8 2 8H25C26.1045 8 27 8.89551 27 10C27 11.1045 26.1045 12 25 12H2C0.895508 12 0 11.1045 0 10ZM24 16C22.8955 16 22 16.8955 22 18C22 18.5522 22.2236 19.0522 22.5859 19.4141C22.9473 19.7764 23.4473 20 24 20H35C36.1045 20 37 19.1045 37 18C37 16.8955 36.1045 16 35 16H24Z"
              fill="currentColor"
            />
          </svg>
        </button>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="modal"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: {
                  staggerChildren: 0.5,
                },
              }}
              exit={{ opacity: 0 }}
              className={`bg-secondary   w-full h-screen fixed top-0`}
            >
              <motion.ul
                variants={ulVariant}
                initial="hidden"
                animate="show"
                className={` z-[999] flex flex-col h-full max-w-4xl mx-auto justify-center text-white px-4 py-8 space-y-4 uppercase `}
              >
                {navBar &&
                  navBar.map((item) => {
                    if (item.menuItems) {
                      return (
                        <motion.li
                          variants={itemVariant}
                          key={item.id}
                          className=""
                        >
                          {item.header}
                          <ul className=" text-6xl space-y-3 mt-4 mb-4">
                            {item.menuItems.map((item) => (
                              <li key={item.title}>
                                <Linked
                                  linkTo={`${
                                    item.slug
                                      ? `/${item.slug === "/" ? "" : item.slug}`
                                      : item.linkTo
                                  }`}
                                >
                                  {item.title}
                                </Linked>
                              </li>
                            ))}
                          </ul>
                        </motion.li>
                      )
                    }
                    // remove the current page
                    if (item.slug === pathName) {
                      return ""
                    }
                    return (
                      <motion.li key={item.id} variants={itemVariant}>
                        <Linked
                          className="text-white cursor-pointer relative group text-5xl leading-tight"
                          linkTo={`${
                            item.slug
                              ? `/${item.slug === "/" ? "" : item.slug}`
                              : item.linkTo
                          }`}
                          key={item.id}
                        >
                          {item.title || item.text}
                        </Linked>
                      </motion.li>
                    )
                  })}

                <motion.li
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                      delay: 0.2 * 5,
                    },
                  }}
                  initial={{ opacity: 0, y: 50 }}
                  className="block"
                >
                  <hr className="border-white max-w-[500px]" />
                  <Linked
                    linkTo="mailto:info@katchthis.com"
                    className="text-white  py-1 flex items-center space-x-4 rounded-full"
                  >
                    INFO@KATCHTHIS.COM
                  </Linked>

                  <SocialIcons
                    className="text-white space-x-2 flex mt-auto"
                    // showText
                    icons={[
                      {
                        icon: faFacebookF,
                        linkTo: "https://www.facebook.com/KatchInternational",
                        text: "Follow our Facebook",
                      },
                      {
                        icon: faTwitter,
                        linkTo: "https://twitter.com/katchbabs",
                        text: "Follow our Twitter",
                      },
                      {
                        icon: faInstagram,
                        linkTo: "https://www.instagram.com/katch_int/",
                        text: "Follow our Instagram",
                      },
                    ]}
                  />
                </motion.li>
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  )
}

const DropDown = ({ items, header }) => {
  const [showMenu, setShowMenu] = React.useState(false)

  return (
    <div
      className="text-white  relative"
      onMouseEnter={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
    >
      <p>
        {header}{" "}
        <FontAwesomeIcon className="text-sm ml-1" icon={faChevronDown} />
      </p>

      <Transition
        show={showMenu}
        enter="transition ease-out duration-100 transform  "
        enterFrom="opacity-0 scale-95 hidden"
        enterTo="opacity-100 scale-100 block"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100 block"
        leaveTo="opacity-0 scale-95 hidden"
      >
        <ul
          className={`absolute w-72 bg-black pb-4 px-4 pt-4 -ml-4 border-t-2 border-secondary mt-2 space-y-3`}
        >
          {items.map((item) => (
            <li key={item.slug}>
              <Linked linkTo={`/${item.slug}`} className="relative group">
                {item.title}
                <span className="group-hover:w-full w-0 transition-all duration-500 absolute h-1 bg-secondary left-0 -bottom-1" />
              </Linked>
            </li>
          ))}
        </ul>
      </Transition>
    </div>
  )
}

export default Nav

import React, { useState } from 'react'

import Linked from '../elements/Linked'
import UseBodyLock from '../../hooks/useBodyLock';
// import { SocialIcons } from '../elements/SocialIcons';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Transition } from '@headlessui/react';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { SocialIcons } from '../elements/SocialIcons';


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
            ... on ContentfulSubMenu {
                id
                header
                menuItems {
                    title
                    slug
                }
            }
            ... on ContentfulLink {
                id
                linkTo
                text
                }
            }
            siteName
            navLogo {
                gatsbyImageData(width: 100, layout: FIXED, placeholder: TRACED_SVG, quality: 90)
            }
        }
        }
    `)

    const { navBar, navLogo } = contentfulSiteSettings

    const [atTop, setAtTop] = React.useState(true)


    const handleScroll = (e) => {
        const scrollTop = e.target.documentElement.scrollTop
        if (scrollTop > 150) {
            return atTop && setAtTop(false)
        } else if (scrollTop < 150) {
            return setAtTop(true)
        }
    }

    React.useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        // return window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <>
            <nav
                className={` w-full fixed ${atTop ? "py-4" : "py-1 bg-black"} transition-all duration-300 px-4 lg:px-0 z-front`} >
                <div className="flex max-w-screen-lg mx-auto ">

                    <Linked linkTo="/" className="">
                        <GatsbyImage image={navLogo.gatsbyImageData} alt="Katch Logo" />
                    </Linked>

                    <div className="hidden md:flex space-x-4 text-sm ml-auto mt-2 uppercase">
                        {
                            navBar && navBar.map(item => {
                                if (item.menuItems) {
                                    return <DropDown key={item.id} items={item.menuItems} header={item.header} />
                                }
                                return <Linked
                                    className="text-white cursor-pointer relative group"
                                    linkTo={`${item.slug ? `/${item.slug}` : item.linkTo}`}
                                    key={item.id}
                                    underline
                                >
                                    {item.title || item.text}
                                </Linked>
                            })
                        }
                    </div>
                    <div className="md:hidden ml-auto flex  text-white pr-4 relative z-10">
                        <button onClick={() => setMenuOpen(!menuOpen)} className="" >
                            {menuOpen ? <FontAwesomeIcon icon={faPlus} className="transform rotate-45 text-xl" /> :
                                <FontAwesomeIcon icon={faBars} className="text-xl" />}
                        </button>

                    </div>

                </div>


                <ul style={{
                    position: 'fixed',
                    top: 0,
                    left: !menuOpen ? "-100vw" : "0vw",
                    height: "100vh"
                }}
                    className={`${menuOpen ? "opacity-100" : "opacity-0"} flex flex-col text-white px-4 py-8 transition-all duration-500 space-y-4 bg-secondary uppercase font-semibold w-4/5 min-w-xxs md:hidden`}>
                    <li><h2 className="text-2xl text-black font-black">Katch <br /> International</h2></li>
                    {
                        navBar && navBar.map(item => {
                            if (item.menuItems) {
                                return <li key={item.id} className="">
                                    {item.header}
                                    <ul className=" ml-4 space-y-3 mt-4 mb-4">
                                        {item.menuItems.map(item => <li key={item.title}>
                                            <Linked linkTo={`/${item.slug}`}>
                                                {item.title}
                                            </Linked>
                                        </li>)}
                                    </ul>
                                </li>
                            }
                            return <Linked
                                className="text-white cursor-pointer relative group"
                                linkTo={`/${item.slug}`}
                                key={item.id}
                            >
                                {item.title || item.text}
                            </Linked>
                        })
                    }

                    <li className="">
                        <SocialIcons
                            className="text-white space-x-2 flex mt-auto"
                            // showText
                            icons={[
                                {
                                    icon: faFacebookF,
                                    linkTo: "https://www.facebook.com/KatchInternational",
                                    text: "Follow our Facebook"
                                },
                                {
                                    icon: faTwitter,
                                    linkTo: "https://twitter.com/katchbabs",
                                    text: "Follow our Twitter"
                                },
                                {
                                    icon: faInstagram,
                                    linkTo: "https://www.instagram.com/katch_int/",
                                    text: "Follow our Instagram"
                                },
                            ]} />

                    </li>



                </ul>
            </nav>
        </>
    )
}


const DropDown = ({ items, header }) => {


    const [showMenu, setShowMenu] = React.useState(false)

    return <div className="text-white  relative"
        onMouseEnter={() => setShowMenu(true)}
        onMouseLeave={() => setShowMenu(false)}
    >
        <p>{header} <FontAwesomeIcon className="text-sm ml-1" icon={faChevronDown} /></p>

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
                className={`absolute w-72 bg-black pb-4 px-4 pt-4 -ml-4 border-t-2 border-secondary mt-2 space-y-3`}>
                {items.map(item => <li key={item.slug}>
                    <Linked linkTo={`/${item.slug}`} className="relative group">
                        {item.title}
                        <span className="group-hover:w-full w-0 transition-all duration-500 absolute h-1 bg-secondary left-0 -bottom-1" />
                    </Linked>
                </li>)}
            </ul>
        </Transition>
    </div>
}


export default Nav

import {
  faMapPin,
  faPaperPlane,
  faPhoneAlt,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"

const HomeSection = ({ extraImages }) => {
  const leftImage = extraImages[0]
  const rightImage = extraImages[1]

  return (
    <>
      <section className="max-w-screen-xl mx-auto lg:py-20">
        <h3 className="uppercase text-4xl text-center">Contact Us.</h3>

        <div className="flex justify-center space-y-6 mb-12 sm:space-x-12 lg:space-x-0 lg:justify-around items-center mt-12 max-w-screen-lg flex-wrap mx-auto">
          <IconCard
            icon={faPhoneAlt}
            text={["+971 4 243 8577"]}
            linkTo="tel:+971 4 243 8577"
          />
          <IconCard
            icon={faPaperPlane}
            text={["info@katchthis.com"]}
            linkTo="mailTo:info@katchthis.com"
          />
          <IconCard
            icon={faMapPin}
            text={[`Dubai, Tameem House, Al`, `Barsha Heights`]}
            linkTo="https://goo.gl/maps/JT3WmA8acpJMQbCV6"
          />
        </div>
      </section>
      <section className="flex flex-col md:flex-row h-[500px] ">
        <div className="h-full w-full relative">
          <div className="h-full w-full bg-black bg-opacity-40 absolute z-10" />
          <GatsbyImage
            className="h-full w-full  "
            image={leftImage.gatsbyImageData}
            alt={leftImage.title}
          />
          <h4
            data-aos="fade-up"
            data-aos-duration="500"
            data-aos-once="true"
            className="absolute bottom-0 z-10 text-white text-4xl left-12"
          >
            Katch <br /> Dubai
          </h4>
        </div>

        <a
          href="https://katchcommunications.com"
          className="block h-full w-full cursor-pointer overflow-hidden relative group"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="h-full w-full bg-secondary mix-blend-screen absolute z-10 group-hover:opacity-100 opacity-0" />
          <GatsbyImage
            className="h-full w-full  "
            image={rightImage.gatsbyImageData}
            alt={rightImage.title}
          />

          <h4
            data-aos="fade-up"
            data-aos-duration="500"
            data-aos-once="true"
            className="absolute bottom-0 z-10 text-white text-4xl left-12"
          >
            Katch <br /> London
          </h4>
        </a>
      </section>
    </>
  )
}

const IconCard = ({ icon, text, linkTo }) => {
  return (
    <a
      className="flex text-2xl items-center group space-x-8 hover:text-secondary"
      href={linkTo}
      target="_blank"
    >
      <FontAwesomeIcon
        size="2xl"
        className="w-20 group-hover:animate-bounce"
        icon={icon}
      />
      <div className="w-64 md:w-auto">
        {text.map((t, index) => (
          <p key={index}>{t}</p>
        ))}
      </div>
    </a>
  )
}

export default HomeSection

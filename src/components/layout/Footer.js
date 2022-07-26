import React from "react"
import { SocialIcons } from "../elements/SocialIcons"
import Linked from "../elements/Linked"
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons"

export const blackButtonClassName =
  "inline-block my-2 bg-primary px-4 text-white text-sm py-2 font-thin rounded hover:text-secondary hover:bg-white transition-bg duration-500 min-w-[175px] text-center"

export const linksToOtherKatch = [
  {
    linkTo: "https://katchcommunications.com",
    text: "VISIT KATCH LONDON",
  },
  {
    linkTo: "https://www.wearetheunderdog.com/",
    text: "VISIT THE UNDERDOG",
  },
  {
    linkTo: "https://katchdisruption.com/",
    text: "VISIT KATCH DISRUPTION",
  },
]

const Footer = (props) => {
  return (
    <footer className="py-12 bg-secondary">
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-screen-xl mx-auto px-6 w-full">
        {/* Column 1 */}
        <div className="col-span-1 h-full w-full">
          <h4 className="mb-4  font-medium px-0 pt-0 pb-2 m-0 text-lg leading-4 text-primary w-full">
            WE LIKE TO BE FOLLOWED
          </h4>
          <SocialIcons
            className="text-white space-y-2 mb-4 w-full flex flex-col"
            showText
            itemClassName="hover:text-primary w-full flex flex-nowrap"
            icons={[
              {
                icon: faFacebookF,
                linkTo: "https://www.facebook.com/KatchInternational",
                text: "Follow our Facebook",
              },
              {
                icon: faTwitter,
                linkTo: "https://twitter.com/katchintl",
                text: "Follow our Twitter",
              },
              {
                icon: faInstagram,
                linkTo: "https://www.instagram.com/katch_int/",
                text: "Follow our Instagram",
              },
              {
                icon: faLinkedin,
                linkTo: "https://www.linkedin.com/company/katch-international/",
                text: "Follow our LinkedIn",
              },
            ]}
          />
        </div>

        {/* Column 2 / 3 */}
        <div className="col-span-3 lg:col-span-2 flex flex-col items-start">
          {/* Addresses */}
          <div className="flex flex-wrap gap-y-8 gap-x-12">
            <div className="flex flex-col justify-center">
              <h4 className="text-primary">Dubai Branch</h4>
              <div className="text-sm text-white space-y-1">
                <p>Address 2004, Tameem House,</p>
                <p>Barsha Heights, P.O.Box 122321</p>
                <p>Dubai UAE</p>
                <p>TEL : +971 4 243 8577</p>
                <p>
                  Email:{" "}
                  <a className="hover:text-primary" href="info@katchthis.com">
                    info@katchthis.com
                  </a>
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <h4 className="text-primary">London Branch</h4>
              <div className="text-sm text-white space-y-1">
                <p>25 The Panoramic, 152 Grosvenor Rd</p>
                <p> London, SW1V 3JL </p>
                <p>TEL: +44 20 8895 6383</p>
                <p>
                  Email:{" "}
                  <a className="hover:text-primary" href="info@katchthis.com">
                    info@katchthis.com
                  </a>
                </p>
                <p>
                  Website:{" "}
                  <Linked
                    className="hover:text-primary"
                    linkTo="www.katchcommunications.com"
                  >
                    www.katchcommunications.com
                  </Linked>
                </p>
              </div>
            </div>
          </div>

          {/* Buttons Links */}
          <div className="flex flex-wrap gap-x-2 md:gap-x-6 mt-4">
            {linksToOtherKatch.map((link) => (
              <div key={link.linkTo}>
                <Linked
                  className={`${blackButtonClassName}`}
                  linkTo={link.linkTo}
                >
                  {link.text}
                </Linked>
              </div>
            ))}
          </div>
        </div>

        {/* Column 4 */}

        <div className="max-w-lg col-span-3 lg:col-span-1 lg:pt-0">
          <h4 className="mb-4  font-medium px-0 pt-0 pb-2 m-0 text-lg  leading-4 text-primary">
            KATCH US
          </h4>
          <p className="text-white text-sm">
            Job inquiries may be sent directly to{" "}
            <a
              className="text-gray-200 hover:text-primary"
              href="mailto:recruitment@katchthis.com"
            >
              recruitment@katchthis.com
            </a>
            .
          </p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto flex justify-between mt-4 px-4">
        <h5 className="mt-2 font-thin opacity-75 text-white text-sm ">
          &copy; Katch International {new Date().getFullYear()}
        </h5>
        {/* <h6 className="text-xs font-thin mt-2 opacity-50 text-right ml-auto text-white hover:opacity-100"><Linked linkTo="https://www.katchdisruption.com/">Built by Katch Distruption</Linked></h6> */}
        <Linked
          className="opacity-0 pointer-events-none"
          linkTo="https://antler.digital"
        >
          Antler Digital
        </Linked>
      </div>
    </footer>
  )
}

Footer.propTypes = {}

export default Footer

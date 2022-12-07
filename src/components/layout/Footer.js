import React, { Fragment } from "react"
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

export const footerLinks = [
  { name: "Katch", linkTo: "/" },
  { name: "Clients", linkTo: "/projects" },
  { name: "Blog", linkTo: "/blog" },
  { name: "Case Studies", linkTo: "/#our-work" },
  { name: "Katch Us", linkTo: "/contact-us" },
]

export const legalLinks = [
  { name: "Privacy Policy", linkTo: "/privacy-policy" },
  { name: "Terms & Conditions", linkTo: "/terms-and-conditions" },
]

const Footer = (props) => {
  return (
    <footer className="py-12 bg-secondary min-h-[80vh] sm:min-h-min flex flex-col justify-end">
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-screen-xl mx-auto px-6 w-full">
        {/* Column 1 */}
        <div className="col-span-1 h-full w-full">
          <h4 className="mb-4  font-medium px-0 pt-0 pb-2 m-0 text-lg leading-4 text-white w-full">
            WE LIKE TO BE FOLLOWED
          </h4>
          <SocialIcons
            className="text-white gap-y-2 mb-4 w-full flex flex-row sm:flex-col"
            showText
            itemClassName="hover:text-primary sm:w-full flex flex-nowrap w-min"
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
        <div className="flex col-span-3 lg:col-span-2 flex-col items-start">
          {/* Addresses */}
          <div className="flex flex-wrap gap-y-8 gap-x-12">
            <div className="flex flex-col justify-center">
              <h4 className="text-white">Dubai Branch</h4>
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
              <h4 className="text-white">London Branch</h4>
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

        {/* <div className="sm:hidden text-xs text-white">
          <div className="flex gap-x-1 text-sm text-white">
            {footerLinks.map(({ name, linkTo }, idx) => {
              if (idx < footerLinks.length - 1) {
                return (
                  <Fragment key={`footer-link-${name}`}>
                    <Linked linkTo={linkTo}>
                      <p>{name}</p>
                    </Linked>
                    <div>|</div>
                  </Fragment>
                )
              } else {
                return (
                  <Linked linkTo={linkTo} key={`footer-link-${name}`}>
                    <p>{name}</p>
                  </Linked>
                )
              }
            })}
          </div>

          <div className="sm:hidden flex gap-x-2 mt-2">
            {legalLinks.map(({ name, linkTo }) => (
              <Linked key={`legal-footer-link-${name}`} linkTo={linkTo}>
                <p>{name}</p>
              </Linked>
            ))}
          </div>
          <p>Copyright &copy; 2011 - 2016 Katch International L.T.D.</p>
        </div>

        <p className="sm:hidden text-xs text-white">
          Designed by: KATCH INTERNATIONAL
        </p> */}

        <div className="max-w-lg col-span-3 lg:col-span-1 lg:pt-0">
          <h4 className="mb-4  font-medium px-0 pt-0 pb-2 m-0 text-lg  leading-4 text-white">
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

      <div className="flex flex-col max-w-screen-xl mx-auto justify-between mt-4 px-4">
        <h5 className="mt-2 font-thin opacity-75 text-white text-sm mx-auto">
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

import React from "react"
import Linked from "./Linked"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const SocialIcons = ({
  icons,
  className,
  showText = false,
  itemClassName,
  ...restProps
}) => {
  return (
    <ul className={`${className}`} {...restProps}>
      {icons &&
        icons.map(({ icon, linkTo, text }) => (
          <li key={linkTo} className={itemClassName}>
            <Linked linkTo={linkTo}>
              <span className=" w-8 inline-block">
                <FontAwesomeIcon className={`mr-4`} icon={icon} />
              </span>
              <span className="hidden sm:inline-block text-sm  font-light">
                {" "}
                {showText && text}
              </span>
            </Linked>
          </li>
        ))}
    </ul>
  )
}

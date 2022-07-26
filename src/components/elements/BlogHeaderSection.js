import React from "react"
import KatchLogo from "../../images/logo-katch.png"
import Linked from "./Linked"

const BlogHeaderSection = ({ title, subtitle }) => {
  return (
    <section className="bg-white min-h-[200px] h-full z-10">
      <div className="max-w-screen-md flex flex-col justify-around mx-auto min-h-[200px] h-full px-8 bg-white">
        <Linked linkTo="/">
          <img className="w-24" src={KatchLogo} alt="Katch Logo" />
        </Linked>
        <div className="h-full tracking-wider">
          <h1 className="text-2xl capitalize">{title}</h1>
          <h5 className="text-sm font-sans font-thin">{subtitle}</h5>
        </div>
      </div>
    </section>
  )
}

export default BlogHeaderSection

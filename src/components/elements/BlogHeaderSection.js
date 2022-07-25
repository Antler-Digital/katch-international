import React from "react"

const BlogHeaderSection = ({ title, subtitle }) => {
  return (
    <section className="bg-gray-100 min-h-[200px] h-full">
      <div className="max-w-screen-md flex flex-col justify-center mx-auto min-h-[200px] px-10 bg-white">
        <h1 className="text-2xl">{title}</h1>
        <h5 className="text-sm font-sans font-thin">{subtitle}</h5>
      </div>
    </section>
  )
}

export default BlogHeaderSection

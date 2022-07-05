import React from "react"
import { useForm } from "react-hook-form"
import { graphql } from "gatsby"

import fetch from "isomorphic-unfetch"
import Cookies from "js-cookie"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import RichTextOptions from "../rich-text/RichTextOptions"

export default function HubspotForm({ footnote }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const [formSubmitted, setFormSubmitted] = React.useState({
    submitted: false,
    success: false,
  })

  const [captchaFirstNumber, setCaptchaFirstNumber] = React.useState(0)
  const [captchaSecondNumber, setCaptchaSecondNumber] = React.useState(0)

  React.useEffect(() => {
    setCaptchaFirstNumber(Math.ceil(Math.random() * 10))
    setCaptchaSecondNumber(Math.ceil(Math.random() * 10))
  }, [])

  const formId = "3ea11428-297e-4153-8c61-29892d48ec29"
  const portalId = "4292192"

  const isBrowser = typeof window !== "undefined"
  const hutk = isBrowser ? Cookies.get("hubspotutk") : null
  const pageUri = isBrowser ? window.location.href : null
  const pageName = isBrowser ? document.title : null

  const onSubmit = async (data) => {
    if (
      data?.captcha?.trim() !== `${captchaFirstNumber + captchaSecondNumber}`
    ) {
      return setFormSubmitted({
        submitted: false,
        success: false,
        message: "Captcha is incorrect",
      })
    }

    if (data.company !== "") {
      return setFormSubmitted({
        success: true,
        message: "Thanks for submitting.",
        submitted: true,
      })
    }

    const finalData = {
      submittedAt: Date.now(),
      fields: [
        {
          name: "email",
          value: data.email,
        },
        {
          name: "company",
          value: data.company,
        },
        {
          name: "phone",
          value: data.phone,
        },
        {
          name: "message",
          value: data.message,
        },
      ],
      context: {
        hutk,
        pageUri,
        pageName,
      },
    }

    const url = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`

    const res = await fetch(url, {
      method: "post",
      body: JSON.stringify(finalData),
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json, application/xml, text/plain, text/html, *.*",
      }),
    })

    const response = await res.json()

    if (response.inlineMessage) {
      setFormSubmitted({
        success: true,
        message: response.inlineMessage,
        submitted: true,
      })
    }
  }

  const inputClass =
    "p-8 focus:outline-none border-none !ring-0 text-primary bg-gray-200 font-sans font-normal placeholder:font-sans placeholder:font-normal"

  return formSubmitted.submitted ? (
    <div className="min-h-[400px]">
      {formSubmitted.success ? (
        <p>
          {formSubmitted.inlineMessage ||
            "Thank you for submitting the form we will be in touch soon."}
        </p>
      ) : (
        <p>Something went wrong. Please try again later or call us directly.</p>
      )}
    </div>
  ) : (
    <form
      // data-form-id={formId}
      // data-portal-id={portalId}
      className="max-w-screen-2xl space-y-4 block relative mx-auto min-h-[400px] p-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-5xl mb-12 uppercase font-bold">Katch Us.</h2>
      {/* include validation with required or other standard HTML validation rules */}
      <input
        type="email"
        className={`${inputClass} w-full h-16`}
        placeholder="Email Address"
        {...register("email", { required: true })}
      />
      {/* errors will return when field validation fails  */}
      {errors.email && <span>This field is required</span>}
      {/* include validation with required or other standard HTML validation rules */}
      <input
        type="tel"
        className={`${inputClass} w-full h-16`}
        placeholder="Phone Number"
        {...register("phone")}
      />

      <input
        type="text"
        className={`${inputClass} w-full h-16`}
        placeholder="Company Name"
        {...register("company")}
      />

      <textarea
        placeholder="Message"
        className={`${inputClass} w-full h-44`}
        {...register("message", { required: true })}
        rows="3"
      ></textarea>
      {errors.message && <span>This field is required</span>}

      <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row justify-between items-end sm:items-center md:items-end lg:items-center gap-y-4">
        <div className="flex justify-end sm:justify-start md:justify-end lg:justify-start items-center gap-4">
          <p className="font-sans font-bold text-3xl whitespace-nowrap">{`${captchaFirstNumber} + ${captchaSecondNumber} =`}</p>
          <input
            className={`focus:outline-none border-none !ring-0 text-primary bg-gray-200 font-sans font-normal placeholder:font-sans placeholder:font-normal h-10 px-3 w-1/3`}
            {...register("captcha", { required: true })}
          />
        </div>
        <button
          type="submit"
          value="Send"
          className="block text-black hover:text-secondary uppercase text-4xl font-bold"
        >
          Submit
        </button>
      </div>
      <p className="text-sm">{renderRichText(footnote, RichTextOptions)}</p>
    </form>
  )
}

export const ContentfulContactFormFragment = graphql`
  fragment ContentfulContactFormFragment on ContentfulContactForm {
    id
    internal {
      type
    }
    footnote {
      raw
    }
  }
`

import React from "react";
import { useForm } from "react-hook-form";

import fetch from 'isomorphic-unfetch';
import Cookies from 'js-cookie';


export default function HubspotForm() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const [formSubmitted, setFormSubmitted] = React.useState({
    submitted: false,
    success: false
  })

  const formId = '3ea11428-297e-4153-8c61-29892d48ec29'
  const portalId = '4292192'

  const isBrowser = typeof window !== 'undefined';
  const hutk = isBrowser ? Cookies.get('hubspotutk') : null;
  const pageUri = isBrowser ? window.location.href : null;
  const pageName = isBrowser ? document.title : null;

  const onSubmit = async data => {
    console.log(data)
    const finalData = {
      submittedAt: Date.now(),
      fields: [
        {
          name: 'firstname',
          value: data.firstname,
        },
        {
          name: 'lastname',
          value: data.lastname,
        },
        {
          name: 'email',
          value: data.email,
        },
        {
          name: 'phone',
          value: data.phone,
        },
        {
          name: 'callback',
          value: data.callback,
        },
        {
          name: 'message',
          value: data.message,
        },
      ],
      context: {
        hutk,
        pageUri,
        pageName,
      },
    }

    console.log(finalData)



    const url = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`

    const res = await fetch(url, {
      method: 'post',
      body: JSON.stringify(finalData),
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json, application/xml, text/plain, text/html, *.*',
      }),
    });

    const response = await res.json()

    if (response.inlineMessage) {
      setFormSubmitted({
        success: true,
        message: response.inlineMessage,
        submitted: true
      })
    }
    console.log(response)
  }




  const inputClass = "pl-3 pr-2 focus:outline-none border-none focus:ring-4 !ring-secondary "
  return (
    formSubmitted.submitted ? <div>
      {formSubmitted.success ? 
      <p>{formSubmitted.inlineMessage || 'Thank you for submitting the form we will be in touch soon.'}</p> 
      : <p>Something went wrong. Please try again later or call us directly.</p>}
    </div> : 
    <form
      data-form-id={formId}
      data-portal-id={portalId}
      className="space-y-4 mx-auto"
      onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <p>Enter your details below - we will be in touch shortly.</p>
      <div className="space-x-4 flex">
        <input className={`${inputClass}`} type="text" placeholder="First" {...register("firstname", { required: true })} />
        <input className={`${inputClass}`} type="text" placeholder="Last" {...register("lastname")} />
      </div>

      {/* include validation with required or other standard HTML validation rules */}
      <input type="email" className={`${inputClass} w-full`} placeholder="email@example.com" {...register("email", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.email && <span>This field is required</span>}
      {/* include validation with required or other standard HTML validation rules */}
      <input type="tel" className={`${inputClass} w-full`} placeholder="+INT 0000-0000-000" {...register("phone")} />

        <div className="flex justify-between items-center" >
          <label htmlFor="callback" className="inline-block">Would you like us to give you a call back?</label>
        <input type="checkbox" className="mr-2 focus:outline-none border-none focus:ring-2 !ring-black appearance-none checked:!bg-secondary  " {...register("callback")} />
        </div>
     

      <textarea placeholder="What are you looking to do or learn more about?" className={`${inputClass} w-full`} {...register("message", { required: true })} rows="3"></textarea>
      {errors.message && <span>This field is required</span>}

      <input type="submit" value="Send" className="bg-secondary px-8 block text-white hover:bg-black border-transparent border-2 hover:border-secondary cursor-pointer focus:ring-2 !ring-yellow-400 !ring-opacity-75 focus:outline-none" />
    </form>

  );
}
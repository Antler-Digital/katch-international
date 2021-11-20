import React from "react"
import Layout from "../components/layout/Layout"
import SEO from "../components/SEO"
import Linked from '../components/elements/Linked';

const NotFoundPage = () => (
  <>
  <SEO title="Oops nothing there" />
  <Layout>
    <section id="404" className="flex flex-col text-center justify-center px-8 min-h-screen bg-primary text-secondary" >
      <h1>¯\_(ツ)_/¯</h1>
    <h2 className="my-4">Oops appears that page doesn't exist.</h2>
    <p>Why don't we head back <Linked linkTo="/">home</Linked> and start again...</p>
    </section>
  </Layout>
  </>
)

export default NotFoundPage

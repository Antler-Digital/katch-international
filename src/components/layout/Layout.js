import React from "react"
import Nav from './Nav';
import Footer from './Footer';
import AOS from 'aos'
import 'aos/dist/aos.css'
const Layout = ({ children }) => {

  // Initialise the Animations for fade up and in
  React.useEffect(() => {
    AOS.init({
      once: true,
      easing: 'ease-in-out'
    });
  }, [])

  return (
    <>
      <header className="bg-gray-100">
        <Nav />
      </header>
      <main className="bg-gray-100 leading-loose font-thin ">
        {children}
      </main>
      <Footer />
    </>
  )
}

Layout.propTypes = {

}

export default Layout

import React from "react"
import { Helmet } from "react-helmet"
import Header from "./Header"
import Footer from "./Footer"
import "../../styles/global.css"

const Layout = ({ children, title, description }) => {
  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>{title ? `${title} | Dr. Fatih Nayebi` : "Dr. Fatih Nayebi | AI Researcher & Enterprise AI Leader"}</title>
        <meta name="description" content={description || "Dr. Fatih Nayebi is an AI researcher, enterprise AI leader, and Faculty Lecturer at McGill University"} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&family=Source+Sans+Pro:wght@300;400;600;700&display=swap" rel="stylesheet" />
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Layout 
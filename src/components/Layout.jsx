import React from 'react'
import Header from './Header'
import Footer from './Footer'
import "./Layout.scss"

function Layout({ children }) {
  return (
    <>
      <div className='content'>
        <Header />
        {children}
      </div>
      <Footer />

    </>
  )
}

export default Layout
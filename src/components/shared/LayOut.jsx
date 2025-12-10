import React from 'react'
import Header from '../ui/header/Header'
import Footer from '../ui/footer/Footer'

function LayOut({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default LayOut

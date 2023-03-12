import React from 'react'
import Header from "../../components/Header/header";
import Footer from "../../components/Footer/footer";


export default function LayoutHeaderFooter ({children}: {
  children: React.ReactNode
}) {

  return (<div>
        <Header />
          {children}
        <Footer />
    </div>
  )
}
"use client"

import './globals.css'
import React, { useContext } from 'react'
import {Montserrat} from "@next/font/google"
import LayoutHeaderFooter from './LayoutHeaderFooter';
import { usePathname } from 'next/navigation';
import { MyContext } from 'components/Header/MyProvider';

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '700', '800'],
})

export default function RootLayout ({children}: {
  children: React.ReactNode
}) {
  
  const pathname = usePathname()
  
    if(pathname === '/sign'){
      return (
        <html lang="en">
            <head />
            <body className={montserrat.className}>
                {children}
            </body>
        </html>
      )
    }

  return (
    <html lang="en">
        <head />
        <body className={montserrat.className} id="outer-container">
          <LayoutHeaderFooter>
            {children}
          </LayoutHeaderFooter>
        </body>
    </html>
  )
}

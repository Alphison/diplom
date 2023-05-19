"use client"

import './globals.css'
import React, { useContext } from 'react'
import LayoutHeaderFooter from './LayoutHeaderFooter';
import { usePathname } from 'next/navigation';
import { MyContext } from 'components/Header/MyProvider';

export default function RootLayout ({children}: {
  children: React.ReactNode
}) {
  
  const pathname = usePathname()
  
    if(pathname === '/sign'){
      return (
        <html lang="en">
            <head />
            <body>
                {children}
            </body>
        </html>
      )
    }

  return (
    <html lang="en">
        <head />
        <body id="outer-container">
          <LayoutHeaderFooter>
            {children}
          </LayoutHeaderFooter>
        </body>
    </html>
  )
}

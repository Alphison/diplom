"use client"

import './globals.css'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query';
import {Montserrat} from "@next/font/google"
import LayoutHeaderFooter from './LayoutHeaderFooter';
import { usePathname } from 'next/navigation';
import img from "../../public/images/fon_auth.jpg"

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '700', '800'],
})

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      refetchOnWindowFocus: false
    }
  }
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
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
            </body>
        </html>
      )
    }

  return (
    <html lang="en">
        <head />
        <body className={montserrat.className}>
        <QueryClientProvider client={queryClient}>
          <LayoutHeaderFooter>
            {children}
          </LayoutHeaderFooter>
        </QueryClientProvider>
        </body>
    </html>
  )
}

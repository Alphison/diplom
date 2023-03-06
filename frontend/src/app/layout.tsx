"use client"

import './globals.css'
import Header from "../../components/header";
import Footer from "../../components/footer";
import React from "react";
import {Montserrat} from "@next/font/google"
import { QueryClient, QueryClientProvider } from 'react-query';


const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '700', '800'],
})

export default function RootLayout ({children}: {
  children: React.ReactNode
}) {
  const queryClient = new  QueryClient();

  return (
    <html lang="en">
      <head />
      <body className={montserrat.className}>
        <QueryClientProvider client={queryClient}>
          <Header />
            {children}
          <Footer />
        </QueryClientProvider>
      </body>
    </html>
  )
}

"use client";

import React, { useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sling as Hamburger } from 'hamburger-react'
import { MyContext } from "./MyProvider";
import { usePathname } from "next/navigation";
import {motion, useTransform, useViewportScroll} from "framer-motion" 

const Header: React.FC = () => {

    const [isOpen, setOpen] = useState(false)

    const ctx = useContext(MyContext)
    
    const pathname = usePathname()

    const url = pathname?.includes(`/course_education`) || pathname?.includes(`/lesson`)

    const {scrollY} = useViewportScroll()

    const offsetY = [0, 75]

    const background = useTransform(scrollY, offsetY, ['rgba(0, 0, 0, 0)', 'rgba(141, 141, 141, 0.1)'])
    const backdropFilter = useTransform(scrollY, offsetY, ['blur(0)', 'blur(5px)'])

  return (
    <motion.header className="header" style={url ? {
      paddingLeft: '350px',
      background,
      backdropFilter
    }: {background, backdropFilter}}>
      <Link href={"/"} className="logo logo_header">
        <Image src="/images/logo.svg" width={40} height={44} alt={""} />
      </Link>
      <div onClick={ctx.toggleMenu} className={"burger"}>
        <Hamburger rounded toggled={isOpen} toggle={setOpen} size={30} direction="right" color="#ffffff"/>
      </div>
    </motion.header>
  );
};

export default Header;

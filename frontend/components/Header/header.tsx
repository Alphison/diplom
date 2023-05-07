"use client";

import React, { useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sling as Hamburger } from 'hamburger-react'
import { MyContext } from "./MyProvider";
import { usePathname } from "next/navigation";

const Header: React.FC = () => {

    const [isOpen, setOpen] = useState(false)

    const ctx = useContext(MyContext)

    const pathname = usePathname()

    const url = pathname?.includes(`/course_education`) || pathname?.includes(`/lesson`)

  return (
    <header className="header" style={url ? {
      paddingLeft: '350px'
    }: undefined}>
      <Link href={"/"} className="logo logo_header">
        <Image src="/images/logo.svg" width={40} height={44} alt={""} />
      </Link>
      <div onClick={ctx.toggleMenu} className={"burger"}>
        <Hamburger rounded toggled={isOpen} toggle={setOpen} size={30} direction="right" color="#ffffff"/>
      </div>
    </header>
  );
};

export default Header;

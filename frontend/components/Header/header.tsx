'use client'

import React from "react";
import Image from "next/image";
import {useRouter} from "next/navigation";
import Link from "next/link";

const Header: React.FC = () => {

    return (
        <header className="header">
            <div className="header__inner">
                <Link href={'/'} className="logo logo_header">
                    <Image src="/images/logo.svg" width={40} height={44} alt={''}/>
                </Link>
                <nav className="menu menu_header">
                    <Link href="/" className="menu-el">главная</Link>
                    <a href="?courses" className="menu-el">курсы</a>
                    <a href="?home#aboutus" className="menu-el">о нас</a>
                    <a href="?home#contacts" className="menu-el">контакты</a>
                </nav>
                <div className="header-rigth">
                    <div className="user-header">
                        <Image className="arrow-down" src="/images/Line.png" width={12} height={7} alt=""/>
                        <p className="name-user">
                            asda
                        </p>
                        <div className="ava-user">
                            <Image src="/images/ava.png" width={50} height={50} alt=""/>
                        </div>
                        <div className="subblock__user">
                            <a href="?user" className="subblock-el">
                                личный кабинет
                            </a>
                            <a href="?admin" className="subblock-el">
                                админ панель
                            </a>
                            <a href="?mycourse" className="subblock-el">
                                мои курсы
                            </a>
                            <a href="?courses_prepod" className="subblock-el">
                                мои курсы
                            </a>

                            <a href="?exit" className="subblock-el">
                                выйти
                            </a>
                        </div>
                    </div>
                    <Link className="btn-auth__header" href={'/auth'}>
                        войти
                    </Link>
                    <div className="burger">
                        <div className="burger-el"></div>
                        <div className="burger-el"></div>
                        <div className="burger-el"></div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
import Image from "next/image";
import React from "react";

const Footer:React.FC = () => {
    return(
        <footer className="footer">
            <div className="footer__inner">
                <nav className="menu menu-footer">
                    <a href="?home" className="menu-el">главная</a>
                    <a href="?home#courses" className="menu-el">курсы</a>
                    <a href="?home"><Image width={40} height={44} src="/images/logo.svg" alt=""/></a>
                    <a href="?home#aboutus" className="menu-el">о нас</a>
                    <a href="?home#contacts" className="menu-el">контакты</a>
                </nav>
            </div>
        </footer>
    )
}

export default Footer
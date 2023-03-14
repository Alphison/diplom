"use client"

import Auth from "components/auth/Auth";
import Register from "components/register/Register";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Sign = () => {
  const buttons = ["Авторизация", "Регистрация"];
  const [active, setActive] = useState('Авторизация')

  const handleSetActive = (name) => {
    setActive(name)
  }

  return (
    <>
      <div className="auth">
        <div className="inner-block__auth">
          <div className="header_auth">
            <Link href="/" className="logo">
              <Image src="/images/logo.svg" alt="" width={40} height={44} />
            </Link>
            <div className="btns-header__auth">
              {buttons.map((name) => {
                return (
                  <button
                    className={active === name ? 'btn-header__auth active' : 'btn-header__auth'}
                    onClick={() => handleSetActive(name)}
                  >
                    {name}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="forms">
            <div className="forms__inner">
              <Auth />
              <Register />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sign;

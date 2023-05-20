"use client"

import Auth from "components/auth/Auth";
import Register from "components/register/Register";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Sign = () => {
  const buttons = ["Авторизация", "Регистрация"];
  const [active, setActive] = useState<string>('Авторизация')

  const handleSetActive = (name:string) => {
    setActive(name)
  }

  return (
    <div className="wrapper-auth">
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
                    key={name}
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
            <div className={active === 'Регистрация' ? "forms__inner active" : "forms__inner"}>
              <Auth />
              <Register setActive={setActive}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sign;

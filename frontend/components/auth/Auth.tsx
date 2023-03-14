import Image from "next/image";
import Link from "next/link";
import React from "react";
import google from "../../public/images/google.jpg";
import "../../src/app/globals.css";

const Auth = () => {
  return (
    <div className="form-wrapper">
      <h1 className="form-name">Авторизация</h1>
      <form className="form-sign">
        <div className="inputs-form">
          <div className="inp-box">
            <input type="text" name="email" placeholder=" " value="" />
            <p className="placeholder">Email</p>
          </div>
          <div className="inp-box">
            <input type="text" name="password" placeholder=" " value="" />
            <p className="placeholder">Пароль</p>
          </div>
        </div>
        <button className="btn-sign btn-auth">Войти</button>
      </form>
      <div className="or">
        <hr />
        <p>Или</p>
        <hr />
      </div>
      <button className="google-btn">
        <Image src={google} width={22} height={22} alt={"google-logo"} />
        Продолжить с Google
      </button>
    </div>
  );
};

export default Auth;

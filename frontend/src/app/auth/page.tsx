import React from "react";
import Image from "next/image";
import "../globals.css";
import Link from "next/link";
import img from "../../../public/images/fon_auth.jpg";
import google from "../../../public/images/google.jpg";

const styling = {
  backgroundImage: `url('${img.src}')`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  width: "100%",
  height: "100%",
};

const Auth = () => {
  return (
    <>
      <div className="wrapper__auth" style={styling}>
        <div className="auth">
          <div className="inner-block__auth">
            <div className="header_auth">
              <Link href="/" className="logo">
                <Image src="/images/logo.svg" alt="" width={40} height={44} />
              </Link>
              <div className="btns-header__auth">
                <button className="btn-header__auth active">Авторизация</button>
                <button className="btn-header__auth">Регистрация</button>
              </div>
            </div>
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
                <Image
                  src={google}
                  width={22}
                  height={22}
                  alt={"google-logo"}
                />
                Продолжить с Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;

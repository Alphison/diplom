import React from "react";
import Image from "next/image";
import google from "../../public/images/google.jpg";
import "../../src/app/globals.css";

const Register = () => {
  return (
    <div className="form-wrapper">
      <h1 className="form-name">Регистрация</h1>
      <form className="form-sign">
        <div className="inputs-form">
          <div className="inp-box">
            <input type="text" name="email" placeholder=" " value="" />
            <p className="placeholder">Email</p>
          </div>
          <div className="inp-box">
            <input type="text" name="name" placeholder=" " value="" />
            <p className="placeholder">Имя</p>
          </div>
          <div className="inp-box">
            <input type="text" name="surname" placeholder=" " value="" />
            <p className="placeholder">Фамилия</p>
          </div>
          <div className="inp-box">
            <input type="password" name="password" placeholder=" " value="" />
            <p className="placeholder">Пароль</p>
          </div><div className="inp-box">
            <input type="password" name="password2" placeholder=" " value="" />
            <p className="placeholder">Подтверждение пароля</p>
          </div>
        </div>
        <button className="btn-sign">Регистрация</button>
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

export default Register;

import React from "react";
import Image from "next/image";
import '../app/globals.css'
import Link from "next/link";

const Auth = () => {
    return (
        <>
            <div className="wrapper">
                {/*<div className="error__block">*/}
                {/*    error*/}
                {/*</div>*/}
                {/*<div className="success_block success">*/}
                {/*    Успешная регистрация;)*/}
                {/*</div>*/}
                <div className="auth">
                    <Link href="/" className="logo">
                        <Image src="/images/logo.svg" alt="" width={40} height={44}/>
                    </Link>
                    <div className="auth__okno">
                        <div className="anim">
                            <h1 className="h1__auth">
                                Вход
                            </h1>
                            <form className="form__auth" method="POST" name="auth">
                                <div className="inp-box">
                                    <input type="text" name="email" placeholder=" "
                                           value="<?php if(isset($_POST['auth'])){echo $email;}?>" />
                                        <p className="placeholder">Email</p>
                                </div>
                                <div className="inp-box">
                                    <input type="password" name="pass" placeholder=" "
                                           value="<?php if(isset($_POST['auth'])){echo $pass;}?>" />
                                        <p className="placeholder">Пароль</p>
                                </div>
                                <input type="submit" name="auth" value="Войти" />
                            </form>
                            <div className="reg-block">
                                <p className="subname-from">Нет аккаунта? - </p><a className="reg-btn"
                                                                                   href="auth?reg">регистрация</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Auth
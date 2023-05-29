import React, { useContext, useEffect } from 'react'
import { pushRotate as Menu } from 'react-burger-menu'
import Link from "next/link";
import { MyContext } from './MyProvider';
import { AiFillHome } from 'react-icons/ai';
import { IoIosSchool } from 'react-icons/io';
import { AiFillInfoCircle } from 'react-icons/ai';
import { GoSignIn } from 'react-icons/go';
import { RiLogoutBoxFill } from 'react-icons/ri';
import { uselogin } from '../../store/useSign';
import { FaUserAlt } from 'react-icons/fa';
import { MdAdminPanelSettings } from 'react-icons/md';
import Image from 'next/image';
import {redirect, useRouter} from 'next/navigation'
import Hamburger from 'hamburger-react';


const Navbar = () => {
  const router = useRouter()
    const ctx = useContext(MyContext)

    const { getToken, access_token, fetchUser, user, fetchLogout } = uselogin(state => ({
      getToken: state.getToken,
      access_token: state.access_token,
      fetchUser: state.fetchUser,
      user: state.user,
      fetchLogout: state.fetchLogout
    }))

    useEffect(() => {
      getToken()
      if(access_token){
        fetchUser(access_token)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [access_token])

    const handleLogout = () => {
      fetchLogout()
      router.push('/sign')
    }

    const src = `${process.env.NEXT_PUBLIC_API}${user?.ava}`;

  return (
    <Menu left isOpen={ ctx.isMenuOpen } className="menu" pageWrapId={"page-wrap"} outerContainerId={'outer-container'} onStateChange={(state) => ctx.stateChangeHandler(state)}>
        <div onClick={ctx.toggleMenu} className={"burger"}>
          <Hamburger rounded toggled={ctx.isMenuOpen} size={30} direction="right" color="#ffffff"/>
        </div>
        {
          access_token &&
          <div className='user-pole'>
            <div className="col-user-pole">
              <div className="avatar-user-pole">
                <Image loader={() => src} src={src} alt="avatar" width={75} height={75}/>
              </div>
            </div>
            <div className="col-user-pole">
              <p className="name-user-pole">
                {user?.name}
              </p>
              <p className="role-user-pole">
                {user?.role}
              </p>
            </div>
          </div> 
        }
        {
          access_token && <Link href="/profile" className="menu-item"><FaUserAlt />Профиль</Link>
        }
        {
          access_token | user?.role === 'Админ' && <Link href="/users" className="menu-item"><MdAdminPanelSettings />Админ панель</Link>
        }
        {
          access_token | user?.role === 'Преподаватель' && <Link href="/mycourses" className="menu-item"><IoIosSchool />Мои курсы</Link>
        }
        {
          access_token | user?.role === 'Ученик' && <Link href="/mycourses_student" className="menu-item"><IoIosSchool />Мои курсы</Link>
        }
        <Link href="/" className="menu-item"><AiFillHome />Главная</Link>
        <Link href="/courses" className="menu-item"><IoIosSchool />Курсы</Link>
        <Link href="/document.pdf" target="_blank" className="menu-item"><AiFillInfoCircle />Лицензионное соглашение</Link>
        {
          access_token ? <button className="menu-item logout-item" onClick={() => handleLogout()}><RiLogoutBoxFill />Выйти</button>
          : <Link href="/sign" className="menu-item"><GoSignIn />Войти</Link>
        }
    </Menu>
  )
}

export default Navbar
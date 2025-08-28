import React from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { FaCircleUser } from "react-icons/fa6";

const Header = () => {
  return (
    <header className='fixed top-0 left-0 right-0 flex items-center justify-between p-4'>
      <GiHamburgerMenu size={24}/>
      <div className='text-2xl font-bold'>
        Tokyo Ai Newsletter
      </div>
      <FaCircleUser size={24}/>
    </header>
  )
}

export default Header
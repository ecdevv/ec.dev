'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { HiMenu } from "react-icons/hi";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <header>
      <nav className = "fixed top-0 left-0 bg-white w-full h-[5rem] shadow-md z-[1]">
        <div className = "flex w-full h-full max-w-[88%] justify-between items-center p-2 mx-auto">
          <div className = "flex gap-x-1 items-end">
            <img
              src = "/favicon/android-chrome-256x256.png"
              width = "0"
              alt = "ec"
              className = "w-[3rem]"
            />
            <h1 className = "text-3xl font-extrabold">.dev</h1>
          </div>

          <ul className = "hidden lg:flex gap-x-12">
            <li><Link href = "#home" className = "font-openSans font-bold text-lg hover:text-[hsl(212,100%,53%)] transition-all ease-in-out duration-[200ms]">Home</Link></li>
            <li><Link href = "#about" className = "font-openSans font-bold text-lg hover:text-[hsl(212,100%,53%)] transition-all ease-in-out duration-[200ms]">About</Link></li>
            <li><Link href = "#portfolio" className = "font-openSans font-bold text-lg hover:text-[hsl(212,100%,53%)] transition-all ease-in-out duration-[200ms]">Portfolio</Link></li>
            <li><Link href = "#contact" className = "font-openSans font-bold text-lg hover:text-[hsl(212,100%,53%)] transition-all ease-in-out duration-[200ms]">Contact</Link></li>
          </ul>

          {/* <Navmenu/> */}

          <button onClick = {handleMenu} className = "lg:hidden">
            <HiMenu className = "w-[36px] h-auto"/>
          </button>
        </div>

        <div className = {`absolute w-[60%] h-full bg-gray-200 gap-4 transition-all duration-200 justify-center ${menuOpen ? 'right-0' : 'right-[-60%]'}`}>
          <ul className = "hidden lg:flex gap-x-12">
            <li><Link href = "#home" className = "font-openSans font-bold text-lg hover:text-[hsl(212,100%,53%)] transition-all ease-in-out duration-[200ms]">Home</Link></li>
            <li><Link href = "#about" className = "font-openSans font-bold text-lg hover:text-[hsl(212,100%,53%)] transition-all ease-in-out duration-[200ms]">About</Link></li>
            <li><Link href = "#portfolio" className = "font-openSans font-bold text-lg hover:text-[hsl(212,100%,53%)] transition-all ease-in-out duration-[200ms]">Portfolio</Link></li>
            <li><Link href = "#contact" className = "font-openSans font-bold text-lg hover:text-[hsl(212,100%,53%)] transition-all ease-in-out duration-[200ms]">Contact</Link></li>
          </ul>
        </div>

      </nav>
    </header>
  )
}

export default Navbar
'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { CSSTransition } from 'react-transition-group';
import { HiMenu } from "react-icons/hi";
import { VscClose } from "react-icons/vsc";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState('light');
  const [timeout, setTimeoutDuration] = useState(200);

  useEffect(() => {
    const selectedTheme = localStorage.getItem("theme");

    if (selectedTheme) {
      setTheme(selectedTheme);
      // document.body.classList.remove('light', 'dark');
      // document.body.classList.add(selectedTheme);
    } else {
      setTheme('light');
      // document.body.classList.remove('light', 'dark');
      // document.body.classList.add("light");
    }

    const updateTimeout = () => {
      const isLandscape = window.matchMedia("(orientation: landscape)").matches;
      setTimeoutDuration(isLandscape ? 300 : 200);
    };

    updateTimeout();
    window.addEventListener('resize', updateTimeout);

    return () => window.removeEventListener('resize', updateTimeout)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);

    document.body.classList.remove('light', 'dark');
    document.body.classList.add(newTheme);
  };

  const handleMobileMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <header>
      <nav className = "fixed top-0 left-0 bg-main w-full h-[5rem] shadow-md z-[10]">
        {/* Desktop Menu */}
        <div className = "flex w-full h-full max-w-[82.5%] justify-between items-center p-2 mx-auto">
          <Link href = "/#home" aria-label = "Home" className = "flex gap-x-1 items-end">
            <img
              src = "/favicon/android-chrome-256x256.png"
              width = "0"
              alt = "ec"
              className = "w-[3rem] h-full"
            />
            <h1 className = "text-3xl font-extrabold">.dev</h1>
          </Link>

          <div className = "hidden xl:flex gap-x-20 justify-center items-center">
            <ul className = "flex gap-x-12">
              <li><Link href = "/#home" aria-label = "Home" className = "font-openSans font-bold text-lg hover:text-[hsl(212,100%,53%)] transition-all ease-in-out duration-[200ms]">Home</Link></li>
              <li><Link href = "/#about" aria-label = "About Me" className = "font-openSans font-bold text-lg hover:text-[hsl(212,100%,53%)] transition-all ease-in-out duration-[200ms]">About</Link></li>
              <li><Link href = "/#portfolio" aria-label = "Portfolio" className = "font-openSans font-bold text-lg hover:text-[hsl(212,100%,53%)] transition-all ease-in-out duration-[200ms]">Portfolio</Link></li>
              <li><Link href = "/#contact" aria-label = "Contact" className = "font-openSans font-bold text-lg hover:text-[hsl(212,100%,53%)] transition-all ease-in-out duration-[200ms]">Contact</Link></li>
            </ul>
  
            {/* <div className = "flex lg:justify-start justify-center gap-x-4">
              <Link href = "https://www.linkedin.com/" aria-label = "LinkedIn" target = "_blank" rel = "noreferrer">
                <svg 
                  xmlns = "http://www.w3.org/2000/svg" 
                  viewBox = "0 0 16 16"
                  fill = "currentColor" 
                  className = "w-6 h-auto hover:fill-[hsl(212,100%,53%)] transition-all ease-in-out duration-[200ms]"
                >
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 01.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                </svg>
              </Link>
              <Link href = "https://github.com/ecdevv/" aria-label = "GitHub" target = "_blank" rel = "noreferrer">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox = "0 0 98 96"
                  fill = "currentColor"
                  className = "w-6 h-auto hover:fill-[hsl(212,100%,53%)] transition-all ease-in-out duration-[200ms]"
                >
                  <path fillRule = "evenodd" clipRule = "evenodd" d = "M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"/>
                </svg>
              </Link>
            </div> */}

            <button id = "Theme" onClick = {toggleTheme} aria-label = "Theme" className = "hidden absolute right-[3%] xl:flex justify-center items-center">
              <svg
                viewBox = "0 0 24 24"
                fill = "currentColor"
                className = "w-8 h-auto hover:fill-[hsl(212,100%,53%)] transition-all ease-in-out duration-[200ms]"
              >
                <path d = "M7.5 2c-1.79 1.15-3 3.18-3 5.5s1.21 4.35 3.03 5.5C4.46 13 2 10.54 2 7.5A5.5 5.5 0 017.5 2m11.57 1.5l1.43 1.43L4.93 20.5 3.5 19.07 19.07 3.5m-6.18 2.43L11.41 5 9.97 6l.42-1.7L9 3.24l1.75-.12.58-1.65L12 3.1l1.73.03-1.35 1.13.51 1.67m-3.3 3.61l-1.16-.73-1.12.78.34-1.32-1.09-.83 1.36-.09.45-1.29.51 1.27 1.36.03-1.05.87.4 1.31M19 13.5a5.5 5.5 0 01-5.5 5.5c-1.22 0-2.35-.4-3.26-1.07l7.69-7.69c.67.91 1.07 2.04 1.07 3.26m-4.4 6.58l2.77-1.15-.24 3.35-2.53-2.2m4.33-2.7l1.15-2.77 2.2 2.54-3.35.23m1.15-4.96l-1.14-2.78 3.34.24-2.2 2.54M9.63 18.93l2.77 1.15-2.53 2.19-.24-3.34z" />
              </svg>
            </button>
          </div>

          {/* <Navmenu/> */}
          <button id = "Mobile Menu" onClick = {handleMobileMenu} aria-label = "Mobile Menu" className = "xl:hidden">
            <HiMenu className = "sm:w-[40px] w-[36px] h-auto"/>
          </button>
        </div>
        
        {/* Mobile Menu */}
        <CSSTransition
          in = {menuOpen}
          timeout = {timeout}
          classNames = "menu"
          unmountOnExit
        >
          <div className = "xl:hidden absolute flex flex-col top-0 right-0 portrait:w-[66%] landscape:w-screen h-screen bg-navbarMobileColor gap-[2vh]">
            <div className = "absolute top-0 right-0 p-[3vh] landscape:p-[6vh]">
              <button id = "Close" onClick = {handleMobileMenu} aria-label = "Close">
                <VscClose className = "sm:w-[36px] w-[32px] h-auto"/>
              </button>
            </div>
            <ul className = "flex flex-col items-start portrait:gap-y-[6vh] landscape:gap-y-[10vh] landscape:m-auto portrait:p-[4vh] portrait:py-[8vh] landscape:p-[6vh] landscape:py-[8vh] ">
              <li>
                <Link onClick = {handleMobileMenu} href = "/#home" aria-label = "Home" className = "flex gap-x-4 font-openSans font-bold sm:text-xl text-lg hover:text-[hsl(212,100%,53%)] transition-all ease-in-out duration-[200ms]">
                  <svg
                    viewBox = "0 0 1024 1024"
                    fill = "currentColor"
                    className = "sm:w-7 w-6"
                  >
                    <path d = "M946.5 505L534.6 93.4a31.93 31.93 0 00-45.2 0L77.5 505c-12 12-18.8 28.3-18.8 45.3 0 35.3 28.7 64 64 64h43.4V908c0 17.7 14.3 32 32 32H448V716h112v224h265.9c17.7 0 32-14.3 32-32V614.3h43.4c17 0 33.3-6.7 45.3-18.8 24.9-25 24.9-65.5-.1-90.5z" />
                  </svg>
                  Home
                </Link>
              </li>
              <li>
                <Link onClick = {handleMobileMenu} href = "/#about" aria-label = "About Me" className = "flex gap-x-4 font-openSans font-bold sm:text-xl text-lg hover:text-[hsl(212,100%,53%)] transition-all ease-in-out duration-[200ms]">
                  <svg
                    viewBox = "0 0 16 16"
                    fill = "currentColor"
                    className = "sm:w-7 w-6"
                  >
                    <path d = "M12 0H4a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V2a2 2 0 00-2-2zm-1 7a3 3 0 11-6 0 3 3 0 016 0zm-3 4c2.623 0 4.146.826 5 1.755V14a1 1 0 01-1 1H4a1 1 0 01-1-1v-1.245C3.854 11.825 5.377 11 8 11z" />
                  </svg>
                  About
                </Link>
              </li>
              <li>
                <Link onClick = {handleMobileMenu} href = "/#portfolio" aria-label = "Portfolio" className = "flex gap-x-4 font-openSans font-bold sm:text-xl text-lg hover:text-[hsl(212,100%,53%)] transition-all ease-in-out duration-[200ms]">
                  <svg
                    viewBox = "0 0 24 24"
                    fill = "currentColor"
                    className = "sm:w-7 w-6"
                  >
                    <path d = "M20 6h-3V4c0-1.103-.897-2-2-2H9c-1.103 0-2 .897-2 2v2H4c-1.103 0-2 .897-2 2v3h20V8c0-1.103-.897-2-2-2zM9 4h6v2H9V4zm5 10h-4v-2H2v7c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2v-7h-8v2z" />
                  </svg>
                  Portfolio
                </Link>
              </li>
              <li>
                <Link onClick = {handleMobileMenu} href = "/#contact" aria-label = "Contact" className = "flex gap-x-4 font-openSans font-bold sm:text-xl text-lg hover:text-[hsl(212,100%,53%)] transition-all ease-in-out duration-[200ms]">
                  <svg
                    viewBox = "0 0 24 24"
                    fill = "currentColor"
                    className = "sm:w-7 w-6"
                  >
                    <path d = "M20 10.999h2C22 5.869 18.127 2 12.99 2v2C17.052 4 20 6.943 20 10.999z" />
                    <path d = "M13 8c2.103 0 3 .897 3 3h2c0-3.225-1.775-5-5-5v2zm3.422 5.443a1.001 1.001 0 00-1.391.043l-2.393 2.461c-.576-.11-1.734-.471-2.926-1.66-1.192-1.193-1.553-2.354-1.66-2.926l2.459-2.394a1 1 0 00.043-1.391L6.859 3.513a1 1 0 00-1.391-.087l-2.17 1.861a1 1 0 00-.29.649c-.015.25-.301 6.172 4.291 10.766C11.305 20.707 16.323 21 17.705 21c.202 0 .326-.006.359-.008a.992.992 0 00.648-.291l1.86-2.171a1 1 0 00-.086-1.391l-4.064-3.696z" />
                  </svg>
                  Contact
                </Link>
              </li>
            </ul>

           <div className = "flex flex-col justify-center items-center gap-[4vh]">
            <div className = "landscape:hidden flex lg:justify-start justify-center gap-x-4">
              <Link onClick = {handleMobileMenu} href = "https://www.linkedin.com/" aria-label = "LinkedIn" target = "_blank" rel = "noreferrer">
                <svg 
                  xmlns = "http://www.w3.org/2000/svg" 
                  viewBox = "0 0 16 16"
                  fill = "currentColor" 
                  className = "sm:w-8 w-7 h-auto hover:fill-[hsl(212,100%,53%)] transition-all ease-in-out duration-[200ms]"
                >
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 01.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                </svg>
              </Link>
              <Link onClick = {handleMobileMenu} href = "https://github.com/ecdevv/" aria-label = "GitHub" target = "_blank" rel = "noreferrer">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox = "0 0 98 96"
                  fill = "currentColor"
                  className = "sm:w-8 w-7 h-auto hover:fill-[hsl(212,100%,53%)] transition-all ease-in-out duration-[200ms]"
                >
                  <path fillRule = "evenodd" clipRule = "evenodd" d = "M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"/>
                </svg>
              </Link>
            </div>

            <button id = "Theme" onClick = {toggleTheme} aria-label = "Theme" className = "landscape:absolute h-sm:top-[10vh] top-[15vh] right-0 landscape:p-[6vh] flex justify-center items-center">
              <svg
                viewBox = "0 0 24 24"
                fill = "currentColor"
                className = "w-10 h-auto hover:fill-[hsl(212,100%,53%)] transition-all ease-in-out duration-[200ms]"
              >
                <path d = "M7.5 2c-1.79 1.15-3 3.18-3 5.5s1.21 4.35 3.03 5.5C4.46 13 2 10.54 2 7.5A5.5 5.5 0 017.5 2m11.57 1.5l1.43 1.43L4.93 20.5 3.5 19.07 19.07 3.5m-6.18 2.43L11.41 5 9.97 6l.42-1.7L9 3.24l1.75-.12.58-1.65L12 3.1l1.73.03-1.35 1.13.51 1.67m-3.3 3.61l-1.16-.73-1.12.78.34-1.32-1.09-.83 1.36-.09.45-1.29.51 1.27 1.36.03-1.05.87.4 1.31M19 13.5a5.5 5.5 0 01-5.5 5.5c-1.22 0-2.35-.4-3.26-1.07l7.69-7.69c.67.91 1.07 2.04 1.07 3.26m-4.4 6.58l2.77-1.15-.24 3.35-2.53-2.2m4.33-2.7l1.15-2.77 2.2 2.54-3.35.23m1.15-4.96l-1.14-2.78 3.34.24-2.2 2.54M9.63 18.93l2.77 1.15-2.53 2.19-.24-3.34z" />
              </svg>
            </button>
           </div>
          </div>
        </CSSTransition>
      </nav>
    </header>
  )
}

export default Navbar
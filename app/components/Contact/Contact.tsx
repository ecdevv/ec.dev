import Link from 'next/link'
import React from 'react'

const Contact = () => {
  return (
    <section id = "contact" className = "bg-secondaryColor lg:py-[8rem] sm:py-[5rem] py-[5rem]">
      <div className = "xl:max-w-[75rem] mx-auto">
        <div className = "flex flex-col items-center lg:gap-y-10 gap-y-6 xl:px-6 lg:px-10 px-6">
          <h2>CONTACT</h2>

          <div className = "flex flex-col items-center gap-y-10">
            <div className = "flex flex-col items-center justify-center gap-y-2">
              <div className = "flex justify-center items-center w-[3rem] h-[3rem] rounded-[100%] shadow-[0_0px_10px_0px_rgba(0,0,0,.1)] bg-contactIconBGColor">
                <svg
                  viewBox = "0 0 24 24"
                  fill = "currentColor"
                  className = "w-[2.25rem]"
                >
                  <path d = "M12 2c3.31 0 6 2.66 6 5.95C18 12.41 12 19 12 19S6 12.41 6 7.95C6 4.66 8.69 2 12 2m0 4a2 2 0 00-2 2 2 2 0 002 2 2 2 0 002-2 2 2 0 00-2-2m8 13c0 2.21-3.58 4-8 4s-8-1.79-8-4c0-1.29 1.22-2.44 3.11-3.17l.64.91C6.67 17.19 6 17.81 6 18.5c0 1.38 2.69 2.5 6 2.5s6-1.12 6-2.5c0-.69-.67-1.31-1.75-1.76l.64-.91C18.78 16.56 20 17.71 20 19z" />
                </svg>
              </div>
              
              <div className = "flex flex-col items-center">
                <h3>Location</h3>
                <span>Houston, Texas</span>
              </div>
            </div>
  
            <div className = "flex flex-col items-center justify-center gap-y-2">
              <Link href = "mailto:ech2447@gmail.com" aria-label = "Email" target = "_blank" className = "group cursor-pointer flex justify-center items-center w-[3rem] h-[3rem] rounded-[100%] shadow-[0_0px_10px_0px_rgba(0,0,0,.1)] bg-contactIconBGColor hover:bg-white transition-all ease-in-out duration-200">
                <svg
                  viewBox = "0 0 1024 1024"
                  fill = "currentColor"
                  className = "w-[2rem] group-hover:fill-[hsl(212,100%,53%)] transition-all ease-in-out duration-200"
                >
                  <path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-80.8 108.9L531.7 514.4c-7.8 6.1-18.7 6.1-26.5 0L189.6 268.9A7.2 7.2 0 01194 256h648.8a7.2 7.2 0 014.4 12.9z" />
                </svg>
              </Link>

              <div className = "flex flex-col items-center">
                <h3>Email</h3>
                <Link href = "mailto:ech2447@gmail.com" aria-label = "Email" target = "_blank">
                  <span className = "hover:text-[hsl(212,100%,53%)] transition-all ease-in-out duration-200">ech2447@gmail.com</span>
                </Link>
              </div>
            </div>

            <div className = "flex flex-col items-center justify-center gap-y-2">
              <Link href = "https://www.linkedin.com/" aria-label = "LinkedIn" target = "_blank" className = "group cursor-pointer flex justify-center items-center w-[3rem] h-[3rem] rounded-[100%] shadow-[0_0px_10px_0px_rgba(0,0,0,.1)] bg-contactIconBGColor hover:bg-white transition-all ease-in-out duration-200">
                <svg
                  viewBox = "0 0 16 16"
                  fill = "currentColor"
                  className = "w-[1.75rem] group-hover:fill-[hsl(212,100%,53%)] transition-all ease-in-out duration-200"
                >
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 01.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                </svg>
              </Link>

              <div className = "flex flex-col items-center">
                <h3>LinkedIn</h3>
                <Link href = "https://www.linkedin.com/" aria-label = "LinkedIn" target = "_blank">
                  <span className = "hover:text-[hsl(212,100%,53%)] transition-all ease-in-out duration-200">My Profile</span>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Contact
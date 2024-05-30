import Link from 'next/link'
import React from 'react'

const Contact = () => {
  return (
    <section id = "contact" className = "bg-[var(--secondary-color)] lg:py-[8rem] sm:py-[5rem] py-[5rem]">
      <div className = "xl:max-w-[75rem] mx-auto">
        <div className = "flex flex-col items-center lg:gap-y-16 gap-y-12 xl:px-6 lg:px-10 px-6">
          <h2>CONTACT</h2>

          <div className = "flex flex-col items-center gap-y-6">
            <div className = "group flex flex-col items-center justify-center gap-y-2">
              <svg
                viewBox = "0 0 1024 1024"
                fill = "currentColor"
                className = "w-12 p-2 rounded-[100%] shadow-[0_0px_10px_0px_rgba(0,0,0,.1)]"
              >
                <path d = "M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 110.8V792H136V270.8l-27.6-21.5 39.3-50.5 42.8 33.3h643.1l42.8-33.3 39.3 50.5-27.7 21.5zM833.6 232L512 482 190.4 232l-42.8-33.3-39.3 50.5 27.6 21.5 341.6 265.6a55.99 55.99 0 0068.7 0L888 270.8l27.6-21.5-39.3-50.5-42.7 33.2z" />
              </svg>
              
              <div className = "flex flex-col items-center">
                <h3>Location</h3>
                <span>Houston, Texas</span>
              </div>
            </div>
  
            <div className = "group flex flex-col items-center justify-center gap-y-2">
              <Link href = "mailto:ech2447@gmail.com" aria-label = "Contact Email" target = "_blank">
                <svg
                  viewBox = "0 0 1024 1024"
                  fill = "currentColor"
                  className = "cursor-pointer w-12 p-2 rounded-[100%] shadow-[0_0px_10px_0px_rgba(0,0,0,.1)] hover:fill-[hsl(212,100%,53%)] transition-all ease-in-out duration-200"
                >
                  <path d = "M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 110.8V792H136V270.8l-27.6-21.5 39.3-50.5 42.8 33.3h643.1l42.8-33.3 39.3 50.5-27.7 21.5zM833.6 232L512 482 190.4 232l-42.8-33.3-39.3 50.5 27.6 21.5 341.6 265.6a55.99 55.99 0 0068.7 0L888 270.8l27.6-21.5-39.3-50.5-42.7 33.2z" />
                </svg>
              </Link>

              <div className = "flex flex-col items-center">
                <h3>Email</h3>
                <Link href = "mailto:ech2447@gmail.com" aria-label = "Contact Email" target = "_blank">
                  <span className = "hover:text-[hsl(212,100%,53%)] transition-all ease-in-out duration-200">ech2447@gmail.com</span>
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
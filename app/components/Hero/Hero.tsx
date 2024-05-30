import React from 'react'
import Link from 'next/link'

const Hero = () => {
  return (
    <section id = "home" className = "overflow-hidden bg-[var(--primary-color)] w-full lg:h-screen h-auto lg:max-h-[120rem] lg:min-h-[60rem] lg:py-[15rem] lg:pt-[20rem] py-[10rem]">
      <div className = "relative flex lg:flex-row flex-col-reverse xl:max-w-[65rem] mx-auto lg:justify-between justify-center items-center gap-y-8 xl:px-6 lg:px-10 px-6"> 

        <div className = "flex flex-col lg:max-w-[60%] lg:mr-[6rem] gap-y-6 lg:items-start items-center">
          <div className = "flex flex-col lg:text-left text-center gap-y-[1rem] lg:items-start items-center">
            <h1 className = "font-raleway font-extrabold lg:text-6xl text-2.5rem">
              Hello, I&apos;m Eric Chour
            </h1>
  
            <p className = "lg:max-w-[95%] sm:max-w-[80%] text-lg">
              I&apos;m a CS graduate with a keen interest in web development based in Houston, Texas! 📍
            </p>

            <Link href = "/resume" target = "_blank" className = "group flex justify-center items-center py-2 px-4 gap-x-2 border border-gray-300 shadow bg-gray-100 hover:bg-white active:bg-gray-200 transition-all ease-in-out duration-[200ms]">
              <span className = "group-hover:text-[hsl(212,100%,53%)] group-active:translate-y-[0.1rem] transition-all ease-in-out duration-[200ms]">
                Download CV
              </span>
              <svg
                  fill="currentColor"
                  viewBox="0 0 512 512"
                  className = "w-[2rem] h-full group-hover:fill-[hsl(212,100%,53%)] group-active:translate-y-[0.1rem] transition-all ease-in-out duration-[200ms]"
              >
                  <path d ="M276.239,252.183c-6.37,2.127-13.165,3.308-20.239,3.308c-7.074,0-13.87-1.181-20.24-3.308
                  c-46.272,7.599-70.489,41.608-70.489,82.877H256h90.728C346.728,293.791,322.515,259.782,276.239,252.183z"/>
                  <path d ="M256,240.788c27.43,0,49.658-22.24,49.658-49.666v-14.087c0-27.426-22.228-49.659-49.658-49.659
                  c-27.43,0-49.658,22.233-49.658,49.659v14.087C206.342,218.548,228.57,240.788,256,240.788z"/>
                  <path d ="M378.4,0H133.582C86.234,0,47.7,38.542,47.7,85.899v340.22C47.7,473.476,86.234,512,133.582,512h205.695
                  h13.175l9.318-9.301l93.229-93.229l9.301-9.31v-13.174V85.899C464.3,38.542,425.766,0,378.4,0z M432.497,386.985H384.35
                  c-24.882,0-45.074,20.183-45.074,45.073v48.139H133.582c-29.866,0-54.078-24.221-54.078-54.078V85.899
                  c0-29.874,24.212-54.096,54.078-54.096H378.4c29.876,0,54.096,24.222,54.096,54.096V386.985z"/>
              </svg>
            </Link>

            <Link href = "#about" className = "group flex italic lg:justify-start justify-center gap-x-2 transition-all ease-in-out duration-[200ms]" >
              <span className = "text-lg group-hover:text-[hsl(212,100%,53%)] transition-all ease-in-out duration-[200ms]">
                Click to learn more!
              </span>
              <svg
                fill="var(--base-text-color)"
                viewBox="0 0 16 16"
                className = "animate-translateX w-[1.5rem] h-full group-hover:fill-[hsl(212,100%,53%)] transition-all ease-in-out duration-[200ms]"
              >
                <path
                  fillRule="evenodd"
                  d="M1 8a.5.5 0 01.5-.5h11.793l-3.147-3.146a.5.5 0 01.708-.708l4 4a.5.5 0 010 .708l-4 4a.5.5 0 01-.708-.708L13.293 8.5H1.5A.5.5 0 011 8z"
                />
              </svg>
            </Link>
          </div>
  
          {/* <span className = "lg:absolute bottom-0 flex lg:justify-start justify-center gap-x-4">
            <Link href = "https://www.linkedin.com/" aria-label = "github" target = "_blank" rel = "noreferrer">
              <svg 
                xmlns = "http://www.w3.org/2000/svg" 
                viewBox = "0 0 24 24"
                fill = "currentColor" 
                className = "w-10 h-auto transition-all ease-in-out hover:fill-[hsl(212,100%,53%)] hover:duration-[200ms]"
              >
                <path d="M6.5 8C7.32843 8 8 7.32843 8 6.5C8 5.67157 7.32843 5 6.5 5C5.67157 5 5 5.67157 5 6.5C5 7.32843 5.67157 8 6.5 8Z"/>
                <path d="M5 10C5 9.44772 5.44772 9 6 9H7C7.55228 9 8 9.44771 8 10V18C8 18.5523 7.55228 19 7 19H6C5.44772 19 5 18.5523 5 18V10Z"/>
                <path d="M11 19H12C12.5523 19 13 18.5523 13 18V13.5C13 12 16 11 16 13V18.0004C16 18.5527 16.4477 19 17 19H18C18.5523 19 19 18.5523 19 18V12C19 10 17.5 9 15.5 9C13.5 9 13 10.5 13 10.5V10C13 9.44771 12.5523 9 12 9H11C10.4477 9 10 9.44772 10 10V18C10 18.5523 10.4477 19 11 19Z"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M20 1C21.6569 1 23 2.34315 23 4V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H20ZM20 3C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H20Z"/>
              </svg>
            </Link>
            <Link href = "https://github.com/ech2k20/" aria-label = "github" target = "_blank" rel = "noreferrer">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox = "0 0 98 96"
                fill = "currentColor" 
                className = "w-10 h-auto transition-all ease-in-out hover:fill-[hsl(212,100%,53%)] hover:duration-[200ms]"
              >
                <path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"/>
              </svg>
            </Link>
          </span> */}
        </div>

        <div className = "bg-hero lg:w-[19rem] lg:h-[21.5rem] lg:min-w-[19rem] w-[15rem] h-[17rem] min-w-[15rem] bg-cover bg-no-repeat bg-center border-[3px] border-gray-800 rounded-[50%]"></div>

        {/* <div className = "lg:absolute static order-first flex flex-col lg:max-w-[100%] sm:max-w-[60%] left-0 bottom-[10rem] lg:mt-0 mt-10 gap-y-4">
          <span className = "lg:w-[64rem] h-[2px] bg-gradient-to-r from-gray-400 to-transparent"></span>
          
          <div className = "flex lg:flex-row flex-col items-center">
            <p className = "lg:text-left text-center lg:pr-[2vw] lg:border-r-2 lg:border-b-0 border-b-2 border-gray-400 font-raleway font-bold text-lg text-[#262626]">Current Stack</p>
  
            <ul className = "flex lg:flex-nowrap flex-wrap lg:pl-[4vw] lg:gap-[2vw] sm:gap-[3vw] gap-[6vw] lg:mt-0 mt-[1.5rem] justify-center items-center ">
              <li>
                <Link href = "https://skillicons.dev/" rel = "noreferrer" target = "_blank">
                  <img
                    src = "https://skillicons.dev/icons?i=html,css"
                    width = "full"
                    alt = "HTML and CSS Logos"
                    className = "cursor-pointer hover:translate-y-[-1vh] transition-all ease-in-out duration-[350ms]"
                    fetchPriority = "low"
                    loading = "lazy"
                    decoding = "async"
                  >
                  </img>
                </Link>
              </li>
              <li>
                <Link href = "https://skillicons.dev/" rel = "noreferrer" target = "_blank">
                  <img
                    src = "https://skillicons.dev/icons?i=js,ts"
                    width = "full"
                    alt = "JS and TS Logos"
                    className = "cursor-pointer hover:translate-y-[-1vh] transition-all ease-in-out duration-[350ms]"
                    fetchPriority = "low"
                    loading = "lazy"
                    decoding = "async"
                  >
                  </img>
                </Link>
              </li>
              <li>
                <Link href = "https://skillicons.dev/" rel = "noreferrer" target = "_blank">
                  <img
                    src = "https://skillicons.dev/icons?i=react,next"
                    width = "full"
                    alt = "React.js and Next.js Logos"
                    className = "cursor-pointer hover:translate-y-[-1vh] transition-all ease-in-out duration-[350ms]"
                    fetchPriority = "low"
                    loading = "lazy"
                    decoding = "async"
                  >
                  </img>
                </Link>
              </li>
              <li>
                <Link href = "https://skillicons.dev/" rel = "noreferrer" target = "_blank">
                  <img
                    src = "https://skillicons.dev/icons?i=tailwind,scss"
                    width = "full"
                    alt = "Tailwind CSS and SCSS Logos"
                    className = "cursor-pointer hover:translate-y-[-1vh] transition-all ease-in-out duration-[350ms]"
                    fetchPriority = "low"
                    loading = "lazy"
                    decoding = "async"
                  >
                  </img>
                </Link>
              </li>
              <li>
                <Link href = "https://skillicons.dev/" rel = "noreferrer" target = "_blank">
                  <img
                    src = "https://skillicons.dev/icons?i=express,mysql"
                    width = "full"
                    alt = "Express and MySQL Logos"
                    className = "cursor-pointer hover:translate-y-[-1vh] transition-all ease-in-out duration-[350ms]"
                    fetchPriority = "low"
                    loading = "lazy"
                    decoding = "async"
                  >
                  </img>
                </Link>
              </li>
            </ul>
          </div>
        </div> */}

      </div>
    </section>
  )
}

export default Hero
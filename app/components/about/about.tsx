import React from 'react'
import Link from 'next/link'
import { FaGraduationCap } from "react-icons/fa";
import { PiBrowsersDuotone } from "react-icons/pi";
import { FaExchangeAlt } from "react-icons/fa";
import { HiServerStack } from "react-icons/hi2";
import { GiGamepad } from "react-icons/gi";
import { PiMusicNotesFill } from "react-icons/pi";
import { FaBasketball } from "react-icons/fa6";

const About = () => {
  return (
    <section id = "about" className = "bg-white w-full h-auto lg:py-[8rem] sm:py-[5rem] py-[5rem]">
      <div className = "xl:max-w-[75rem] mx-auto">
        <div className = "flex flex-col lg:gap-y-16 gap-y-12 p-6">    
          <h2 className = "flex flex-col items-center">
            ABOUT ME
          </h2>

          <div className = "flex lg:flex-row flex-col items-center lg:gap-x-12 gap-y-6 lg:px-0 sm:px-12">
            <img
                src = '/images/lelouch.jpg'
                width = "0"
                alt = "Picture"
                className = "lg:w-[500px] lg:h-[500px] w-[20rem] h-[20rem] object-cover rounded-[2rem]"
                fetchPriority = "low"
                loading = "lazy"
                decoding = "async"
            />
            
            <div className = "flex flex-col lg:gap-y-6 gap-y-6 lg:items-start items-center lg:text-start text-center">
              <div className = "flex lg:flex-nowrap flex-wrap w-full gap-2">
                {/* <div className = "flex flex-col justify-center items-center text-center w-full h-[8rem] p-6 py-4 rounded-[2rem] bg-gray-50 border border-gray-300 shadow">
                  <FaGraduationCap className = "w-[40px] h-auto shrink-0"/>
                  <h3 className = "text-lg">
                    6 Years in Software Development
                  </h3>
                </div> */}

                <div className = "flex flex-col justify-center items-center text-center w-full h-[8rem] p-6 rounded-[2rem] bg-gray-50 border border-gray-300 shadow">
                  <FaGraduationCap className = "w-[40px] h-auto shrink-0"/>
                  <h3 className = "text-lg flex-1">
                    B.Sc. in Computer Science <br/>
                    Minor in Mathematics
                  </h3>
                </div>
              </div>

              <p>
                Hi, I&apos;m 
                  Eric, an aspiring web developer with a
                  Bachelor&apos;s degree in Computer Science and a
                  minor in Mathematics from the
                  University of Houston, class of
                  2023.
              </p>

              <p>
                I have a solid foundation in web development, proficiency in
                  HTML,
                  CSS,
                  JavaScript, and
                  TypeScript.
                I also have hands-on experience with frameworks and technologies such as
                  React,
                  Next.js,
                  Express, and
                  MySQL.
              </p>

              <div className = "flex lg:flex-nowrap flex-wrap lg:max-w-full sm:max-w-[60%] max-w-[80%] lg:mt-[-1.25rem] mt-[-1rem] ml-[-0.2rem] lg:justify-start justify-center gap-x-2 gap-y-[2vw]">
                <PiBrowsersDuotone className = "w-[40px] h-auto "/>
                <FaExchangeAlt className = "w-[35px] h-auto"/>
                <HiServerStack className = "w-[35px] h-auto"/>
              </div>

              <p>
                Beyond web development, I have a passion for
                  game development,
                  video games,
                  music, and
                  basketball,
                which help me stay creative and balanced!
              </p>

              <div className = "flex lg:flex-nowrap flex-wrap lg:max-w-full sm:max-w-[60%] max-w-[80%] lg:mt-[-1rem] mt-[-0.75rem] lg:justify-start justify-center gap-x-2 gap-y-[2vw]">
                <img
                    src = "https://skillicons.dev/icons?i=unreal"
                    width = "40"
                    alt = "Unreal Engine Logo"
                    className = "w-[35px] h-auto"
                    fetchPriority = "low"
                    loading = "lazy"
                    decoding = "async"
                />
                <GiGamepad className = "w-[45px] h-auto"/>
                <PiMusicNotesFill className = "w-[35px] h-auto"/>
                <FaBasketball className = "w-[30px] h-auto"/>
              </div>
            </div>
          </div>

          <Link href = "#portfolio" className = "group flex italic lg:self-end self-center gap-x-2 transition-all ease-in-out duration-[200ms]">
            <span className = "text-lg group-hover:text-[hsl(212,100%,53%)] transition-all ease-in-out duration-[200ms]">
              Click to see my projects!
            </span>
            <svg
              fill="var(--base-text-color2)"
              viewBox="0 0 16 16"
              className = "animate-translateX w-[1.5rem] h-full group-hover:fill-[hsl(212,100%,53%)] transition-all ease-in-out duration-[200ms]"
            >
              <path
                fillRule="evenodd"
                d="M1 8a.5.5 0 01.5-.5h11.793l-3.147-3.146a.5.5 0 01.708-.708l4 4a.5.5 0 010 .708l-4 4a.5.5 0 01-.708-.708L13.293 8.5H1.5A.5.5 0 011 8z"
              />
            </svg>
          </Link>

          <div className = "lg:hidden flex flex-col items-center lg:gap-y-4 gap-y-6">
            <h3 className = "flex flex-col font-raleway items-center">
              Experience
              <span className = "lg:w-[200%] sm:w-[120%] w-[120%] h-[2px] bg-gradient-radial from-gray-400 to-transparent"></span>
            </h3>

            <div className = "flex lg:flex-row flex-col sm:max-w-[80%] justify-center">   
              <ul className = "flex lg:flex-nowrap flex-wrap lg:gap-[2vw] sm:gap-[3vw] gap-[6vw] justify-center items-center ">
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
          </div>

        </div>      

      </div>
    </section>
  )
}

export default About
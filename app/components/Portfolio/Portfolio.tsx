import React from 'react'
import Layout from './Layout'
import Projects from './Projects'

export const Portfolio = () => {
  return (
    <section id = "portfolio" className = "bg-primaryColor w-full h-auto lg:py-[8rem] sm:py-[5rem] py-[5rem]">
      <div className = "xl:max-w-[75rem] mx-auto">
        <div className = "flex flex-col items-center lg:gap-y-10 gap-y-12 xl:px-6 lg:px-10 px-4">
          <div className = "flex flex-col w-full justify-center items-center gap-y-6">
            <h2>PORTFOLIO</h2>
            <Layout/>
          </div>

          <div className = "flex justify-center">
            <Projects/>
          </div>
        </div>
      </div>
    </section>
  )
}

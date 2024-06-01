import React from 'react'
import Image from 'next/image'

const Custom404 = () => {
  return (
    <section id = "404" className = "overflow-hidden bg-primaryColor w-full h-screen lg:max-h-[120rem] lg:min-h-[60rem] flex justify-center items-center lg:pt-0 pt-[5rem]">
      <div className = "w-[25rem] m-auto">
        <div className = "flex flex-col items-center text-center gap-y-4">
          <Image
            src = "/images/404.png"
            alt = "404"
            width = {198}
            height = {162}
            className = "object-contain rounded-[2rem]"
          />
          <h1 className = "font-poppins font-[600] lg:text-4xl text-4xl">404 PAGE NOT FOUND</h1>
        </div>
      </div>
    </section>
  )
}

export default Custom404
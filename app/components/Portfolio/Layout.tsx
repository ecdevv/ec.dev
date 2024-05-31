'use client'
import React, { useEffect } from 'react'
import { useContextAPI } from '../Context/Context';

const Layout = () => {
  const {setLayoutState} = useContextAPI();

  useEffect(() => {
    const screenSize = window.innerWidth < 1024 ? 'small' : 'large';
    screenSize === 'small' ? setLayoutState('full') : setLayoutState('grid')
  }, []);

  const handleLayoutGrid = () => {
    setLayoutState('grid')
  }

  const handleLayoutFull = () => {
    setLayoutState('full')
  }
  
  return (
    <div className = "flex gap-x-2">
      <button onClick = {handleLayoutGrid}>
        <svg
          viewBox = "0 0 512 512"
          fill = "currentColor"
          className = "w-[2rem] h-auto cursor-pointer hover:fill-[hsl(0,0%,75%)] hover:scale-110"
        >
          <path d = "M240 240H32V32h208zM480 240H272V32h208zM240 480H32V272h208zM480 480H272V272h208z" />
        </svg>
      </button>

      <button onClick = {handleLayoutFull}>
        <svg
          viewBox = "0 0 24 24"
          fill = "currentColor"
          className = "w-[2.75rem] h-auto cursor-pointer hover:fill-[hsl(0,0%,75%)] hover:scale-110"
        >
          <path d = "M18 6v11h4V6M2 17h4V6H2m5 13h10V4H7v15z" />
        </svg>
      </button>
    </div>
  )
}

export default Layout
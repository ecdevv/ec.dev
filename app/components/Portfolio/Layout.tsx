'use client'
import React, { useEffect } from 'react'
import { useContextAPI } from '../Context/Context';

const Layout = () => {
  const {setLayoutState} = useContextAPI();

  useEffect(() => {
    const screenSize = window.innerWidth < 1024 ? 'small' : 'large';
    screenSize === 'small' ? setLayoutState('full') : setLayoutState('grid')
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Intentionally empty dependency array to run effect only once

  const handleLayoutGrid = () => {
    setLayoutState('grid')
  }

  const handleLayoutFull = () => {
    setLayoutState('full')
  }
  
  return (
    <div className = "flex gap-x-2">
      <button id = "Grid" onClick = {handleLayoutGrid} aria-label = "Grid">
        <svg
          viewBox = "0 0 512 512"
          fill = "currentColor"
          className = "w-[2rem] h-auto cursor-pointer hover:scale-[1.15] transition-all ease-in-out duration-200"
        >
          <path d = "M240 240H32V32h208zM480 240H272V32h208zM240 480H32V272h208zM480 480H272V272h208z" />
        </svg>
      </button>

      <button id = "Full" onClick = {handleLayoutFull} aria-label = "Full Grid">
        <svg
          viewBox = "0 0 56 56"
          fill = "currentColor"
          className = "w-[2rem] h-auto cursor-pointer hover:scale-[1.15] transition-all ease-in-out duration-200 rotate-90"
        >
          <path d = "M 8.0663 26.0664 L 47.9334 26.0664 C 51.5195 26.0664 53.3243 24.3086 53.3243 20.6992 L 53.3243 11.7461 C 53.3243 8.1602 51.5195 6.4258 47.9334 6.4258 L 8.0663 6.4258 C 4.4804 6.4258 2.6757 8.1602 2.6757 11.7461 L 2.6757 20.6992 C 2.6757 24.3086 4.4804 26.0664 8.0663 26.0664 Z M 8.0663 49.5742 L 47.9334 49.5742 C 51.5195 49.5742 53.3243 47.8399 53.3243 44.2305 L 53.3243 35.2539 C 53.3243 31.6914 51.5195 29.9336 47.9334 29.9336 L 8.0663 29.9336 C 4.4804 29.9336 2.6757 31.6914 2.6757 35.2539 L 2.6757 44.2305 C 2.6757 47.8399 4.4804 49.5742 8.0663 49.5742 Z"/>
        </svg>
      </button>
    </div>
  )
}

export default Layout
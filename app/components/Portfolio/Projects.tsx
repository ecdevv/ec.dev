'use client'
import React, { useEffect, useState } from 'react';
import projectsData from '../../data/projects.json';
import { CSSTransition } from 'react-transition-group';
import { useContextAPI } from '../Context/Context';
import PopupMenu from '../PopupMenu/PopupMenu';


interface Project {
  id: number;
  image: string;
  title: string;
  description: string;
  l_description: string;
  s_description: string;
  start_date: string;
  end_date: string;
  techs: string;
  link: string;
  link2: string;
}

const Projects = () => {
  const {toggleDimmer, togglePopupMenu, setMenuContent, setMenuContentData, layoutState, setLayoutState} = useContextAPI();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showFirst, setShowFirst] = useState(layoutState === 'grid');
  const [showSecond, setShowSecond] = useState(layoutState === 'full');

  useEffect(() => {
    if (layoutState === 'grid') {
      setShowSecond((prevShowSecond) => {
        if (prevShowSecond) {
          return false;
        }
        setShowFirst(true);
        return prevShowSecond;
      });
    } else if (layoutState === 'full') {
      setShowFirst((prevShowFirst) => {
        if (prevShowFirst) {
          return false;
        }
        setShowSecond(true);
        return prevShowFirst;
      });
    }
  }, [layoutState]);

  const handleFirstExited = () => {
    if (layoutState === 'full') {
      setShowSecond(true);
    }
  };

  const handleSecondExited = () => {
    if (layoutState === 'grid') {
      setShowFirst(true);
    }
  };

  if (!projectsData.length) {
    setLayoutState('disabled')
  }

  const handleMenu = (project:Project) => {
    setMenuOpen(!menuOpen)
    toggleDimmer()
    togglePopupMenu()
    setMenuContentData(projectsData)
    setMenuContent(project)
  }

  /* project.image should try to be 320x256 */
  /* project.descrition/menuContent.description shouldn't exceed 325 characters if possible */
  return (
    <>
      <div className = {layoutState === 'disabled'
        ? "text-center"
        : "hidden"
      }>
        <h2>
          New projects coming soon!
        </h2>
      </div>

      <CSSTransition
        in = {showFirst}
        timeout = {200}
        classNames = "fade"
        unmountOnExit
        onExited = {handleFirstExited}
      >
        <div className = "w-full flex flex-wrap gap-4 justify-center">
          {projectsData.map((project:Project) => (
            <div key = {project.id} onClick = {() => {handleMenu(project)}} className = "group relative cursor-pointer lg:w-[20rem] lg:h-[16rem] sm:w-[15rem] sm:h-[12rem] w-[10rem] h-[8rem] border-[1px] border-secondaryBorderColor bg-projectBG rounded-[2rem]">
              <img
                src = {project.image}
                alt = {project.title}
                className = "relative w-full h-full object-cover object-top rounded-[2rem]"
                fetchPriority = "low"
                loading = "lazy"
                decoding = "async"
              />

              <div className = "absolute inset-0 flex items-end bg-[black] bg-opacity-50 opacity-0 group-hover:opacity-100 transition-all duration-200 rounded-[2rem]">
                {project && (
                  <div className = "flex flex-col w-full items-start p-5 gap-2">
                    <span className = "flex flex-col text-start gap-1">
                      <span className = "flex flex-col">
                        <h2 className = "sm:text-lg text-sm text-white">{project.title}</h2>
                      </span>
                      <p className = "sm:text-sm text-xs text-gray-200">{project.s_description}</p>
                    </span>
                    <div className = "flex items-center gap-2">
                      {project.techs.replace(/\./g, '').split(/[ ,]+/).map((tech:string, index) => (
                        <img
                          key = {index}
                          src = {`https://skillicons.dev/icons?i=${tech.toLowerCase()}`}
                          alt = {tech}
                          className = "sm:w-[28px] sm:h-[28px] w-[20px] h-[20px]"
                          fetchPriority = "low"
                          loading = "lazy"
                          decoding = "async"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CSSTransition>
      
      <CSSTransition
        in = {showSecond}
        timeout = {200}
        classNames = "fade"
        unmountOnExit
        onExited = {handleSecondExited}
      >
        <div className = "w-full flex flex-wrap gap-4 justify-center items-center">
          {projectsData.map((project:Project) => (
            <div key = {project.id} onClick = {() => {handleMenu(project)}} className = "cursor-pointer flex flex-col w-[20rem] h-[30rem] border-[1px] border-secondaryBorderColor bg-projectBG hover:bg-primaryColor rounded-[2rem] transition-all duration-200">
              <img
                src = {project.image}
                alt = {project.title}
                className = "w-full h-[40%] self-start object-cover object-top rounded-t-[2rem]"
                fetchPriority = "low"
                loading = "lazy"
                decoding = "async"
              />

              <div className = "flex flex-col w-full self-start justify-center items-center text-center gap-y-5 p-4 py-6">
                {(project.title || project.description)
                ? <>
                    <span className = "flex flex-col gap-3">
                      <h2 className = "relative sm:text-xl text-lg">{project.title}</h2>
                      <p className = "relative sm:text-base text-base">{project.description}</p>
                    </span>
                  </>
                : <></>
                }
                {project.techs 
                ? <span className = "flex items-center gap-2">
                    {project.techs.replace(/\./g, '').split(/[ ,]+/).map((tech:string, index) => (
                      <img
                        key = {index}
                        src = {`https://skillicons.dev/icons?i=${tech.toLowerCase()}`}
                        alt = {tech}
                        className = "sm:w-[36px] sm:h-[36px] w-[32px] h-[32px]"
                        fetchPriority = "low"
                        loading = "lazy"
                        decoding = "async"
                      />
                    ))}
                  </span>
                : <></>
                }
              </div>
            </div>
          ))}
        </div>
      </CSSTransition>

      <PopupMenu/>
    </>
    
  )
}

export default Projects
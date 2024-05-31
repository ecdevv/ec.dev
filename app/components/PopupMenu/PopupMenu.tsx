import React, {useEffect, useState} from 'react'
import Link from 'next/link';
import { useSwipeable } from 'react-swipeable';
import { useContextAPI } from '../Context/Context'
import { VscClose } from 'react-icons/vsc'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const PopupMenu = () => {
  const {dimmerState, toggleDimmer, popupMenuState, togglePopupMenu, menuContent, setMenuContent, menuContentData} = useContextAPI()
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState('');

  useEffect(() => {
    if (dimmerState) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [dimmerState])

  useEffect(() => {
    setCurrentIndex(menuContent ? menuContent.id - 1 : 0 )
    if (!popupMenuState) {
      setSlideDirection('')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [popupMenuState])  // This is only meant to run as soon as this menu is popped in order to set the initial index.

  useEffect(() => {
    setMenuContent(menuContentData[currentIndex])

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex])  // This only meant to update the current contents of the menu open by updating when the index changes.

  const handleClose = () => {
    toggleDimmer()
    togglePopupMenu()
  }

  const handlePrevClick = () => {
    setSlideDirection('slide-right');
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + menuContentData.length) % menuContentData.length);
    }, 0);
  };
  
  const handleNextClick = () => {
    setSlideDirection('slide-left');
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % menuContentData.length);
    }, 0);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNextClick,
    onSwipedRight: handlePrevClick,
    preventScrollOnSwipe: true,
  });
  
  return (
    <>
      <CSSTransition
        in = {dimmerState}
        timeout = {200}
        classNames = "fade"
        unmountOnExit
      >
        <div className = "fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-30 z-[11]"></div>
      </CSSTransition>
      
      <CSSTransition
        in = {popupMenuState}
        timeout = {200}
        classNames = "fade"
        unmountOnExit
      >
        <div {...swipeHandlers} className = "fixed sm:top-[10%] top-0 m-auto lg:w-[55rem] lg:h-[40rem] sm:w-[45rem] sm:h-[45rem] w-screen h-screen flex justify-center bg-gray-200 portrait:sm:rounded-[2rem] landscape:h-sm:rounded-[2rem] z-[12]">
          <div className = "fixed lg:w-[55rem] lg:h-[40rem] sm:w-[45rem] sm:h-[40rem] w-screen h-screen rounded-[2rem] overflow-hidden">          
            {menuContent 
            ? <TransitionGroup component = {null}>
                <CSSTransition
                  key = {currentIndex}
                  timeout = {200}
                  classNames = {slideDirection}
                >   
                  <div className = "absolute inset-0 flex flex-wrap w-full justify-center items-center p-4 py-8">
                    <div className = "flex flex-wrap justify-center items-center gap-y-4">
                      <Link href = "/" aria-label = "Demo" target = "_blank" className = "group cursor-pointer relative w-[50%]">
                        <img
                          src = {menuContent.image}
                          alt = {menuContent.title}
                          className = "w-full object-contain rounded-[2rem] "
                          fetchPriority = "low"
                          loading = "lazy"
                          decoding = "async"
                        />
  
                        <span className = "absolute inset-0 flex items-end bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-all duration-200 rounded-[2rem]">
                          <span className = "absolute top-[5%] right-[4%] flex justify-center items-center w-[2rem] h-[2rem] rounded-[100%] shadow-[0_0px_10px_1px_rgba(0,0,0,.1)] bg-black bg-opacity-20">
                            <svg
                              fill = "var(--base-text-color)"
                              viewBox = "0 0 16 16"
                              className = " w-[1rem]"
                            >
                              <path
                                fillRule = "evenodd"
                                d = "M14 2.5a.5.5 0 00-.5-.5h-6a.5.5 0 000 1h4.793L2.146 13.146a.5.5 0 00.708.708L13 3.707V8.5a.5.5 0 001 0v-6z"
                              />
                            </svg>
                          </span>
                        </span>
                      </Link>
  
                      <div className = "flex flex-col justify-center items-center text-center gap-y-3 max-w-[88%]">
                        {(menuContent.title || menuContent.description)
                        ? <>
                            <span className = "flex flex-col gap-1">
                              <h2 className = "sm:text-lg text-base">{menuContent.title}</h2>
                              <p className = "sm:text-base text-sm">{menuContent.l_description}</p>
                            </span>
                          </>
                        : <></>
                        }
    
                        {menuContent.techs 
                        ? <span className = "flex gap-2">
                            {menuContent.techs.split(/[ ,.]+/).map((tech:string, index) => (
                              <img
                                key = {index}
                                src = {`https://skillicons.dev/icons?i=${tech.toLowerCase()}`}
                                alt = {tech}
                                className = "sm:w-[40px] w-[36px] h-auto"
                                fetchPriority = "low"
                                loading = "lazy"
                                decoding = "async"
                              />
                            ))}
                          </span>
                        : <></>
                        }
                      </div>
  
                      <div className = "flex gap-x-2">
                        <Link href = "https://github.com/ech2k20" target = "_blank" aria-label = "GitHub" rel = "noreferrer" className = "group flex justify-center items-center py-2 px-4 gap-x-2 border border-gray-300 shadow bg-gray-100 hover:bg-white active:bg-gray-200 transition-all ease-in-out duration-[200ms]">
                          <svg
                              fill = "currentColor"
                              viewBox = "0 0 512 512"
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
                          <span className = "group-hover:text-[hsl(212,100%,53%)] group-active:translate-y-[0.1rem] transition-all ease-in-out duration-[200ms]">
                            GH
                          </span>
                        </Link>
    
                        <Link href = "/" target = "_blank" aria-label = "Demo" className = "group flex justify-center items-center py-2 px-4 gap-x-2 border border-gray-300 shadow bg-gray-100 hover:bg-white active:bg-gray-200 transition-all ease-in-out duration-[200ms]">
                          <span className = "group-hover:text-[hsl(212,100%,53%)] group-active:translate-y-[0.1rem] transition-all ease-in-out duration-[200ms]">
                            Live Demo
                          </span>
                          <svg
                              fill = "currentColor"
                              viewBox = "0 0 512 512"
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
                      </div>
                    </div>
                  </div>
                </CSSTransition>
              </TransitionGroup>
            : null
            }
          </div>

          <button onClick = {handleClose} className = "absolute top-0 right-0 p-[3vh] py-[3vh]">
            <VscClose className = "sm:w-[36px] w-[32px] h-auto"/>
          </button>

          <button onClick = {handlePrevClick} className = "group flex absolute top-1/2 left-0 w-[5rem] h-[5rem] mt-[-2.5rem] lg:ml-[-5rem] justify-center items-center transition-all ease-in-out duration-200">
            <span className = "flex w-[3rem] h-[3rem] justify-center opacity-60 bg-[#333333] rounded-[50%] shadow-[0_0px_10px_5px_rgba(0,0,0,0.1)] group-hover:bg-[#555555] group-active:translate-y-[0.15rem]">
              <svg
                viewBox = "0 0 16 16"
                fill = "white"
                className = "lg:w-[1rem] w-[0.75rem] h-auto group-hover:fill-[#eeeeee]"
              >
                <path
                  fillRule = "evenodd"
                  d = "M11.354 1.646a.5.5 0 010 .708L5.707 8l5.647 5.646a.5.5 0 01-.708.708l-6-6a.5.5 0 010-.708l6-6a.5.5 0 01.708 0z"
                />
              </svg>
            </span>
          </button>
  
          <button onClick = {handleNextClick} className = "group flex absolute top-1/2 right-0 w-[5rem] h-[5rem] mt-[-2.5rem] lg:mr-[-5rem] justify-center items-center transition-all ease-in-out duration-200">
            <span className = "flex w-[3rem] h-[3rem] justify-center opacity-60 bg-[#333333] rounded-[50%] shadow-[0_0px_10px_5px_rgba(0,0,0,0.1)] group-hover:bg-[#555555] group-active:translate-y-[0.15rem]">
              <svg
                viewBox = "0 0 16 16"
                fill = "white"
                className = "lg:w-[1rem] w-[0.75rem] h-auto group-hover:fill-[#eeeeee]"
              >
                <path
                  fillRule = "evenodd"
                  d = "M4.646 1.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L10.293 8 4.646 2.354a.5.5 0 010-.708z"
                />
              </svg>
            </span>
          </button>
       </div>
      </CSSTransition>
    </>
  )
}



export default PopupMenu
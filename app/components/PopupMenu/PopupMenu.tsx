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
        <div {...swipeHandlers} className = "fixed m-auto flex justify-center items-center inset-0 xl:w-[65rem] xl:h-[35rem] lg:w-[58rem] lg:h-[35rem] sm:w-[38rem] sm:h-[48rem] landscape:mh-sm:w-screen landscape:mh-sm:h-screen w-screen h-screen bg-projectBG portrait:sm:rounded-[2rem] landscape:h-sm:rounded-[2rem] z-[12]">
          <div className = "fixed xl:w-[65rem] xl:h-[35rem] lg:w-[58rem] lg:h-[35rem] sm:w-[38rem] sm:h-[48rem] landscape:mh-sm:w-screen landscape:mh-sm:h-screen w-screen h-screen landscape:h-sm:rounded-[2rem] overflow-x-hidden">
            {menuContent 
            ? <TransitionGroup component = {null}>
                <CSSTransition
                  key = {currentIndex}
                  timeout = {200}
                  classNames = {slideDirection}
                >   
                  <div className = "absolute inset-0 flex justify-center items-center p-8">
                    <div className = "lg:grid grid-cols-2 justify-items-center flex flex-col landscape:mh-sm:flex-row w-full justify-center items-center gap-8 portrait:mh-md:gap-3">
                      <Link href = "/" aria-label = "Demo" target = "_blank" className = "group cursor-pointer relative lg:w-full lg:h-full w-[75%]">
                        <img
                          src = {menuContent.image}
                          alt = {menuContent.title}
                          className = "w-full h-full object-contain lg:rounded-[2rem]"
                          fetchPriority = "low"
                          loading = "lazy"
                          decoding = "async"
                        />
  
                        <span className = "absolute inset-0 flex items-end bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-all duration-200 lg:rounded-[2rem]">
                          <span className = "absolute top-[5%] right-[3%] flex justify-center items-center w-[2rem] h-[2rem] rounded-[100%] shadow-[0_0px_10px_1px_rgba(0,0,0,.1)] bg-black bg-opacity-20">
                            <svg
                              viewBox = "0 0 16 16"
                              className = " w-[1rem] fill-baseTextColor"
                            >
                              <path
                                fillRule = "evenodd"
                                d = "M8.636 3.5a.5.5 0 00-.5-.5H1.5A1.5 1.5 0 000 4.5v10A1.5 1.5 0 001.5 16h10a1.5 1.5 0 001.5-1.5V7.864a.5.5 0 00-1 0V14.5a.5.5 0 01-.5.5h-10a.5.5 0 01-.5-.5v-10a.5.5 0 01.5-.5h6.636a.5.5 0 00.5-.5z"
                              />
                              <path
                                fillRule = "evenodd"
                                d = "M16 .5a.5.5 0 00-.5-.5h-5a.5.5 0 000 1h3.793L6.146 9.146a.5.5 0 10.708.708L15 1.707V5.5a.5.5 0 001 0v-5z"
                              />
                            </svg>
                          </span>
                        </span>
                      </Link>
  
                      <div className = "flex flex-col justify-center lg:items-start landscape:mh-sm:items-start items-center lg:text-start landscape:mh-sm:text-start text-center gap-y-3 lg:max-w-full sm:max-w-[85%] max-w-[88%] landscape:h-600:max-w-full landscape:mh-xs:max-w-[66%] landscape:max-w-[50%]">
                        {(menuContent.title || menuContent.description)
                        ? <>
                            <div className = "flex flex-col gap-1">
                              <div className = "flex flex-col">
                                <h2 className = "sm:text-2xl landscape:mh-sm:text-lg text-lg">{menuContent.title}</h2>
                                {(menuContent.start_date || menuContent.end_date)
                                ? <div className = "flex lg:justify-start landscape:mh-sm:justify-start justify-center lg:gap-4 gap-3">
                                    <h4 className = "text-[var(--base-text-color)] font-[600] sm:text-lg landscape:mh-sm:text-base landscape:mw-md:text-sm text-base">{menuContent.start_date}</h4>
                                    {(menuContent.start_date && menuContent.end_date)
                                    ? <h4 className = "text-[var(--base-text-color)] font-[600] sm:text-lg landscape:mh-sm:text-base landscape:mw-md:text-sm text-base">to</h4>
                                    : null
                                    }
                                    <h4 className = "text-[var(--base-text-color)] font-[600] sm:text-lg landscape:mh-sm:text-base landscape:mw-md:text-sm text-base">{menuContent.end_date}</h4>
                                 </div>
                                : null
                                }  
                              </div>
                              <p className = "sm:text-base landscape:mh-sm:text-sm portrait:h-825:text-base text-sm">{menuContent.l_description}</p>
                            </div>
                          </>
                        : <></>
                        }
    
                        {menuContent.techs 
                        ? <span className = "flex items-center gap-2">
                            {menuContent.techs.split(/[ ,.]+/).map((tech:string, index) => (
                              <img
                                key = {index}
                                src = {`https://skillicons.dev/icons?i=${tech.toLowerCase()}`}
                                alt = {tech}
                                className = "sm:w-[40px] sm:h-[40px] landscape:mh-sm:w-[36px] landscape:mh-sm:h-[36px] landscape:mw-md:w-[32px] landscape:mw-md:h-[32px] w-[36px] h-[36px]"
                                fetchPriority = "low"
                                loading = "lazy"
                                decoding = "async"
                              />
                            ))}
                          </span>
                        : <></>
                        }

                        <div className = "flex gap-x-2">
                          <Link href = "https://github.com/ecdevv" target = "_blank" aria-label = "GitHub" rel = "noreferrer" className = "group flex justify-center items-center py-2 px-4 gap-x-2 border border-secondaryBorderColor shadow bg-buttonColor hover:bg-buttonHoverColor active:bg-buttonActiveColor transition-all ease-in-out duration-[200ms]">
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              viewBox = "0 0 98 96"
                              fill = "currentColor"
                              className = "sm:w-6 landscape:mh-sm:w-5 landscape:mw-md:w-4 w-6 h-auto group-hover:fill-[hsl(212,100%,53%)] group-active:translate-y-[0.1rem] transition-all ease-in-out duration-[200ms]"
                            >
                              <path fillRule = "evenodd" clipRule = "evenodd" d = "M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"/>
                            </svg>
                            <svg
                              fill = "currentColor"
                              viewBox = "0 0 16 16"
                              className = "sm:w-4 landscape:mh-sm:w-3 w-4 h-full group-hover:fill-[hsl(212,100%,53%)] group-active:translate-y-[0.1rem] transition-all ease-in-out duration-[200ms]"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8.636 3.5a.5.5 0 00-.5-.5H1.5A1.5 1.5 0 000 4.5v10A1.5 1.5 0 001.5 16h10a1.5 1.5 0 001.5-1.5V7.864a.5.5 0 00-1 0V14.5a.5.5 0 01-.5.5h-10a.5.5 0 01-.5-.5v-10a.5.5 0 01.5-.5h6.636a.5.5 0 00.5-.5z"
                              />
                              <path
                                fillRule="evenodd"
                                d="M16 .5a.5.5 0 00-.5-.5h-5a.5.5 0 000 1h3.793L6.146 9.146a.5.5 0 10.708.708L15 1.707V5.5a.5.5 0 001 0v-5z"
                              />
                            </svg>
                          </Link>
      
                          <Link href = "/" target = "_blank" aria-label = "Demo" className = "group flex justify-center items-center py-2 px-4 gap-x-2 border border-secondaryBorderColor shadow bg-buttonColor hover:bg-buttonHoverColor active:bg-buttonActiveColor transition-all ease-in-out duration-[200ms]">
                            <span className = "text-[var(--base-text-color)] sm:text-base landscape:mh-sm:text-sm landscape:mw-md:text-xs text-base group-hover:text-[hsl(212,100%,53%)] group-active:translate-y-[0.1rem] transition-all ease-in-out duration-[200ms]">
                              Live Demo
                            </span>
                            <svg
                              fill = "currentColor"
                              viewBox = "0 0 16 16"
                              className = "sm:w-4 landscape:mh-sm:w-3 w-4 h-full group-hover:fill-[hsl(212,100%,53%)] group-active:translate-y-[0.1rem] transition-all ease-in-out duration-[200ms]"
                          >
                              <path
                                fillRule="evenodd"
                                d="M8.636 3.5a.5.5 0 00-.5-.5H1.5A1.5 1.5 0 000 4.5v10A1.5 1.5 0 001.5 16h10a1.5 1.5 0 001.5-1.5V7.864a.5.5 0 00-1 0V14.5a.5.5 0 01-.5.5h-10a.5.5 0 01-.5-.5v-10a.5.5 0 01.5-.5h6.636a.5.5 0 00.5-.5z"
                              />
                              <path
                                fillRule="evenodd"
                                d="M16 .5a.5.5 0 00-.5-.5h-5a.5.5 0 000 1h3.793L6.146 9.146a.5.5 0 10.708.708L15 1.707V5.5a.5.5 0 001 0v-5z"
                              />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </CSSTransition>
              </TransitionGroup>
            : null
            }
          </div>

          <div className = "absolute top-0 right-0 p-[3vh] py-[3vh]">
            <button id = "Close" onClick = {handleClose} aria-label = "Close">
              <VscClose className = "sm:w-[36px] w-[32px] h-auto"/>
            </button>
          </div>

          <button id = "Prev" onClick = {handlePrevClick} aria-label = "Previous" className = "group flex absolute top-1/2 left-0 w-[5rem] h-[5rem] mt-[-2.5rem] xl:ml-[-5rem] landscape:mh-md:ml-0 justify-center items-center transition-all ease-in-out duration-200">
            <span className = "flex lg:w-[3rem] lg:h-[3rem] sm:w-[2.5rem] sm:h-[2.5rem] landscape:mh-sm:w-[2rem] landscape:mh-sm:h-[2rem] w-[2rem] h-[2rem] justify-center opacity-60 bg-[#333333] rounded-[50%] shadow-[0_0px_10px_5px_rgba(0,0,0,0.1)] group-hover:bg-[#555555] group-active:translate-y-[0.15rem]">
              <svg
                viewBox = "0 0 16 16"
                fill = "white"
                className = "lg:w-[1rem] sm:w-[0.875rem] w-[0.75rem] h-auto group-hover:fill-[#eeeeee]"
              >
                <path
                  fillRule = "evenodd"
                  d = "M11.354 1.646a.5.5 0 010 .708L5.707 8l5.647 5.646a.5.5 0 01-.708.708l-6-6a.5.5 0 010-.708l6-6a.5.5 0 01.708 0z"
                />
              </svg>
            </span>
          </button>
  
          <button id = "Next" onClick = {handleNextClick} aria-label = "Next" className = "group flex absolute top-1/2 right-0 w-[5rem] h-[5rem] mt-[-2.5rem] xl:mr-[-5rem] landscape:mh-md:mr-0 justify-center items-center transition-all ease-in-out duration-200">
            <span className = "flex lg:w-[3rem] lg:h-[3rem] sm:w-[2.5rem] sm:h-[2.5rem] landscape:mh-sm:w-[2rem] landscape:mh-sm:h-[2rem] w-[2rem] h-[2rem] justify-center opacity-60 bg-[#333333] rounded-[50%] shadow-[0_0px_10px_5px_rgba(0,0,0,0.1)] group-hover:bg-[#555555] group-active:translate-y-[0.15rem]">
              <svg
                viewBox = "0 0 16 16"
                fill = "white"
                className = "lg:w-[1rem] sm:w-[0.875rem] w-[0.75rem] h-auto group-hover:fill-[#eeeeee]"
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
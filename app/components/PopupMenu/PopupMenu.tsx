import React, {useEffect, useState} from 'react'
import { useSwipeable } from 'react-swipeable';
import { useContextAPI } from '../Context/Context'
import { VscClose } from 'react-icons/vsc'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

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
       <div {...swipeHandlers} className = "fixed lg:top-[10%] top-0 m-auto lg:w-[55rem] lg:h-[40rem] w-screen h-screen flex items-start justify-center bg-gray-200 rounded-[2rem] z-[12]">
         <button onClick = {handlePrevClick} className = "group flex absolute top-1/2 left-0 w-[5rem] h-[5rem] mt-[-2.5rem] lg:ml-[-5rem] justify-center items-center transition-all ease-in-out duration-200 z-[12]">
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
  
          <button onClick = {handleNextClick} className = "group flex absolute top-1/2 right-0 w-[5rem] h-[5rem] mt-[-2.5rem] lg:mr-[-5rem] justify-center items-center transition-all ease-in-out duration-200 z-[12]">
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

          <button onClick = {handleClose} className = "absolute top-0 right-0 p-[3vh] py-[3vh] z-[12]">
            <VscClose className = "sm:w-[36px] w-[32px] h-auto"/>
          </button>
          
          <div className = "fixed lg:w-[55rem] lg:h-[40rem] w-screen h-screen bg-gray-200 rounded-[2rem] overflow-hidden">          
            {menuContent 
            ? <TransitionGroup component = {null}>
                <CSSTransition
                  key = {currentIndex}
                  timeout = {200}
                  classNames = {slideDirection}
                >   
                  <div className = "absolute inset-0 flex flex-col justify-center items-center w-full h-full p-12">
                    <img
                      src = {menuContent.image}
                      alt = {menuContent.title}
                      className = "w-[75%] h-full object-contain rounded-[2rem] px-2"
                      fetchPriority = "low"
                      loading = "lazy"
                      decoding = "async"
                    />

                    <div className = "flex flex-col w-full justify-center items-center text-center gap-y-3 p-4">
                      {(menuContent.title || menuContent.description)
                      ? <>
                          <span className = "flex flex-col gap-1">
                            <h2 className = "sm:text-lg text-base">{menuContent.title}</h2>
                            <p className = "sm:text-base text-sm">{menuContent.description}</p>
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
                              className = "sm:w-[32px] w-[28px] h-auto"
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
                </CSSTransition>
              </TransitionGroup>
            : null
            }
          </div>
       </div>
      </CSSTransition>
    </>
  )
}



export default PopupMenu
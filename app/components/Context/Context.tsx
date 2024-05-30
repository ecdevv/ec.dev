'use client'
import React, { createContext, useState, useContext } from 'react';

type Dimmer = boolean;
type PopupMenu = boolean;
type MenuContent = {
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
type Layout = 'grid' | 'full' | 'disabled';

type ContextProviderProps = {
  children: React.ReactNode;
}

type Context = {
  toggleDimmer: () => void;
  togglePopupMenu: () => void;
  menuContentData: MenuContent[];
  setMenuContentData: React.Dispatch<React.SetStateAction<MenuContent[]>>;
  layoutState: Layout;
  setLayoutState: React.Dispatch<React.SetStateAction<Layout>>;
  
}

const ContextAPI = createContext<Context | null>(null);

export const ContextProvider = ({children}:ContextProviderProps) => {
  const [dimmerState, setDimmerState] = useState<Dimmer>(false);
  const [popupMenuState, setPopupMenuState] = useState<PopupMenu>(false);
  const [menuContentData, setMenuContentData] = useState<MenuContent[]>([])

  const [layoutState, setLayoutState] = useState<Layout>('grid');
  
  const toggleDimmer = () => {
    setDimmerState(!dimmerState)
  }

  const togglePopupMenu = () => {
    setPopupMenuState(!popupMenuState)
  }

  return (
    <ContextAPI.Provider value={{ toggleDimmer, togglePopupMenu, menuContentData, setMenuContentData, layoutState, setLayoutState }}>
      {children}
    </ContextAPI.Provider>
  );
};

export const useContextAPI = () => {
  const context = useContext(ContextAPI);
  if (!context) {
    throw new Error('useContextAPIState must be used within a ContextAPIProvider');
  }
  return context;
};
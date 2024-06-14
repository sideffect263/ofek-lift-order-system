import React, { createContext, useState } from 'react';

export const MovableElementsContext = createContext();

export const MovableElementsProvider = ({ children }) => {
  const [elements, setElements] = useState([
    { id: 'Home', x: window.innerWidth-window.innerWidth/9, y: "25%", isLifted: false },
    { id: 'Products', x: window.innerWidth-window.innerWidth/9*2, y: "25%", isLifted: false },
    { id: 'Order', x: window.innerWidth-window.innerWidth/9*3, y: "25%", isLifted: false },
    { id: 'Lift-game', x: window.innerWidth-window.innerWidth/9*4, y: "25%", isLifted: false },
  ]);

  return (
    <MovableElementsContext.Provider value={{ elements, setElements }}>
      {children}
    </MovableElementsContext.Provider>
  );
};

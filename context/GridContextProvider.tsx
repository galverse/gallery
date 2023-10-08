import React, { createContext, useContext, useState } from 'react';

type GridContextType = {
  isDense: boolean;
  toggleDense: () => void;
};

const GridContext = createContext<GridContextType | undefined>(undefined);

type GridProviderProps = {
  children: React.ReactNode;
};

export const GridProvider: React.FC<GridProviderProps> = ({ children }) => {
    const [isDense, setIsDense] = useState(false);
  
    const toggleDense = () => {
      setIsDense((prev) => !prev);
    };
  
    return (
      <GridContext.Provider value={{ isDense, toggleDense }}>
        {children}
      </GridContext.Provider>
    );
  };

export const useGrid = () => {
  console.log(GridContext)
  const context = useContext(GridContext);
  if (!context) {
    throw new Error('useGrid must be used within a GridProvider');
  }
  return context;
};

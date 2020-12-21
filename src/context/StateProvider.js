import React, { useContext, createContext, useReducer } from 'react';

// Creating The Data Layer
export const StateContext = createContext();

// Data Layer Component/Wrapper
export const StateProvider = ({ initialState, reducer, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

// Hook used to fetch data from Data Layer
export const useStateValue = () => useContext(StateContext);

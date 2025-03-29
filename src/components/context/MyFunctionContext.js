import { createContext, useContext, useState } from "react";

const MyFunctionContext = createContext();

export const MyFunctionProvider = ({ children }) => {
  const [myStoredFunction, setMyStoredFunction] = useState(null);
  const [storedParams, setStoredParams] = useState(null);

  return (
    <MyFunctionContext.Provider value={{ myStoredFunction, setMyStoredFunction ,storedParams,setStoredParams }}>
      {children}
    </MyFunctionContext.Provider>
  );
};

export const useMyFunctionContext = () => useContext(MyFunctionContext);
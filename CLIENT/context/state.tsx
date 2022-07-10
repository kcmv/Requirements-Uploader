import React from "react";
import { useContext, createContext } from "react";

const StateContext = createContext<any>(null);

export const GlobalState = ({ children }: any) => {
  const [status, setStatus] = React.useState({
    open: false,
    text: "",
    status: 0,
    query: "",
  });

  const setValues = (...newValue: any) => {
    setStatus((_prev) => {
      return {
        status: newValue[0].status,
        open: newValue[0].open,
        text: newValue[0].text,
        query: newValue[0].query,
      };
    });
  };

  return (
    <StateContext.Provider
      value={{
        setValues,
        status,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useGlobalProvider = () => useContext(StateContext);

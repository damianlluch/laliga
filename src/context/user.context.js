import React, { useState, useEffect, useMemo, createContext } from "react";
import { getToken, removeToken } from "../helpers/auth";

const UserContext = createContext();

export const UserProvider = (props) => {
  const [token, setToken] = useState(getToken());
  const logOut = () => {
    removeToken();
    return setToken(null);
  };

  useEffect(() => {}, [token]);
  const value = useMemo(() => {
    return {
      token,
      setToken,
      logOut,
    };
  }, [token, setToken]);
  return <UserContext.Provider value={value} {...props}></UserContext.Provider>;
};

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("useUser not found");
  }
  return context;
};

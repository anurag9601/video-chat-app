import React, { createContext, useContext, useMemo } from "react";
import { io } from "socket.io-client";

export const createSocketContext = createContext();

export const socketContext = () =>{
  const  socket  = useContext(createSocketContext);
  return socket;
}

const UserContext = ({ children }) => {
  const socket = useMemo(()=>io("localhost:8000"),[]);

  return (
    <createSocketContext.Provider value={socket}>
      {children}
    </createSocketContext.Provider>
  );
};

export default UserContext;

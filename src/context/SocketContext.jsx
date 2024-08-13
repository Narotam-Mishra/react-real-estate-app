/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react"
import { io } from "socket.io-client"

export const SocketContextVal = createContext();

const SocketContext = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io("http://localhost:4241"))
  }, []);

  return (
    <SocketContextVal.Provider value={{ socket }}>
      {children}
    </SocketContextVal.Provider>
  );
};

export default SocketContext
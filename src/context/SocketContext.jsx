/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react"
import { io } from "socket.io-client"
import { AuthContextVal } from "./AuthContext";

export const SocketContext = createContext();

const SocketContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContextVal);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io("http://localhost:4341"));
  }, []);

  useEffect(() => {
    currentUser && socket?.emit("newUser", currentUser.id)
  }, [currentUser, socket])

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider
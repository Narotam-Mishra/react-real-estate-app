/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react"

export const AuthContextVal = createContext();

const AuthContext = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const updateUser = (data) => {
    setCurrentUser(data);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContextVal.Provider value={{ currentUser, updateUser }}>
      {children}
    </AuthContextVal.Provider>
  );
};

export default AuthContext
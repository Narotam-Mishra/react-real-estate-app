import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./index.scss";
import AuthContext from './context/AuthContext.jsx';
import SocketContextProvider from './context/SocketContext.jsx';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContext>
      <SocketContextProvider>
        <App />
      </SocketContextProvider>
    </AuthContext>
  </React.StrictMode>
);

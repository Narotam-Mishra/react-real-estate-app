import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./index.scss";
import AuthContext from './context/AuthContext.jsx';
import SocketContext from './context/SocketContext.jsx';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContext>
      <SocketContext>
        <App />
      </SocketContext>
    </AuthContext>
  </React.StrictMode>
);


import Navbar from "./components/navbar/Navbar";
import "./layout.scss";
import Home from "./pages/home/Home";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import ListPage from "./pages/listPage/ListPage";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Home />
      ),
    },
    {
      path: "/list",
      element: <ListPage />,
    },
  ]);
  
  return (
    // <div className="layout">
    //   <div className="navbar">
    //     <Navbar />
    //   </div>
    //   <div className="content">
    //     <Home />
    //   </div>
    // </div>
    
    <RouterProvider router={router}/>
  )
}

export default App

//importing browser router
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";

// importing components and pages
import {Toaster} from "react-hot-toast";
import { useContext, useEffect } from "react";
import axios from "axios";
import { Context, server } from "./main";
import Home from "./pages/home/Home"
import Dashboard from "./pages/dashboard/Dashboard";
import AddNews from "./pages/addnews/Addnews";
import Navbar from "./components/navbar/Navbar";
// import Footer from "./components/footer/Footer";
import ViewNews from "./pages/viewnews/ViewNews";
import Footer from "./components/footer/Footer";
import Update from "./pages/update/Update";
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
// import Login from "./pages/login/Login";

//importing global css
// import "./styles/global.scss"

function App() {
  const {user,setUser,isAuthenticated,setIsAuthenticated,setLoading } = useContext(Context)
  useEffect(()=>{
    setLoading(true);
    axios.get(`${server}/me`,{
      withCredentials:true,
    }).then(res=>{
      setUser(res.data.user);
      console.log(user);
      setLoading(false);
      setIsAuthenticated(true);
    }).catch((error)=>{
      setUser({})
      setIsAuthenticated(false)
      setLoading(false);
    })
    
  },[])
// layout for the home page 
  const Layout = ({ children }) => {
    return (
      <div className="main">
        {/* navbar  */}
        <Navbar />
        <div className="container min-w-full">
          {/*   <div className="menuContainer">
            
            <Menu />
          </div>*/}
          <div className="contentContainer">
            {/* outlet so that we can switch between pages without changing navbar and menu  */}
            {children}
          </div>
        </div>
        {/* footer  */}
        <Footer />
        <Toaster />
      </div>
    )
  }


  // routing for the different pages 
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />, 
    },
    {
      path: "/register",
      element: <Register />, 
    },
    {
      path: "/home",
      element: <Layout><Home /></Layout>,
    },
    {
      path: "/addnews",
      element: <Layout><AddNews /></Layout>, 
    },
    {
      path: "/viewnews/:id",
      element: <Layout><ViewNews /></Layout>, 
    },
    {
      path: "/updatenews/:id",
      element: <Layout><Update /></Layout>, 
    },
    {
      path: "/dashboard",
      element: <Layout><Dashboard /></Layout>, 
    },
  ]);

// rendering router 
  return (
    <RouterProvider router={router} />
  )
}

export default App

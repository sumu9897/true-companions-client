import { Outlet } from "react-router-dom"
import Footer from "../Pages/Shared/Footer/Footer"
import Navbar from "../Pages/Shared/Navbar/Navbar"


const Main = () => {
  return (
    <div>
        <Navbar></Navbar>
        <div className="container mx-auto px-4 md:px-8 lg:px-16 pt-20 min-h-[calc(100vh-313px)]">
        <Outlet></Outlet>
        </div>
      
      <Footer></Footer>
    </div>
  )
}

export default Main

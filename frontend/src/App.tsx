import { Navigate, Route, Routes } from "react-router-dom"
import SignUp from "./Pages/SignUp"
import Login from "./Pages/Login"
import bgImg from "../public/3d-technology-geometric-black-background.jpg"
import { ToastContainer } from "react-toastify"
import Customize from "./Pages/Customize"
import { useUserContext } from "./Context/UserContext"
import Homepage from "./Pages/Homepage"


function App() {
  const {userData}=useUserContext();

  return (
    <div  className="h-[100vh] w-full bg-cover"
      style={{ backgroundImage: `url(${bgImg})` }}>
      <Routes>
        <Route path="/" element={userData ? (userData?.assistantImage ? <Homepage/>:<Navigate to="/customize"/>):<Navigate to="/login"/>}/>
        <Route path="/signup" element={userData ? (userData?.assistant ? <Navigate to="/"/> : <Navigate to="/customize"/>):<SignUp/>}/>
        <Route path="/login" element={userData ? (userData?.assistant ? <Navigate to="/"/> : <Navigate to="/customize"/>):<Login/>}/>
        <Route path="/customize" element={userData ? <Customize/> : <Navigate to="/login"/>}/>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" // or "dark"
      />
    </div>
  )
}

export default App

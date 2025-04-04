import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import Navbar from "./components/Navbar"
import RegisterPage from "./pages/RegisterPage"

function App() {
  

  return (
   <BrowserRouter>
   <Navbar />
   <Routes>
   <Route path="/" element={<HomePage />}/>
   <Route path="/register" element={<RegisterPage/>}/>
    <Route path="/login" element={<LoginPage/>}/>
    
   </Routes>
    </BrowserRouter>
  )
}

export default App

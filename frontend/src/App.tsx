import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import Navbar from "./components/Navbar"

function App() {
  

  return (
   <BrowserRouter>
   <Navbar />
   <Routes>
   <Route path="/" element={<HomePage />}/>
    <Route path="/login" element={<LoginPage/>}/>
    
   </Routes>
    </BrowserRouter>
  )
}

export default App

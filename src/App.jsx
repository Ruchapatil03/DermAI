import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Dashboard from "./pages/Dashboard";


import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Dash from "./pages/Dash";

function App() {

  return (
    <div className="parent">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/dashboard" element={<Dashboard/>}></Route>
          <Route path="/Login" element={<Login/>}></Route>
          <Route path="/Signup" element={<Signup/>}></Route>
          <Route path="/Dash" element={<Dash/>}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Dashboard from "./pages/Dashboard";

import Home from "./pages/Home";

function App() {

  return (
    <div className="parent">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/dashboard" element={<Dashboard />}>
            
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App

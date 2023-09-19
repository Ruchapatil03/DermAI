import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Dash from "./pages/Dash";
import Upload from "./pages/Upload";
import CommonForm from "./components/CommonForm";
import PatientForm from "./components/PatientForm";
import HealthcareProfessionalForm from "./components/HealthcareProfessionalForm";


function App() {

  return (
    <div className="parent">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/dashboard" element={<Dashboard/>}></Route>
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/Signup" element={<Signup />}>
            <Route path="" element={<CommonForm />} />
            <Route path="patient" element={<PatientForm />} />
            <Route path="healthcare-professional" element={<HealthcareProfessionalForm />} />
          </Route>
          <Route exact path="/Dash" element={<Dash/>}></Route>\
          <Route exact path="/Upload" element={<Upload/>}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App;

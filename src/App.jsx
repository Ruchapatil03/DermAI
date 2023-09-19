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
import Test from "./pages/test";
import CommonDashboard from "./components/CommonDashboard";
import PatientDashboard from "./components/PatientDashboard";
import ProfessionalDashboard from "./components/ProfessionalDashboard";
import GetDiagnosis from "./components/GetDiagnosis";



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
          <Route path="/Dash/:currentPath" element={<Dash />}>
              <Route path="patient" element={<CommonDashboard />} />
              <Route path="professional" element={<CommonDashboard />} />
              <Route path="patient/profile" element={<PatientDashboard />} />
              <Route path="patient/getdiagnosis" element={<GetDiagnosis />} />
              <Route path="professional/profile" element={<ProfessionalDashboard />} />
          </Route>

          <Route exact path="/test" element={<Test/>}></Route>
          
        </Routes>
      </Router>
    </div>
  )
}

export default App;

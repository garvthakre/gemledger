import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProcessingDashboard from "./pages/ProcessingDashboard";
import PolishingDashboard from "./pages/PolishingDashboard";
import CertificationDashboard from "./pages/CertificationDashboard";
import RetailerDashboard from "./pages/RetailerDashboard";
import ConsumerDashboard from "./pages/ConsumerDashboard";
import DiamondDetails from "./pages/DiamondDetails";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import './App.css';
import Home from "./pages/Home";
import DummyDash from "./pages/DummyDash";

function App() {
  const [user, setUser] = useState(null);
   // const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setUser(data.user));
    }
  }, []);

  return (
    <Router>
            <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Home setUser={setUser} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        {/* <Route path="/dashboard/processing" element={<PrivateRoute><ProcessingDashboard /></PrivateRoute>} />
        <Route path="/dashboard/polishing" element={<PrivateRoute><PolishingDashboard /></PrivateRoute>} />
        <Route path="/dashboard/certification" element={<PrivateRoute><CertificationDashboard /></PrivateRoute>} />
        <Route path="/dashboard/retailer" element={<PrivateRoute><RetailerDashboard /></PrivateRoute>} />
        <Route path="/dashboard/consumer" element={<PrivateRoute><ConsumerDashboard /></PrivateRoute>} /> */}
        {/* Making them Public for FrontEnd Design */}
        <Route path="/dashboard/processing" element={<ProcessingDashboard />} />
        <Route path="/dashboard/polishing" element={<PolishingDashboard />} />
        <Route path="/dashboard/certification" element={<CertificationDashboard />} />
        <Route path="/dashboard/retailer" element={<RetailerDashboard />} />
        <Route path="/dashboard/consumer" element={<ConsumerDashboard />} />
        <Route path="/da" element={<DummyDash/>} />
        <Route path="/diamond/:id" element={<DiamondDetails />} />
      </Routes>
      
    </Router>
  );
}

export default App;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProcessingDashboard from "../components/ProcessingDashboard";
import PolishingDashboard from "../components/PolishingDashboard";
import CertificationDashboard from "../components/CertificationDashboard";
import RetailerDashboard from "../components/RetailerDashboard";
import ConsumerDashboard from "../components/ConsumerDashboard";

function Dashboard() {
  const navigate = useNavigate();
  const [role, setRole] = useState("");

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    if (!userRole) navigate("/");
    setRole(userRole);
  }, [navigate]);

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      {role === "Processing" && <ProcessingDashboard />}
      {role === "Polishing" && <PolishingDashboard />}
      {role === "Certification" && <CertificationDashboard />}
      {role === "Retailer" && <RetailerDashboard />}
      {role === "Consumer" && <ConsumerDashboard />}
    </div>
  );
}

export default Dashboard;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function DummyDash() {
  const navigate = useNavigate();
  const [role, setRole] = useState("");

 

  // Function to handle navigation
  const goToDashboard = (path) => {
    navigate(path);
  };

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-4">Select Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <button
          onClick={() => goToDashboard("/dashboard/processing")}
          className="w-full p-3 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Processing Dashboard
        </button>

        <button
          onClick={() => goToDashboard("/dashboard/polishing")}
          className="w-full p-3 text-white bg-green-600 rounded hover:bg-green-700"
        >
          Polishing Dashboard
        </button>

        <button
          onClick={() => goToDashboard("/dashboard/certification")}
          className="w-full p-3 text-white bg-yellow-600 rounded hover:bg-yellow-700"
        >
          Certification Dashboard
        </button>

        <button
          onClick={() => goToDashboard("/dashboard/retailer")}
          className="w-full p-3 text-white bg-purple-600 rounded hover:bg-purple-700"
        >
          Retailer Dashboard
        </button>

        <button
          onClick={() => goToDashboard("/dashboard/consumer")}
          className="w-full p-3 text-white bg-red-600 rounded hover:bg-red-700"
        >
          Consumer Dashboard
        </button>
      </div>
    </div>
  );
}

export default DummyDash;

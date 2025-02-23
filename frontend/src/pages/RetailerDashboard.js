// import React from 'react'

// function RetailerDashboard({ user }) {
//     return (
//       <div>
//         <h2>Retailer Dashboard</h2>
//         <p>Manage diamond inventory and sales.</p>
//         <button>Transfer Ownership</button>
//       </div>
//     );
//   }

// export default RetailerDashboard
// ********************************************* New
import React from "react";

function RetailerDashboard({ user }) {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <header className="flex justify-between items-center p-5 bg-white shadow-md">
        <div className="flex items-center gap-3">
          <img src="logo.png" alt="Logo" className="w-12 h-12 rounded-full" />
          <span className="text-lg font-semibold">Retailer Dashboard</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Welcome, {user?.name || "Retailer"}</span>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">
            Logout
          </button>
        </div>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 max-w-6xl mx-auto">
        <section className="bg-white p-10 rounded-2xl shadow-md flex items-center justify-center cursor-pointer hover:shadow-lg transform transition-transform hover:-translate-y-1">
          <h2 className="text-xl font-bold text-blue-600">Manage Inventory</h2>
        </section>

        <section className="bg-white p-10 rounded-2xl shadow-md flex items-center justify-center cursor-pointer hover:shadow-lg transform transition-transform hover:-translate-y-1">
          <h2 className="text-xl font-bold text-blue-600">Sales Overview</h2>
        </section>

        <section className="bg-white p-10 rounded-2xl shadow-md flex items-center justify-center cursor-pointer hover:shadow-lg transform transition-transform hover:-translate-y-1">
          <h2 className="text-xl font-bold text-blue-600">Track Diamond ID</h2>
        </section>

        <section className="bg-white p-10 rounded-2xl shadow-md flex items-center justify-center cursor-pointer hover:shadow-lg transform transition-transform hover:-translate-y-1">
          <h2 className="text-xl font-bold text-blue-600">Trace Diamond</h2>
        </section>
        <section className="bg-white p-10 rounded-2xl shadow-md flex items-center justify-center cursor-pointer hover:shadow-lg transform transition-transform hover:-translate-y-1">
          <h2 className="text-xl font-bold text-blue-600">Transfer Ownership</h2>
        </section>
      </main>
    </div>
  );
}

export default RetailerDashboard;

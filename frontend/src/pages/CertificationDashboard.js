// import React from 'react'

// function CertificationDashboard({ user }) {
//     return (
//       <div>
//         <h2>Certification Dashboard</h2>
//         <p>Verify diamonds and upload certificates.</p>
//         <button>Transfer Ownership</button>
//       </div>
//     );
//   }

// export default CertificationDashboard

// NEW
import React from "react";

function CertificationDashboard({ user }) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      {/* <header className="flex justify-between items-center p-5 bg-white shadow-md">
        <div className="logo">
          <img src="/logo.png" alt="Logo" className="w-12 h-12 rounded-full" />
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-700">Welcome, Certifier</span>
          <button className="px-4 py-2 border border-gray-300 rounded bg-blue-500 text-white hover:bg-blue-700">
            Logout
          </button>
        </div>
      </header> */}

      {/* Main Dashboard */}
      <main className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 max-w-5xl mx-auto">
        <section className="bg-white border border-gray-300 rounded-lg p-10 text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition">
          <h2 className="text-xl font-semibold text-blue-500">Import/Export Details</h2>
        </section>

        <section className="bg-white border border-gray-300 rounded-lg p-10 text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition">
          <h2 className="text-xl font-semibold text-blue-500">Scan</h2>
        </section>

        <section className="bg-white border border-gray-300 rounded-lg p-10 text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition">
          <h2 className="text-xl font-semibold text-blue-500">History</h2>
        </section>

        <section className="bg-white border border-gray-300 rounded-lg p-10 text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition">
          <h2 className="text-xl font-semibold text-blue-500">Trace Diamond</h2>
        </section>

        <section className="bg-white border border-gray-300 rounded-lg p-10 text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition">
          <h2 className="text-xl font-semibold text-blue-500">Team Details</h2>
        </section>

        <section className="bg-white border border-gray-300 rounded-lg p-10 text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition">
          <h2 className="text-xl font-semibold text-blue-500">Certification</h2>
        </section>
      </main>
    </div>
  );
}

export default CertificationDashboard;

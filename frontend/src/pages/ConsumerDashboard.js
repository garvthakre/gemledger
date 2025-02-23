// import React from 'react'

// function ConsumerDashboard({ user }) {
//     return (
//       <div>
//         <h2>Consumer Dashboard</h2>
//         <p>Scan QR codes and view diamond history.</p>
//       </div>
//     );
//   }

// export default ConsumerDashboard

// New
import React from 'react';

function ConsumerDashboard({ user }) {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Header */}
      {/* <header className="flex justify-between items-center p-5 bg-white shadow-md">
        <div className="flex items-center gap-3">
          <img src="logo.png" alt="Logo" className="w-12 h-12 rounded-full" />
          <span className="text-lg font-semibold">Welcome, {user?.name || 'Consumer'}</span>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Logout</button>
      </header> */}

      {/* Main Content */}
      <main className="flex flex-col items-center gap-6 p-6 max-w-lg mx-auto">
        {/* Search Section */}
        <section className="bg-white p-6 rounded-xl shadow-md w-full hover:shadow-lg transition-transform">
          <h2 className="text-blue-600 text-xl font-semibold text-center">Search Diamond ID</h2>
          <div className="flex gap-3 mt-4">
            <input type="text" placeholder="Enter Diamond ID" className="flex-1 p-2 border rounded-md" />
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Search</button>
          </div>
        </section>

        {/* Scan Section */}
        <section className="bg-white p-6 rounded-xl shadow-md w-full hover:shadow-lg transition-transform">
          <h2 className="text-blue-600 text-xl font-semibold text-center">Scan Product (Diamond)</h2>
          <button className="w-full px-4 py-2 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Scan Now</button>
        </section>

        {/* Trace Section */}
        <section className="bg-white p-6 rounded-xl shadow-md w-full hover:shadow-lg transition-transform">
          <h2 className="text-blue-600 text-xl font-semibold text-center">Trace Diamond</h2>
          <button className="w-full px-4 py-2 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Trace Now</button>
        </section>

        {/* Result Section */}
        <section className="bg-white p-6 rounded-xl shadow-md w-full hover:shadow-lg transition-transform">
          <h2 className="text-blue-600 text-xl font-semibold text-center">Authentication/Result</h2>
          <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 text-center text-gray-600 mt-4">
            Result will be displayed here after scanning or searching.
          </div>
        </section>
      </main>
    </div>
  );
}

export default ConsumerDashboard;

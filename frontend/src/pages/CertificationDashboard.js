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
import { ImportExport, QrCodeScanner, History, Diamond, Group, Verified } from "@mui/icons-material";

function CertificationDashboard({ user }) {
  const sections = [
    { title: "Import/Export Details", icon: <ImportExport fontSize="large" className="text-white" /> },
    { title: "Scan", icon: <QrCodeScanner fontSize="large" className="text-white" /> },
    { title: "History", icon: <History fontSize="large" className="text-white" /> },
    { title: "Trace Diamond", icon: <Diamond fontSize="large" className="text-white" /> },
    { title: "Team Details", icon: <Group fontSize="large" className="text-white" /> },
    { title: "Certification", icon: <Verified fontSize="large" className="text-white" /> },
  ];

  return (
    <div className="min-h-screen bg-zinc-600">
      <main className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 max-w-5xl mx-auto">
        {sections.map((section, index) => (
          <section
            key={index}
            className="bg-purple-600 border border-gray-300 rounded-lg p-10 text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition flex flex-col items-center gap-4"
          >
            {section.icon}
            <h2 className="text-xl font-semibold text-white">{section.title}</h2>
          </section>
        ))}
      </main>
    </div>
  );
}

export default CertificationDashboard;

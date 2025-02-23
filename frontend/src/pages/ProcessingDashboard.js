// import React, { useEffect, useState } from "react";

// function ProcessingDashboard({ user }) {
//   const [diamonds, setDiamonds] = useState([]);
//   const [newDiamond, setNewDiamond] = useState("");
// // info(mine), type of ore, possible no of diamond form this ore, color of diamond, image, 
//   useEffect(() => {
//     fetch("http://localhost:5000/api/diamond/processing", {
//       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
//     })
//       .then(res => res.json())
//       .then(data => setDiamonds(data))
//       .catch(error => console.error("Error fetching diamonds:", error));
//   }, []);

//   const addDiamond = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/diamond/create", {
//         method: "POST",
//         headers: {
//           "Authorization": `Bearer ${localStorage.getItem("token")}`,
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           diamondId: newDiamond,  // Assuming this is the name
//           condition: "new",       // Provide a default condition
//           owner: user?.id || "Unknown", // Set owner (fallback for safety)
//           imageHash: "placeholder_hash" // Placeholder for now
//         })
//       });

//       if (!response.ok) throw new Error("Failed to create diamond");

//       const data = await response.json();
//       setDiamonds([...diamonds, data]); // Add new diamond to the list
//       setNewDiamond("");
//     } catch (error) {
//       console.error("Error adding diamond:", error);
//     }
//   };

//   const transferOwnership = async (id) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/diamond/transfer/${id}`, {
//         method: "POST",
//         headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
//       });

//       if (!response.ok) throw new Error("Failed to transfer ownership");

//       window.location.reload(); // Refresh after successful transfer
//     } catch (error) {
//       console.error("Error transferring diamond:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Processing Dashboard</h2>
//       <p>Manage rough diamonds, scan images, and transfer ownership.</p>

//       <input 
//         type="text" 
//         value={newDiamond} 
//         onChange={(e) => setNewDiamond(e.target.value)} 
//         placeholder="Enter Diamond Name" 
//       />
//       <button onClick={addDiamond}>Add Diamond</button>

//       <ul>
//         {diamonds.map(diamond => (
//           <li key={diamond.id}>
//             {diamond.name} - {diamond.status} 
//             <button onClick={() => transferOwnership(diamond.id)}>Transfer</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default ProcessingDashboard;

// ************************************************************** NEW
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProcessingDashboard({ user }) {
  const [diamonds, setDiamonds] = useState([]);
  const [condition, setCondition] = useState("");
  const [owner, setOwner] = useState("");
  const [imageHash, setImageHash] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/diamond/processing")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Diamonds:", data);
        setDiamonds(data);
      })
      .catch((err) => console.error("Error fetching diamonds:", err));
  }, []);

  const addDiamond = async () => {
    if (!condition || !owner || !imageHash) {
      alert("Please enter all fields!");
      return;
    }

    const response = await fetch("http://localhost:5000/api/diamond/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ condition, owner, imageHash }),
    });

    if (response.ok) {
      alert("Diamond Created Successfully!");
      window.location.reload();
    } else {
      const errorData = await response.json();
      alert("Error: " + errorData.error);
    }
  };

  return (
    <div>
      <h2>Processing Dashboard</h2>

      <input
        type="text"
        value={condition}
        onChange={(e) => setCondition(e.target.value)}
        placeholder="Enter Diamond Condition"
      />
      <input
        type="text"
        value={owner}
        onChange={(e) => setOwner(e.target.value)}
        placeholder="Enter Owner Name"
      />
      <input
        type="text"
        value={imageHash}
        onChange={(e) => setImageHash(e.target.value)}
        placeholder="Enter Image Hash (IPFS CID)"
      />
      <button onClick={addDiamond}>Create Diamond</button>

      <h3>Diamonds List</h3>
      {diamonds.length === 0 ? (
        <p>No diamonds available.</p>
      ) : (
        <ul>
          {diamonds.map((diamond) => (
            <li key={diamond._id}>
              <strong>Condition:</strong> {diamond.condition} <br />
              <strong>Owner:</strong> {diamond.owner} <br />
              <button onClick={() => navigate(`/transfer/${diamond._id}`)}>Transfer Ownership</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProcessingDashboard;
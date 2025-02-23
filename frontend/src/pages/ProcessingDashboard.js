import React, { useEffect, useState } from "react";

function ProcessingDashboard({ user }) {
  const [diamonds, setDiamonds] = useState([]);
  const [newDiamond, setNewDiamond] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/diamond/processing", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => res.json())
      .then(data => setDiamonds(data))
      .catch(error => console.error("Error fetching diamonds:", error));
  }, []);

  const addDiamond = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/diamond/create", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          diamondId: newDiamond,  // Assuming this is the name
          condition: "new",       // Provide a default condition
          owner: user?.id || "Unknown", // Set owner (fallback for safety)
          imageHash: "placeholder_hash" // Placeholder for now
        })
      });

      if (!response.ok) throw new Error("Failed to create diamond");

      const data = await response.json();
      setDiamonds([...diamonds, data]); // Add new diamond to the list
      setNewDiamond("");
    } catch (error) {
      console.error("Error adding diamond:", error);
    }
  };

  const transferOwnership = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/diamond/transfer/${id}`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
      });

      if (!response.ok) throw new Error("Failed to transfer ownership");

      window.location.reload(); // Refresh after successful transfer
    } catch (error) {
      console.error("Error transferring diamond:", error);
    }
  };

  return (
    <div>
      <h2>Processing Dashboard</h2>
      <p>Manage rough diamonds, scan images, and transfer ownership.</p>

      <input 
        type="text" 
        value={newDiamond} 
        onChange={(e) => setNewDiamond(e.target.value)} 
        placeholder="Enter Diamond Name" 
      />
      <button onClick={addDiamond}>Add Diamond</button>

      <ul>
        {diamonds.map(diamond => (
          <li key={diamond.id}>
            {diamond.name} - {diamond.status} 
            <button onClick={() => transferOwnership(diamond.id)}>Transfer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProcessingDashboard;

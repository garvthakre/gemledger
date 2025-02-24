import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function TransferOwnership() {
  const { id } = useParams(); // Get diamond ID from URL
  const [newOwner, setNewOwner] = useState("");
  const navigate = useNavigate();

  const handleTransfer = async () => {
    if (!newOwner) {
      alert("Please enter a new owner name!");
      return;
    }

    const response = await fetch(`http://localhost:5000/api/diamond/transfer/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newOwner }),
    });

    if (response.ok) {
      alert("Ownership Transferred Successfully!");
      navigate("/dashboard/processing"); // Redirect back to dashboard
    } else {
      const errorData = await response.json();
      alert("Error: " + errorData.error);
    }
  };

  return (
    <div>
      <h2>Transfer Ownership</h2>
      <p>Diamond ID: {id}</p>

      <input
        type="text"
        value={newOwner}
        onChange={(e) => setNewOwner(e.target.value)}
        placeholder="Enter New Owner Name"
      />
      <button onClick={handleTransfer}>Confirm Transfer</button>
    </div>
  );
}

export default TransferOwnership;

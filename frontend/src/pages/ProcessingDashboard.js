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

import React, { useEffect, useState } from "react";

function DiamondHistory({ user }) {
    const [diamondId, setDiamondId] = useState("");
    const [history, setHistory] = useState([]);
  
    const fetchHistory = () => {
      fetch(`/api/diamond/history/${diamondId}`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
      })
      .then(res => res.json())
      .then(data => setHistory(data));
    };
  
    return (
      <div>
        <h2>Diamond History</h2>
        <input type="text" value={diamondId} onChange={(e) => setDiamondId(e.target.value)} placeholder="Enter Diamond ID" />
        <button onClick={fetchHistory}>Search</button>
        <ul>
          {history.map(entry => (
            <li key={entry.timestamp}>{entry.status} - {entry.owner}</li>
          ))}
        </ul>
      </div>
    );
  }
  

export default DiamondHistory
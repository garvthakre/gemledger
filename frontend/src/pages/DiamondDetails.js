import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function DiamondDetails() {
  const { id } = useParams();
  const [diamond, setDiamond] = useState(null);

  useEffect(() => {
    fetch(`/api/blockchain/diamond/${id}`)
      .then((res) => res.json())
      .then((data) => setDiamond(data));
  }, [id]);

  if (!diamond) return <p>Loading diamond details...</p>;

  return (
    <div>
      <h2>Diamond Details</h2>
      <p><strong>ID:</strong> {diamond.id}</p>
      <p><strong>Status:</strong> {diamond.status}</p>
      <p><strong>Owner:</strong> {diamond.owner}</p>
      <img src={diamond.image} alt="Diamond" width="200" />
      <p><strong>History:</strong></p>
      <ul>
        {diamond.history.map((event, index) => (
          <li key={index}>{event}</li>
        ))}
      </ul>
    </div>
  );
}

export default DiamondDetails;

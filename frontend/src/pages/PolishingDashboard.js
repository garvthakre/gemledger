import React, {useState, useEffect} from 'react'

function PolishingDashboard({ user }) {
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
              diamondId: newDiamond,
              condition: "new",
              owner: user?.id || "Unknown",
              imageHash: "placeholder_hash"
            })
          });
    
          if (!response.ok) throw new Error("Failed to create diamond");
    
          const data = await response.json();
          setDiamonds([...diamonds, data]);
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
          
          setDiamonds(diamonds.filter(diamond => diamond.id !== id));
        } catch (error) {
          console.error("Error transferring diamond:", error);
        }
      };
    
      return (
        <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Processing Dashboard</h2>
          <p className="text-gray-600 mb-6">Manage rough diamonds, scan images, and transfer ownership.</p>
          
          <div className="flex gap-2 mb-4">
            <input 
              type="text" 
              value={newDiamond} 
              onChange={(e) => setNewDiamond(e.target.value)} 
              placeholder="Enter Diamond Name" 
              className="p-2 border rounded-md w-full focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <button 
              onClick={addDiamond} 
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Add Diamond
            </button>
          </div>
    
          <ul className="divide-y divide-gray-300">
            {diamonds.map(diamond => (
              <li key={diamond.id} className="flex justify-between items-center py-3">
                <div>
                  <p className="text-lg font-semibold text-gray-800">{diamond.name}</p>
                  <p className="text-sm text-gray-500">Status: {diamond.status}</p>
                </div>
                <button 
                  onClick={() => transferOwnership(diamond.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                >
                  Transfer
                </button>
              </li>
            ))}
          </ul>
        </div>
    );
  }

export default PolishingDashboard
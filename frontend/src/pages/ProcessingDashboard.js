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
import {
  Container, TextField, Button, Card, CardContent, Typography, Grid, Box, IconButton, CircularProgress
} from "@mui/material";
import { AddCircleOutline, ArrowForward, Diamond as DiamondIcon } from "@mui/icons-material";

function ProcessingDashboard({ user }) {
  const [diamonds, setDiamonds] = useState([]);
  const [condition, setCondition] = useState("");
  const [owner, setOwner] = useState(user?.id || ""); // Auto-fill logged-in user
  const [imageHash, setImageHash] = useState("");
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const navigate = useNavigate();

  // ✅ Fetch diamonds on load
  useEffect(() => {
    fetch("http://localhost:5000/api/diamond/processing")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Diamonds:", data);
        setDiamonds(data);
      })
      .catch((err) => console.error("Error fetching diamonds:", err))
      .finally(() => setLoading(false));
  }, []);

  // ✅ Add a new diamond
  const addDiamond = async () => {
    if (!condition || !owner || !imageHash) {
      alert("Please enter all fields!");
      return;
    }

    setAdding(true);

    try {
      const response = await fetch("http://localhost:5000/api/diamond/create", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ condition, owner, imageHash }),
      });

      if (!response.ok) {
        throw new Error("Failed to create diamond");
      }

      const data = await response.json();
      setDiamonds([...diamonds, data.diamond]); // Update UI without reload
      setCondition("");
      setImageHash("");
      alert("Diamond Created Successfully!");
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setAdding(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box textAlign="center" my={4}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Processing Dashboard
        </Typography>
      </Box>

      {/* Add Diamond Form */}
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Diamond Condition"
          variant="outlined"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          fullWidth
        />
        <TextField
          label="Owner Name"
          variant="outlined"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          fullWidth
          
        />
        <TextField
          label="Image Hash (IPFS CID)"
          variant="outlined"
          value={imageHash}
          onChange={(e) => setImageHash(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleOutline />}
          onClick={addDiamond}
          disabled={adding}
          fullWidth
        >
          {adding ? <CircularProgress size={24} /> : "Create Diamond"}
        </Button>
      </Box>

      {/* Diamonds List */}
      <Box mt={5}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Diamonds List
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : diamonds.length === 0 ? (
          <Typography variant="body1">No diamonds available.</Typography>
        ) : (
          <Grid container spacing={3}>
            {diamonds.map((diamond) => (
              <Grid item xs={12} sm={6} md={4} key={diamond._id}>
                <Card
                  sx={{
                    p: 2,
                    boxShadow: 5,
                    borderRadius: 3,
                    background: "linear-gradient(145deg, #f0f0f0, #cacaca)",
                  }}
                >
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={1}>
                      <DiamondIcon color="primary" />
                      <Typography variant="h6" fontWeight="bold">
                        {diamond.condition}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="textSecondary">
                      Owner: {diamond.owner}
                    </Typography>
                    <Box textAlign="right" mt={2}>
                      <IconButton
                        color="primary"
                        onClick={() => navigate(`/transfer/${diamond._id}`)}
                      >
                        <ArrowForward />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
}

export default ProcessingDashboard;

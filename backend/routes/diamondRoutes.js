const express = require("express");
const Diamond = require("../models/Diamond");
const authMiddleware = require("../middleware/authMiddleware");
const getContractInstance = require("../utils/getContractInstance");

const router = express.Router();

// ✅ CREATE DIAMOND
router.post("/create", authMiddleware, async (req, res) => {
  try {
    console.log("Received request:", req.body);
    const { condition, owner, imageHash } = req.body;

    if (!condition || !owner || !imageHash) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const contract = getContractInstance();
    console.log("Contract instance fetched");

    const tx = await contract.createDiamond(condition, owner, imageHash);
    await tx.wait();

    // Save to database
    const newDiamond = new Diamond({ condition, owner, imageHash, status: "processing" });
    await newDiamond.save();

    console.log("Diamond created successfully");
    res.json({ message: "Diamond Created Successfully!", txHash: tx.hash, diamond: newDiamond });
  } catch (error) {
    console.error("Error in /create route:", error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ FETCH PROCESSING DIAMONDS
router.get("/processing", async (req, res) => {
  try {
    const diamonds = await Diamond.find({ status: "processing" });

    if (!diamonds.length) {
      return res.status(404).json({ message: "No diamonds found" });
    }

    res.json(diamonds);
  } catch (error) {
    console.error("Error fetching processing diamonds:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ TRANSFER OWNERSHIP
router.post("/transfer/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { newOwner } = req.body;

    if (!newOwner) {
      return res.status(400).json({ error: "New owner is required" });
    }

    const contract = getContractInstance();
    const tx = await contract.transferOwnership(id, newOwner);
    await tx.wait();

    // Update database
    const updatedDiamond = await Diamond.findByIdAndUpdate(id, { owner: newOwner }, { new: true });

    res.json({ message: "Ownership Transferred Successfully!", txHash: tx.hash, diamond: updatedDiamond });
  } catch (error) {
    console.error("Error transferring ownership:", error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ UPDATE DIAMOND DETAILS
router.put("/update/:id", authMiddleware, async (req, res) => {
  try {
    const updatedDiamond = await Diamond.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedDiamond) {
      return res.status(404).json({ error: "Diamond not found" });
    }

    res.json(updatedDiamond);
  } catch (err) {
    console.error("Error updating diamond:", err);
    res.status(500).json({ error: "Error updating diamond" });
  }
});

module.exports = router;

const express = require("express");
const Diamond = require("../models/Diamond");
const authMiddleware = require("../middleware/authMiddleware");
const getContractInstance = require("../utils/getContractInstance");
const router = express.Router();

// ✅ FIXED: No need for "/api/diamond" prefix, since it's already set in `server.js`
router.post("/create", async (req, res) => {
    try {
        console.log("Received request:", req.body);

        const { condition, owner, imageHash } = req.body;
        if (!condition || !owner || !imageHash) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const contract = getContractInstance();
        console.log("Contract instance fetched");

        const tx = await contract.createDiamond(condition, owner, imageHash); // ✅ Pass all 3 params
        await tx.wait();

        console.log("Diamond created successfully");
        res.json({ message: "Diamond Created Successfully!", txHash: tx.hash });
    } catch (error) {
        console.error("Error in /create route:", error);
        res.status(500).json({ error: error.message });
    }
});


// ✅ Update Diamond by ID
router.put("/update/:id", authMiddleware, async (req, res) => {
    try {
        const updatedDiamond = await Diamond.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedDiamond);
    } catch (err) {
        res.status(500).json(err);
    }
});

// ✅ Transfer Ownership
router.post("/transfer/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const contract = getContractInstance();
        const tx = await contract.transferOwnership(id, req.user.address);
        await tx.wait();

        res.json({ message: "Ownership Transferred Successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get("/processing", async (req, res) => {
    try {
        const diamonds = await Diamond.find({ status: "processing" });
        res.json(diamonds);
    } catch (error) {
        console.error("Error fetching processing diamonds:", error);
        res.status(500).json({ error: "Server error" });
    }
});



module.exports = router;

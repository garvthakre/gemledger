const express = require("express");
const Diamond = require("../models/Diamond");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/create", authMiddleware, async (req, res) => {
    const { diamondId, condition, owner, imageHash } = req.body;
    try {
        const diamond = new Diamond({ diamondId, condition, owner, verified: false, imageHash });
        await diamond.save();
        res.status(201).json(diamond);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put("/update/:id", authMiddleware, async (req, res) => {
    try {
        const updatedDiamond = await Diamond.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedDiamond);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
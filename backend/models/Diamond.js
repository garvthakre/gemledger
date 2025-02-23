const mongoose = require("mongoose");

const DiamondSchema = new mongoose.Schema({
    diamondId: Number,
    condition: String,
    owner: String,
    verified: Boolean,
    status: {
        type: String,
        enum: ["processing", "completed", "pending"],
        default: "pending"
    }
});

module.exports = mongoose.model("Diamond", DiamondSchema);

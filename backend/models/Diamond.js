const mongoose = require("mongoose");

DiamondSchema = new mongoose.Schema({
    diamondId: Number,
    condition: String,
    owner: String,
    verified: Boolean,
});
module.exports = mongoose.model("Diamond", DiamondSchema);
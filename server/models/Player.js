import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  first_name: String,
  last_name: String,
  position: String,
  height: String,
  weight: String,
  team: {
    id: Number,
    full_name: String,
    abbreviation: String,
    city: String,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Automatically update the timestamp when player data changes
playerSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Player = mongoose.model("Player", playerSchema);

export default Player;

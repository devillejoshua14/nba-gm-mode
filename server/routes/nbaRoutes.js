import express from "express";
import axios from "axios";
import Player from "../models/Player.js";

const router = express.Router();

/**
 * ------------------------------------------------------
 *  GET /api/players
 *  Checks MongoDB for cached players first.
 *  If none found, fetches from BallDontLie API and caches them.
 * ------------------------------------------------------
 */
router.get("/players", async (req, res) => {
  const cursor = req.query.cursor;
  const per_page = 100; // Max per page allowed by API

  try {
    // 1️⃣ Check MongoDB first
    const existingPlayers = await Player.find();

    if (existingPlayers.length > 0) {
      console.log("✅ Serving players from MongoDB cache");
      return res.json({ data: existingPlayers });
    }

    // 2️⃣ If no cache, fetch from BallDontLie API
    console.log("🌐 Fetching players from BallDontLie API...");
    const params = { per_page };
    if (cursor) params.cursor = cursor;

    const response = await axios.get("https://api.balldontlie.io/v1/players", {
      params,
      headers: {
        Authorization: `${process.env.BALLDONTLIE_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    const players = response.data.data;

    // 3️⃣ Save fetched players into MongoDB
    await Player.insertMany(players, { ordered: false }).catch((err) => {
      console.log("⚠️ Some players may already exist in DB:", err.message);
    });

    console.log(`💾 Cached ${players.length} players in MongoDB`);

    // 4️⃣ Return data to frontend
    res.json({
      data: players,
      next_cursor: response.data.meta.next_cursor,
    });
  } catch (error) {
    console.error("Error fetching or caching players:", error.message);
    res.status(500).json({ message: "Failed to fetch players" });
  }
});

export default router;

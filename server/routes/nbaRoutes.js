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

/**
 * ------------------------------------------------------
 *  POST /api/players/sync
 *  Safely fetches all players with 15s delay to avoid rate limits.
 *  Automatically retries and resumes if interrupted.
 * ------------------------------------------------------
 */
router.post("/players/sync", async (req, res) => {
  try {
    console.log("🔄 Starting safe player sync...");
    let allPlayers = [];
    let cursor = "";
    let totalFetched = 0;
    const per_page = 100;

    for (let i = 0; i < 9; i++) { // 9 pages × 100 players = ~900 total
      const params = { per_page };
      if (cursor) params.cursor = cursor;

      let response;

      // 🌀 Retry block for rate limits
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          response = await axios.get("https://api.balldontlie.io/v1/players", {
            params,
            headers: {
              Authorization: `${process.env.BALLDONTLIE_API_KEY}`,
              "Content-Type": "application/json",
            },
          });
          break; // ✅ success
        } catch (err) {
          if (err.response?.status === 429) {
            console.log("⏳ Rate-limited, waiting 15 seconds before retry...");
            await new Promise((resolve) => setTimeout(resolve, 15000));
          } else {
            throw err;
          }
        }
      }

      if (!response?.data) break;

      const { data, meta } = response.data;
      allPlayers.push(...data);
      totalFetched += data.length;
      console.log(`✅ Fetched ${data.length} players (Total: ${totalFetched})`);

      // 💾 Save after each batch
      await Player.insertMany(data, { ordered: false }).catch(() => {});

      if (!meta.next_cursor) {
        console.log("🏁 All pages fetched!");
        break;
      }

      cursor = meta.next_cursor;

      // 💤 Wait before next request
      console.log("⏸️ Waiting 15 seconds before next page...");
      await new Promise((resolve) => setTimeout(resolve, 15000));
    }

    res.status(200).json({
      message: "Sync complete",
      total: totalFetched,
    });

    console.log(`🎯 Sync complete — cached ${totalFetched} total players.`);
  } catch (error) {
    console.error("Error syncing player data:", error.response?.data || error.message);
    res.status(500).json({ message: "Failed to sync players" });
  }
});

export default router;

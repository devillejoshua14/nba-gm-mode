import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/players", async (req, res) => {
  const cursor = req.query.cursor; // undefined if not provided
  const per_page = 100;

  try {
    console.log(`Fetching players ${cursor ? `with cursor: ${cursor}` : "from START"}`);

    const params = { per_page };
    if (cursor) params.cursor = cursor; // only add cursor if defined

    const response = await axios.get("https://api.balldontlie.io/v1/players", {
      params,
      headers: {
        Authorization: `${process.env.BALLDONTLIE_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    res.json({
      data: response.data.data,
      next_cursor: response.data.meta.next_cursor,
    });
  } catch (error) {
    console.error("Error fetching players:", error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      message: "Failed to fetch players",
      details: error.response?.data || error.message,
    });
  }
});

export default router;

import { useEffect, useState } from "react";
import axios from "axios";
import PlayerCard from "./PlayerCard";

function PlayerList() {
  const [players, setPlayers] = useState([]);
  const [cursor, setCursor] = useState(""); // API pagination cursor
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPlayers = async () => {
    if (!hasMore) return;
    setLoading(true);

    try {
      console.log("Requesting cursor:", cursor || "START");
      const res = await axios.get(`http://localhost:5001/api/players?cursor=${cursor}`);
      const newPlayers = res.data.data;

      setPlayers((prev) => [...prev, ...newPlayers]);

      if (res.data.next_cursor) {
        setCursor(res.data.next_cursor);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Failed to fetch players:", err);
      setError("Failed to fetch players");
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchPlayers();
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>🏀 NBA GM Mode</h1>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
        {players.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>

      {loading && <p>Loading players...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {hasMore && !loading && (
        <button
          onClick={fetchPlayers}
          style={{
            marginTop: "1rem",
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#007bff",
            color: "white",
            cursor: "pointer",
          }}
        >
          Load More Players
        </button>
      )}

      {!hasMore && <p>✅ All players loaded!</p>}
    </div>
  );
}

export default PlayerList;

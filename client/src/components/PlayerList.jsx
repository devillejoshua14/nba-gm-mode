import { useState, useEffect } from "react";
import axios from "axios";
import PlayerCard from "./PlayerCard";
import MyTeamSidebar from "./MyTeamSidebar";

function PlayerList() {
  const [players, setPlayers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [team, setTeam] = useState([]);
  const [IsSidebarOpen, setIsSidebarOpen] = useState(false);
  const salaryCap = 150000000;

  useEffect(() => {
    const fetchPlayers = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:5001/api/players");
        console.log("API Response:", res.data);
        const playerArray = Array.isArray(res.data) ? res.data : res.data.data;
        setPlayers(playerArray || []);
      } catch (err) {
        console.error("Error fetching players:", err);
        setError("Failed to load players.");
      } finally {
        setLoading(false);
      }
    };
    fetchPlayers();
  }, []);

  // ✅ Apply filters
  const filteredPlayers = players.filter((player) => {
    const fullName = `${player.first_name} ${player.last_name}`.toLowerCase();
    const team = player.team?.full_name?.toLowerCase() || "";
    const position = player.position?.toLowerCase() || "";

    const matchesSearch =
      fullName.includes(search.toLowerCase()) ||
      team.includes(search.toLowerCase()) ||
      position.includes(search.toLowerCase());

    const matchesPosition =
      selectedPosition === "All" ||
      player.position?.toUpperCase() === selectedPosition;

    return matchesSearch && matchesPosition;
  });

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>🏀 NBA GM Mode</h1>

      <button
        onClick={() => setIsSidebarOpen(true)}
        style={{
          marginBottom: "1rem",
          padding: "0.75rem 1.5rem",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "1rem",
        }}
      >
        View My Team ({team.length})
      </button>


      {/* 🔍 Search + Filter Controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
          flexWrap: "wrap",
          backgroundColor: "#1e1e1e",
          padding: "1rem 1.5rem",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
          width: "90%",
          maxWidth: "800px",
          margin: "1.5rem auto",
        }}
      >
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by name, team, or position..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "0.75rem 1rem",
            flex: "1",
            minWidth: "250px",
            borderRadius: "8px",
            border: "1px solid #444",
            fontSize: "1rem",
            backgroundColor: "#222",
            color: "#fff",
            outline: "none",
          }}
        />

        {/* 🧠 Position Dropdown */}
        <select
          value={selectedPosition}
          onChange={(e) => setSelectedPosition(e.target.value)}
          style={{
            padding: "0.75rem",
            borderRadius: "8px",
            border: "1px solid #444",
            fontSize: "1rem",
            backgroundColor: "#222",
            color: "#fff",
            cursor: "pointer",
            minWidth: "150px"
          }}
        >
          <option value="All">All Positions</option>
          <option value="G">Guard (G)</option>
          <option value="F">Forward (F)</option>
          <option value="C">Center (C)</option>
        </select>
      </div>

      {loading && <p>Loading players...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
        {filteredPlayers.map((player) => (
          <div key={player.id} style={{ position: "relative" }}>
            <PlayerCard player={player} />
            <button
              onClick={() => {
                if (!team.find((p) => p.id === player.id)) {
                  setTeam([...team, player]);
                }
              }}
              disabled={team.find((p) => p.id === player.id)}
              style={{
                position: "absolute",
                bottom: "10px",
                right: "10px",
                backgroundColor: team.find((p) => p.id === player.id) ? "#666" : "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                padding: "0.5rem 1rem",
                cursor: team.find((p) => p.id === player.id) ? "not-allowed" : "pointer",
              }}
            >
              {team.find((p) => p.id === player.id) ? "Drafted" : "Draft"}
          </button>
      </div>

        ))}
      </div>

      <MyTeamSidebar
        isOpen={IsSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        team={team}
        totalSalary={team.length * 10000000} // temp $10M per player
        salaryCap={salaryCap}
      />

      {!loading && filteredPlayers.length === 0 && (
        <p>No players found matching your search.</p>
      )}
    </div>
  );
}

export default PlayerList;

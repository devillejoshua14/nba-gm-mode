const PlayerCard = ({ player, isDrafted = false }) => {
  return (
    <div
      style={{
        background: isDrafted ? "#2d4a2d" : "#1e1e1e",
        color: "white",
        padding: "1rem",
        borderRadius: "10px",
        width: "220px",
        boxShadow: isDrafted 
          ? "0 0 10px rgba(40, 167, 69, 0.3)" 
          : "0 0 10px rgba(255, 255, 255, 0.1)",
        border: isDrafted ? "2px solid #28a745" : "none",
      }}
    >
      <h3 style={{ marginTop: 0 }}>
        {player.first_name} {player.last_name}
        {isDrafted && " ✅"}
      </h3>
      <p><strong>Team:</strong> {player.team?.full_name || "N/A"}</p>
      <p><strong>Position:</strong> {player.position || "N/A"}</p>
      <p><strong>Height:</strong> {player.height || "N/A"}</p>
      <p><strong>Weight:</strong> {player.weight || "N/A"}</p>
      {player.salary && (
        <p style={{ color: "#0f0", fontWeight: "bold", marginTop: "0.5rem" }}>
          💰 ${player.salary.toLocaleString()}
        </p>
      )}
      {player.rating && (
        <p style={{ 
          color: player.rating >= 85 ? "#00ff00" : player.rating >= 70 ? "#ffff00" : "#ff4444",
          fontWeight: "bold",
          marginTop: "0.5rem"
        }}>
          ⭐ Rating: {player.rating}/100
        </p>
      )}
    </div>
  );
};

export default PlayerCard;

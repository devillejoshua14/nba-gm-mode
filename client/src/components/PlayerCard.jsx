const PlayerCard = ({ player }) => {
  return (
    <div
      style={{
        background: "#1e1e1e",
        color: "white",
        padding: "1rem",
        borderRadius: "10px",
        width: "220px",
        boxShadow: "0 0 10px rgba(255, 255, 255, 0.1)",
      }}
    >
      <h3>{player.first_name} {player.last_name}</h3>
      <p><strong>Team:</strong> {player.team.full_name}</p>
      <p><strong>Position:</strong> {player.position || "N/A"}</p>
      <p><strong>Height:</strong> {player.height || "N/A"}</p>
      <p><strong>Weight:</strong> {player.weight || "N/A"}</p>
    </div>
  );
};

export default PlayerCard;

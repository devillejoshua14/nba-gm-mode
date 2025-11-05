import React from "react";

function MyTeamSidebar({ isOpen, onClose, team, totalSalary, salaryCap, onRemovePlayer }) {
  const averageRating =
    team.length > 0
      ? Math.round(team.reduce((sum, p) => sum + p.rating, 0) / team.length)
      : 0;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: isOpen ? 0 : "-400px", // slide in/out
        height: "100vh",
        width: "350px",
        backgroundColor: "#111",
        color: "white",
        padding: "1rem",
        boxShadow: "0 0 20px rgba(0,0,0,0.5)",
        transition: "right 0.3s ease-in-out",
        zIndex: 1000,
        overflowY: "auto",
      }}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        style={{
          background: "none",
          border: "none",
          color: "#fff",
          fontSize: "1.2rem",
          cursor: "pointer",
          marginBottom: "1rem",
        }}
      >
        ✖ Close
      </button>

      <h2>🏀 My Team</h2>
      <p>
        <strong>Salary Cap:</strong> ${totalSalary.toLocaleString()} / $
        {salaryCap.toLocaleString()}
      </p>

      <p
        style={{
          color: totalSalary > salaryCap ? "#ff4444" : "#0f0",
          fontWeight: "bold",
          marginBottom: "1rem",
        }}
      >
        {totalSalary > salaryCap
          ? "⚠️ Over the Salary Cap!"
          : "Within Cap Limit ✅"}
      </p>

      <p>
        <strong>Team Performance Rating:</strong>{" "}
        <span
          style={{
            color:
              averageRating >= 85
                ? "#00ff00"
                : averageRating >= 70
                ? "#ffff00"
                : "#ff4444",
            fontWeight: "bold",
          }}
        >
          {averageRating}/100
        </span>
      </p>

      <hr style={{ border: "1px solid #333", margin: "1rem 0" }} />

      {team.length === 0 ? (
        <p>No players drafted yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {team.map((player) => (
            <li
              key={player.id}
              style={{
                marginBottom: "1rem",
                padding: "0.75rem",
                backgroundColor: "#222",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div style={{ flex: 1 }}>
                <strong>
                  {player.first_name} {player.last_name}
                </strong>
                <br />
                <small>
                  {player.team?.full_name || "N/A"} — {player.position || "N/A"}
                </small>
                <br />
                {player.rating && (
                  <span style={{
                    color: player.rating >= 85 ? "#00ff00" : player.rating >= 70 ? "#ffff00" : "#ff4444",
                    fontWeight: "bold",
                    fontSize: "0.9rem"
                  }}>
                    ⭐ {player.rating}/100
                  </span>
                )}
                <br />
                <span style={{color: "#0f0", fontWeight: "bold"}}>
                  💰 ${player.salary.toLocaleString()}
                </span>
              </div>
              {onRemovePlayer && (
                <button
                  onClick={() => onRemovePlayer(player.id)}
                  style={{
                    background: "#dc3545",
                    border: "none",
                    color: "white",
                    borderRadius: "4px",
                    padding: "0.25rem 0.5rem",
                    cursor: "pointer",
                    fontSize: "0.8rem",
                    marginLeft: "0.5rem",
                  }}
                  title="Remove from team"
                >
                  ✖
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyTeamSidebar;

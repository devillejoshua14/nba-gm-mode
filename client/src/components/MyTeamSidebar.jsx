import React from "react";

function MyTeamSidebar({ isOpen, onClose, team, totalSalary, salaryCap }) {
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
                padding: "0.5rem",
                backgroundColor: "#222",
                borderRadius: "8px",
              }}
            >
              <strong>
                {player.first_name} {player.last_name}
              </strong>
              <br />
              <small>
                {player.team.full_name} — {player.position || "N/A"}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyTeamSidebar;

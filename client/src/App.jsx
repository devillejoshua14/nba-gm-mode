import PlayerList from "./components/PlayerList";

function App() {
  return (
    // 🎨 Step 3: Background Polish Wrapper
    <div
      style={{
        backgroundColor: "#0d1117",
        minHeight: "100vh",
        padding: "2rem",
        color: "white",
      }}
    >
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <PlayerList />
      </div>
    </div>
  );
}

export default App;

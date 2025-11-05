# 🏀 NBA GM Mode

**Tech Stack:** MERN (MongoDB, Express, React, Node.js) + External NBA API  

A full-stack NBA management simulation where users can act as a General Manager — drafting players, managing a salary cap, and building their ultimate team.

---

## 🚀 Features

✅ Fetches real NBA player data via external API  
✅ Draft players and manage your roster  
✅ Tracks salary cap in real time  
✅ Calculates team performance rating dynamically  
✅ Search and filter by name, team, or position  
✅ MongoDB caching layer to handle rate limits  
✅ Dark, NBA-themed UI styled with React inline CSS  

---

## 🧠 Tech Overview

**Frontend**
- React (Vite)  
- Axios for API calls  
- Dynamic components: PlayerCard, PlayerList, MyTeamSidebar  

**Backend**
- Node.js + Express server  
- MongoDB (Atlas) for caching and persistence  
- Axios to retrieve player data from [balldontlie.io](https://www.balldontlie.io)  
- Environment variables via `.env`

---

## ⚙️ Setup & Run

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/nba-gm-mode.git
cd nba-gm-mode

---

## 🖥️ Project Structure
```
nba-gm-mode/
│
├── client/ # React frontend
│ ├── src/
│ │ ├── components/
│ │ │ ├── PlayerCard.jsx
│ │ │ ├── PlayerList.jsx
│ │ │ └── MyTeamSidebar.jsx
│ │ ├── App.jsx
│ │ ├── main.jsx
│ ├── package.json
│
├── server/ # Node backend
│ ├── routes/
│ │ └── nbaRoutes.js
│ ├── server.js
│ ├── package.json
│
├── .env # (ignored)
├── .gitignore
└── README.md
```

---

## ⚙️ Setup & Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/<your-username>/nba-gm-mode.git
   cd nba-gm-mode
   ```

2. **Install dependencies**
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```

3. **Create a `.env` file** inside `/server`:
   ```
   BALLDONTLIE_API_KEY=your_api_key_here
   PORT=5001
   ```

4. **Run both servers**
   - Backend:  
     ```bash
     cd server
     npx nodemon server.js
     ```
   - Frontend:  
     ```bash
     cd client
     npm run dev
     ```

5. Open in your browser:  
   👉 `http://localhost:5173`

---

## 🧠 Lessons Learned
This project reinforced:
- Debugging API rate limits and pagination handling
- Coordinating frontend and backend integration
- Managing environment variables securely
- Building reusable UI components with React
- Implementing a caching strategy with MongoDB

---

## 🏁 Future Enhancements
- Team Matchups and simualtions
- Enhanced Stats vizualization
- Filter by team  
- Minor UI/UX imporovements 

---

## 👨‍💻 Author
**Joshua DeVille**  
🔗 [GitHub Profile](https://github.com/devillejoshua14)

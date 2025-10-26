# 🏀 NBA GM Mode

## 📖 Overview
**NBA GM Mode** is a full-stack basketball management dashboard that uses the **Ball Don’t Lie API** to display detailed NBA player data. Users can explore player information, load more results through pagination, and experience smooth frontend-backend integration powered by **React** and **Express**.

This project demonstrates API integration, pagination handling, backend routing, and responsive frontend design — built from scratch as part of a learning journey in modern web development.

---

## 🚀 Tech Stack

**Frontend:**
- React (Vite)
- Axios
- CSS Flexbox for layout

**Backend:**
- Node.js
- Express.js
- Axios
- Dotenv for environment variables

**Other Tools:**
- Ball Don’t Lie API (for live player data)
- Git / GitHub for version control

---

## 🧩 Features
✅ Fetches live NBA player data from Ball Don’t Lie API  
✅ Implements pagination & “Load More Players” button  
✅ Responsive player cards displaying team, position, height, and weight  
✅ Error handling and loading states  
✅ Secure `.env` file for API key management  

---

## 🖥️ Project Structure
```
nba-gm-mode/
│
├── client/           # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── PlayerCard.jsx
│   │   │   ├── PlayerList.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   ├── package.json
│
├── server/           # Node backend
│   ├── routes/
│   │   └── nbaRoutes.js
│   ├── server.js
│   ├── package.json
│
├── .env              # (ignored)
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

---

## 🏁 Future Enhancements
- Add MongoDB caching to reduce API calls  
- Add player search functionality  
- Filter by position or team  
- Improve mobile styling and UI animations  

---

## 👨‍💻 Author
**Joshua DeVille**  
🔗 [GitHub Profile](https://github.com/devillejoshuah)

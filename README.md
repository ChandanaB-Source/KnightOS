# ♟ KnightOS — Competitive Chess SaaS Platform

![KnightOS](https://img.shields.io/badge/KnightOS-Chess%20SaaS-gold?style=for-the-badge&logo=lichess)
![Node](https://img.shields.io/badge/Node.js-20-green?style=for-the-badge&logo=node.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)

> A full-stack competitive chess platform with real-time multiplayer, ELO ranking, AI opponent, puzzles, friend system, and Google OAuth.

🌐 **Live App:** https://knight-os-frontend.vercel.app  
🔧 **Backend API:** https://knightos-backend-production.up.railway.app

---

## ✨ Features

| Feature | Description |
|---|---|
| ♟ **Real-time Multiplayer** | Play against other players with live move sync via Socket.io |
| 🤖 **AI Opponent** | 8 difficulty levels powered by Stockfish |
| 🏆 **ELO Ranking System** | Competitive rated games with rank tiers (Bronze → Diamond) |
| 🧩 **Chess Puzzles** | Solve daily puzzles to improve your game |
| 👥 **Friend System** | Add friends, send challenges, real-time notifications |
| 📺 **Spectator Mode** | Watch live games in real time |
| 🔍 **Post-game Analysis** | Instant game evaluation after each match |
| 🎵 **Sound Effects** | Move, capture, check sounds |
| 📖 **Opening Detection** | Identifies chess openings as you play |
| 🔐 **Google OAuth** | Sign in with Google account |
| 💎 **Premium Tier** | Monetisation-ready pricing page |
| 📊 **Leaderboard** | Global rankings with tier filters |

---

## 🗂 Project Structure

```
knightos/
├── backend/          Node.js + Express + TypeScript + MongoDB + Socket.io
│   ├── src/
│   │   ├── controllers/    Route handlers
│   │   ├── models/         Mongoose schemas
│   │   ├── routes/         Express routers
│   │   ├── services/       Socket.io, DB, Logger
│   │   ├── middleware/      Auth, Error handling
│   │   └── index.ts        Entry point
│   └── Dockerfile
├── frontend/         React 18 + TypeScript + Vite + Zustand + Framer Motion
│   ├── src/
│   │   ├── components/     Reusable UI components
│   │   ├── pages/          Route pages
│   │   ├── store/          Zustand state management
│   │   └── services/       API, Socket, Sounds
│   └── vercel.json
└── README.md
```

---

## 🛠 Tech Stack

### Backend
- **Node.js 20** + **Express** + **TypeScript**
- **MongoDB Atlas** + **Mongoose**
- **Socket.io** — real-time communication
- **JWT** — authentication
- **Google Auth Library** — OAuth
- **Railway** — deployment

### Frontend
- **React 18** + **TypeScript** + **Vite**
- **Zustand** — state management
- **Framer Motion** — animations
- **Chess.js** — game logic
- **Stockfish** — AI engine
- **Vercel** — deployment

---

## ⚡ Quick Start (Local Development)

### 1 — Clone the repo
```bash
git clone https://github.com/ChandanaB-Source/KnightOS.git
cd knightos
```

### 2 — Install dependencies
```bash
npm install
```

### 3 — Set up environment variables

Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

Create `backend/.env`:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your_refresh_secret
JWT_REFRESH_EXPIRES_IN=30d
FRONTEND_URL=http://localhost:5173
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 4 — Run the app
```bash
npm run dev
```

Frontend → http://localhost:5173  
Backend → http://localhost:5000

---

## 🚀 Deployment

### Backend — Railway
- Connect GitHub repo
- Set Root Directory: `backend`
- Set Builder: `Dockerfile`
- Add all environment variables

### Frontend — Vercel
- Connect GitHub repo
- Set Root Directory: `frontend`
- Set Framework: `Vite`
- Add environment variables:
  - `VITE_API_URL`
  - `VITE_SOCKET_URL`
  - `VITE_GOOGLE_CLIENT_ID`

---

## 👤 Test Accounts

| Username | Email | Password |
|---|---|---|
| virat | virat@example.com | Chess1234 |
| chandu | chandu@example.com | Chess1234 |
| sunny | sunny@gmail.com | Chess1234 |

> 20 seeded leaderboard players available. Run `node seed.js` inside `backend/` to seed them.

---

## 📁 Key Files

| File | Purpose |
|---|---|
| `backend/src/services/socket.ts` | All Socket.io event handlers |
| `backend/src/controllers/gameController.ts` | ELO calculation, game finalization |
| `frontend/src/store/gameStore.ts` | Chess game state management |
| `frontend/src/store/authStore.ts` | Auth state + Google OAuth |
| `frontend/src/pages/GamePage.tsx` | Main game UI with board |
| `frontend/src/components/Avatar.tsx` | Reusable avatar component |

---

## 🔐 Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a project → **APIs & Services** → **Credentials**
3. Create OAuth 2.0 Client (Web application)
4. Add Authorized JavaScript origins:
   - `http://localhost:5173`
   - `https://your-frontend-domain.vercel.app`
5. Add to `.env` files

---

## 📄 License

MIT © 2026 ChandanaB-Source

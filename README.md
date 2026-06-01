<div align="center">

  <h1>🎵 Mehfil</h1>
  <p><strong>A modern, full-stack music streaming platform for listeners and artists — built with a focus on minimalism, aesthetic UI, and seamless audio playback.</strong></p>

  [![React](https://img.shields.io/badge/React-19-61DAFB.svg?style=flat&logo=react)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-5-646CFF.svg?style=flat&logo=vite)](https://vitejs.dev/)
  [![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC.svg?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
  [![Node.js](https://img.shields.io/badge/Node.js-Express-339933.svg?style=flat&logo=node.js)](https://nodejs.org/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248.svg?style=flat&logo=mongodb)](https://www.mongodb.com/)
  [![Cloudinary](https://img.shields.io/badge/Cloudinary-Media_Storage-3448C5.svg?style=flat&logo=cloudinary)](https://cloudinary.com/)

  <br/>

  🌐 **Live Demo:** [your-live-url-here]

  <br/>

  <!-- Add your banner/hero screenshot here -->
  <!-- ![Mehfil Banner](./screenshots/banner.png) -->

</div>

---

## ✨ Overview

**Mehfil** is an end-to-end music streaming application supporting two distinct user roles — **Listeners** and **Artists**. Artists can upload and manage their music catalog, while listeners can discover tracks, build playlists, like songs, and follow their favorite artists — all within a seamless, single-page experience.

Built on the MERN stack with React 19 and Vite on the frontend, it combines a persistent global audio player, robust JWT-based authentication, and Cloudinary-powered media storage into a cohesive, production-grade platform.

---

## 🖼️ Screenshots

| Home | Search |
|------|--------|
| <img width="1365" height="640" alt="home page" src="https://github.com/user-attachments/assets/851329a3-4b22-46e3-869e-8197fbd418d8" /> | <img width="1341" height="639" alt="search page" src="https://github.com/user-attachments/assets/8a5299c6-f659-427b-a8f1-af77f02811a3" /> |

| Artist Profile | Playlist |
|----------------|----------|
| <img width="1350" height="635" alt="artist page" src="https://github.com/user-attachments/assets/ab8ac787-fe81-4763-a038-4131118c2a13" /> | <img width="1353" height="635" alt="playlist page" src="https://github.com/user-attachments/assets/86b1e075-fa3e-4132-b8e5-12ed06ffdf5c" /> |
---

## 🚀 Key Features

### 👤 Authentication & Roles
- Secure **JWT-based auth** stored in HTTP-only cookies
- Password hashing via `bcryptjs`
- Two distinct roles: **Listener** and **Artist**

### 🎤 Artist Features
- Upload music tracks with album art (audio + thumbnail via **Cloudinary**)
- Manage personal music catalog
- Public artist profile page visible to all users

### 🎧 Listener Features
- **Global persistent audio player** — music continues playing while navigating
- **Like / Unlike songs** and access them in a dedicated Liked Songs page
- **Create and manage playlists** — add/remove songs freely
- **Follow / Unfollow artists** and track them from your profile

### 🔍 Discovery
- **Search page** to find tracks and artists
- Browse artist catalogs via dedicated Artist pages

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 + Vite | UI framework & build tool |
| Tailwind CSS | Styling |
| Framer Motion | Animations & transitions |
| TanStack React Query v5 | Data fetching & caching |
| React Router v7 | Client-side routing |
| Context API | Global state (Auth, Player, Playlist) |
| Axios | HTTP client |
| Lucide React | Icons |
| Sonner | Toast notifications |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express.js 5 | Server & REST API |
| MongoDB + Mongoose v9 | Database & ODM |
| JWT + cookie-parser | Authentication |
| bcryptjs | Password hashing |
| Cloudinary + Multer | Media storage & upload handling |

---

## 📂 Project Structure

```
Mehfil/
├── backend/
│   ├── config/          # Cloudinary & environment configs
│   ├── controllers/     # Route logic (auth, music, playlist, user)
│   ├── db/              # MongoDB connection setup
│   ├── middlewares/     # JWT verification, Multer upload handling
│   ├── models/          # Mongoose schemas (User, Music, Playlist)
│   ├── routes/          # Express route definitions
│   ├── utils/           # Custom ErrorHandler class
│   └── server.js        # Entry point & global error middleware
│
└── frontend/
    ├── public/          # Static assets (logos, icons)
    └── src/
        ├── api/         # Axios interceptors and API endpoints
        ├── components/  # Reusable UI (SongCard, Modals, Sidebar, Player)
        ├── context/     # Auth, Player, and Playlist context providers
        ├── layout/      # App wrapper, Header, Footer
        ├── pages/       # Route components (Home, Search, Profile, Liked, Playlist, Artist)
        └── App.jsx      # React Router configuration
```

---

## 🗄️ Database Models

**User** — Handles both listener and artist roles. Stores social graph (followers/following), liked songs, and uploaded tracks.

**Music** — Core entity with Cloudinary URIs for audio and thumbnail, linked to an artist (User), and an array of users who liked it.

**Playlist** — Belongs to a user (owner), with a name, optional description, and an array of music references.

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- MongoDB URI (local or Atlas)
- Cloudinary account

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/mehfil.git
cd mehfil
```

### 2. Environment Variables

Create a `.env` file in `backend/`:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Create a `.env` file in `frontend/`:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### 3. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 4. Run the Application

```bash
# Backend (in /backend)
npm run dev

# Frontend (in /frontend)
npm run dev
```

App runs at → `http://localhost:5173`

---

## 👤 Author

**Priyanshu Singh Chauhan** — Full Stack Developer

🌐 [www.priyanshusc.tech](https://www.priyanshusc.tech)

---

<div align="center">
  <p>If you found this project interesting, consider giving it a ⭐ on GitHub!</p>
</div>

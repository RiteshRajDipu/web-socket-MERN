# MERN WebSocket App with Offline Detection (No Socket.io)

This project demonstrates a real-time MERN (MongoDB, Express, React, Node.js) application using **native WebSockets** (no Socket.io), built with modern best practices including offline detection, service worker support, and reconnection handling.

## 🔧 Tech Stack

- **Frontend**: React (with Vite), Service Workers
- **Backend**: Node.js, Express, ws (WebSocket server)
- **Database**: MongoDB (optional, not required for basic functionality)

---

## 🌟 Features

- ✅ Native WebSocket server with heartbeat mechanism
- ✅ Offline detection using `navigator.onLine`
- ✅ Service Worker for offline support (shows status even after refresh)
- ✅ Shows `"Failed to connect to the server"` if:
  - Internet is disconnected and page is refreshed
  - Backend server is down
- ✅ Automatic reconnection when the user comes back online
- ✅ Status banner shows `"Connected"`, `"Offline"`, `"Retrying..."` states

---

## 🚀 Getting Started

### 🖥️ Clone the repository

```bash
git clone https://github.com/RiteshRajDipu/web-socket-MERN.git
cd mern-websocket-app

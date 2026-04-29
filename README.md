# SkillSwap Connect — MERN Stack Capstone Project

SkillSwap Connect is a peer learning and skill exchange platform where students can teach skills they know, find people who can teach skills they want to learn, send connection requests, chat in real time, book learning sessions, and give ratings/reviews.

## Tech Stack

- Frontend: React.js + Tailwind CSS
- Backend: Node.js + Express.js
- Database: MongoDB + Mongoose
- Authentication: JWT + bcrypt
- Real-time chat: Socket.io
- Charts: Recharts
- File Upload: Multer-ready backend structure
- Deployment: Vercel frontend + Render backend ready

## Main Features

- Register/Login
- JWT protected routes
- Role-based access: user/admin
- User profile with skills to teach/learn
- Skill search and filters
- Connection request system
- Real-time one-to-one chat using Socket.io
- Session booking
- Reviews and ratings
- User dashboard
- Admin dashboard

## How to Run

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## Default API URL

Frontend expects backend at:

```bash
http://localhost:5000
```

## Seed Data

After setting your MongoDB URL:

```bash
cd backend
npm run seed
```

## API Modules

- `/api/auth`
- `/api/users`
- `/api/skills`
- `/api/requests`
- `/api/chats`
- `/api/sessions`
- `/api/reviews`
- `/api/admin`
- `/api/reports`

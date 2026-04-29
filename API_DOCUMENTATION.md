# SkillSwap Connect API Documentation

Base URL:

```text
http://localhost:5000
```

## Auth

### Register
`POST /api/auth/register`

Body:
```json
{
  "name": "Vedant Deshmukh",
  "email": "vedant@example.com",
  "password": "123456"
}
```

### Login
`POST /api/auth/login`

Body:
```json
{
  "email": "vedant@example.com",
  "password": "123456"
}
```

### Current User
`GET /api/auth/me`

Header:
```text
Authorization: Bearer TOKEN
```

## Users

### Explore Users
`GET /api/users/explore?skill=React&level=Intermediate&mode=Online`

### Update Profile
`PUT /api/users/profile/update`

## Requests

### Send Request
`POST /api/requests`

Body:
```json
{
  "receiver": "USER_ID",
  "message": "I want to learn React from you. In return, I can help you with Python.",
  "offeredSkill": "Python",
  "requestedSkill": "React"
}
```

### My Requests
`GET /api/requests/mine`

### Update Request Status
`PUT /api/requests/:id/status`

Body:
```json
{
  "status": "Accepted"
}
```

## Chats

### My Chats
`GET /api/chats`

### Get Messages
`GET /api/chats/:chatId/messages`

### Send Message
`POST /api/chats/:chatId/messages`

Body:
```json
{
  "text": "Hello, when can we start React?"
}
```

## Sessions

### Create Session
`POST /api/sessions`

Body:
```json
{
  "teacher": "USER_ID",
  "skill": "React",
  "date": "2026-05-10",
  "time": "18:00",
  "mode": "Online",
  "meetingLink": "https://meet.google.com/example"
}
```

### My Sessions
`GET /api/sessions/mine`

## Reviews

### Create Review
`POST /api/reviews`

Body:
```json
{
  "session": "SESSION_ID",
  "reviewee": "USER_ID",
  "rating": 5,
  "comment": "Explained React basics clearly."
}
```

## Admin

### Admin Stats
`GET /api/admin/stats`

### Manage Users
`GET /api/admin/users`

### Block/Unblock User
`PUT /api/admin/users/:id/block`

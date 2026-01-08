# URL Shortener Service

This repository contains a **URL Shortener Service** built as part of the **Full-Stack Developer Assignment**.  
The application allows authenticated users to create short URLs, track total visits, and manage their links via a dashboard.

> Note: This repository currently includes the **backend** implementation. The frontend can be connected following the API documentation below.

---

## 1. Setup Instructions

### Prerequisites

- Node.js (v18+ recommended)
- npm
- MongoDB (local or cloud)

---

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file based on `.env.example`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
BASE_URL=http://localhost:5000
```

Run the server:

```bash
npm run dev
```

The backend will start on:

```
http://localhost:5000
```

---

## 2. Project Structure

```
backend/
├── src/
│   ├── app.js                # Express app configuration
│   ├── server.js             # Server entry point
│   ├── config/
│   │   └── db.js             # Database connection
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   └── error.middleware.js
│   ├── models/
│   │   ├── User.js           # User schema
│   │   └── Url.js            # URL schema
│   ├── modules/
│   │   ├── auth/
│   │   │   └── auth.routes.js
│   │   └── url/
│   │       └── url.routes.js
│   └── utils/
│       └── generateCode.js   # Short code generator
│
├── package.json
├── .env.example
└── README.md
```

---

## 3. API Documentation

### Authentication

#### Register User

```
POST /api/auth/register
```

Request Body:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

---

#### Login User

```
POST /api/auth/login
```

Response:

```json
{
  "token": "jwt_token_here"
}
```

---

### URL Shortener

#### Create Short URL

```
POST /api/urls
Authorization: Bearer <token>
```

Request Body:

```json
{
  "originalUrl": "https://example.com/very/long/url"
}
```

Response:

```json
{
  "shortCode": "aB3x9P",
  "shortUrl": "http://localhost:5000/aB3x9P"
}
```

---

#### Get User URLs

```
GET /api/urls
Authorization: Bearer <token>
```

---

#### Delete URL

```
DELETE /api/urls/:id
Authorization: Bearer <token>
```

---

### URL Redirection

```
GET /:shortCode
```

- Redirects to the original URL
- Increments visit count

---

## 4. Design Decisions

- **JWT Authentication** for secure, stateless authentication
- **MongoDB + Mongoose** for flexible schema design
- **Short code length (6–8 characters)** to balance uniqueness and usability
- **Modular route structure** for scalability and maintainability
- **Middleware-based auth & error handling** for clean separation of concerns

---

## 5. Known Limitations

- No pagination for URL list
- No advanced analytics (charts/graphs)
- No paid upgrade system (limit alert only)
- No frontend included in this repository

---

## 6. Notes

- Codebase follows a clean and organized structure
- Meaningful variable and function names are used
- No sensitive credentials are committed
- Application runs correctly on a fresh clone using the steps above

---

**Developer:** Reazul Islam Reaz  
**Email:** reazulislam1487@gmail.com

# URL Shortener Service

A backend-powered URL Shortener Service built as part of the **Full-Stack Developer Assignment**.  
The application allows authenticated users to generate short URLs, track visit counts, and manage their links securely.

---

## 1️⃣ Setup Instructions

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
JWT_SECRET=super_secret_jwt_key_here
JWT_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=10
BASE_URL=http://localhost:5000
```

Run the backend server:

```bash
npm run dev
```

Server will start at:

```
http://localhost:5000
```

---

## 2️⃣ Project Structure

```
backend/
├── src/
│   ├── app.js                 # Express app configuration
│   ├── server.js              # Server entry point
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── middlewares/
│   │   ├── auth.middleware.js # JWT authentication
│   │   └── error.middleware.js
│   ├── models/
│   │   ├── User.js            # User model
│   │   └── Url.js             # URL model
│   ├── modules/
│   │   ├── auth/
│   │   │   └── auth.routes.js
│   │   └── url/
│   │       └── url.routes.js
│   └── utils/
│       └── generateCode.js    # Short code generator
│
├── package.json
├── .env.example
└── README.md
```

---

## 3️⃣ API Documentation

### 🔐 Authentication

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

Success Response:

```json
{
  "success": true,
  "message": "User registered successfully"
}
```

---

#### Login User

```
POST /api/auth/login
```

Request Body:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Success Response:

```json
{
  "success": true,
  "token": "jwt_token_here"
}
```

---

### 🔗 URL Management

**All endpoints below require authentication**

Header:

```
Authorization: Bearer <JWT_TOKEN>
```

---

#### Create Short URL

```
POST /api/urls
```

Request Body:

```json
{
  "originalUrl": "https://example.com/very/long/url"
}
```

Success Response:

```json
{
  "success": true,
  "data": {
    "_id": "65a1b2c3d4e5",
    "originalUrl": "https://example.com/very/long/url",
    "shortCode": "x7K9mP",
    "shortUrl": "http://localhost:5000/x7K9mP",
    "clicks": 0,
    "createdAt": "2026-01-08T10:30:00.000Z"
  }
}
```

Limit Reached Response:

```json
{
  "success": false,
  "message": "Free tier limit reached (100 URLs)"
}
```

---

#### Get All User URLs

```
GET /api/urls
```

Request Body:

```
No request body
```

Success Response:

```json
{
  "success": true,
  "data": [
    {
      "_id": "65a1b2c3d4e5",
      "originalUrl": "https://example.com/page-one",
      "shortCode": "aB3x9P",
      "shortUrl": "http://localhost:5000/aB3x9P",
      "clicks": 12,
      "createdAt": "2026-01-07T09:15:00.000Z"
    }
  ]
}
```

---

#### Delete URL

```
DELETE /api/urls/:id
```

Success Response:

```json
{
  "success": true,
  "message": "URL deleted successfully"
}
```

---

### 🔁 URL Redirection (Public)

```
GET /:shortCode
```

- Redirects to the original URL
- Increments click count automatically

---

## 4️⃣ Design Decisions

- JWT-based authentication for secure, stateless sessions
- MongoDB with Mongoose for flexible schema management
- Short codes of 6–8 characters for balance between uniqueness and readability
- Modular architecture for scalability
- Middleware-based error and auth handling

---

## 5️⃣ Known Limitations

- No pagination in URL listing
- No analytics graphs
- No paid upgrade system (alert only)
- Frontend not included in this repository

---

## 6️⃣ Notes

- Clean and readable codebase
- Meaningful variable and function names
- No sensitive credentials committed
- Application runs correctly on a fresh clone

---

**Developer:** Reazul Islam Reaz  
**Email:** reazulislam1487@gmail.com

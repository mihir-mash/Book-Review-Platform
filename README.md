# 7Webs Book Club Platform

A web app for discovering books and sharing reviews.

---

## Setup Instructions

### Backend

1. Go to the `backend` folder:
   ```
   cd backend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with your MongoDB URI and JWT secret:
   ```
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```
4. Start the backend server:
   ```
   npm run dev
   ```

### Frontend

1. Go to the `frontend` folder:
   ```
   cd frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the frontend:
   ```
   npm run dev
   ```

---

## Architecture Decisions

- **Frontend:** React + Vite, Axios for API calls, React Router for navigation.
- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT for authentication.
- **API:** RESTful endpoints for books, reviews, and authentication.
- **Authentication:** JWT tokens stored in localStorage.

---

## Known Limitations

- No image upload for books or users.
- No password reset or email verification.
- No admin panel or moderation.
- Basic error handling only.
- No automated tests yet.

---

## Contributing

Pull requests and issues are welcome!

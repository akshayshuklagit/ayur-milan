# AyurMilan 2026 Summit API Backend

A production-ready Node.js, Express, and Prisma ORM backend server to manage registrations, UTR verification, discount coupon codes, and admin analytics dashboards.

---

## 🛠️ Tech Stack & Packages
- **Runtime**: Node.js (>= 18.0.0)
- **Framework**: Express.js
- **ORM**: Prisma ORM
- **Database**: SQLite (default for development; instantly upgradable to PostgreSQL/MySQL)
- **Security**:
  - `helmet`: Enhances HTTP security headers.
  - `cors`: Handles cross-origin requests.
  - `express-rate-limit`: Prevents brute-force on public routes.
  - `bcryptjs`: Secure admin password hashing.
  - `jsonwebtoken` (JWT): Admin session authentication.

---

## 📂 Folder Structure
```
backend/
├── prisma/
│   ├── schema.prisma   # Database schema definitions
│   └── seed.js         # Initial seeder (Admin + sample coupons)
├── src/
│   ├── config/
│   │   └── db.js       # Instantiates Prisma Client
│   ├── controllers/
│   │   ├── adminController.js         # Admin CRUD operations & dashboard analytics
│   │   └── registrationController.js  # Calculator & registrations logic
│   ├── middlewares/
│   │   ├── authMiddleware.js   # JWT Auth validator
│   │   ├── errorMiddleware.js  # Global error & 404 handlers
│   │   └── rateLimiter.js      # Public routes protectors
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   └── registrationRoutes.js
│   ├── app.js          # Express app configurations
│   └── server.js       # Main server entrypoint
├── .env                # Port, Database connection & Secret variables
├── package.json
└── README.md
```

---

## 🚀 Setup & Local Execution

### 1. Install Dependencies
Run the following command inside the `backend` directory to install dependencies:
```bash
npm install
```

### 2. Generate Database & Client
Synchronize your Prisma schema with the database client (this will automatically generate the SQLite `dev.db` file):
```bash
npx prisma db push
```

### 3. Seed Default Data
Seed the database with default admin credentials (`admin` / `ayurmilan2026`) and starting coupons (`WELCOME100` and `AYUR10`):
```bash
npm run seed
```

### 4. Start Server
To start the server in development mode (with auto-reload):
```bash
npm run dev
```
To run the server in standard production mode:
```bash
npm run start
```
The server will bind to `http://localhost:5000`.

---

## 📋 API Endpoints

### 🎫 Public Participant Endpoints (`/api/registrations`)
- **`POST /verify-coupon`**: Validates whether a coupon code is active and gets its details.
  - **Body**: `{ "code": "AYUR10" }`
- **`POST /register`**: Registers a user, validates pricing, applies discount, and returns registration ID.
  - **Body**:
    ```json
    {
      "participantType": "UG Scholars & Interns",
      "name": "Arjun Sharma",
      "email": "arjun@example.com",
      "phone": "+919876543210",
      "gender": "Male",
      "university": "BHU Ayurvedic College",
      "city": "Varanasi",
      "couponCode": "AYUR10",
      "coordinatorName": "Rahul Singh",
      "accommodationType": "Double Sharing"
    }
    ```
- **`POST /submit-utr`**: Submits UTR/Transaction Code to link proof of payment to the registration.
  - **Body**: `{ "registrationId": "<REGISTRATION_UUID>", "paymentReference": "UTR12345678" }`

### 🔑 Protected Admin Endpoints (`/api/admin`)
*(Require header `Authorization: Bearer <JWT_TOKEN>` except for login)*

- **`POST /auth/login`**: Authenticates admin credentials and returns JWT token.
  - **Body**: `{ "username": "admin", "password": "ayurmilan2026" }`
- **`GET /registrations`**: Lists all registrations. Supported filters in query string: `paymentStatus` (PENDING/PAID/FAILED), `verified` (true/false), `search` (text search on name, email, UTR, etc.).
- **`GET /stats`**: Returns dashboard metrics (total registrations, revenue sums, pending counts, ticket category breakdowns).
- **`POST /registrations/:id/verify`**: Verifies payment for registration ID, marks status as PAID.
- **`POST /registrations/:id/reject`**: Rejects payment for registration ID, marks status as FAILED.
- **`GET /coupons`**: Lists all discount coupons.
- **`POST /coupons`**: Creates a new coupon.
  - **Body**: `{ "code": "OFF200", "discountType": "FIXED", "value": 200 }`
- **`POST /coupons/:id/toggle`**: Toggles status (Active/Inactive) for coupon ID.

---

## 💾 Switching Database to PostgreSQL or MySQL
To switch from local SQLite to PostgreSQL/MySQL:
1. Open `prisma/schema.prisma` and change:
   ```prisma
   datasource db {
     provider = "postgresql" // or "mysql"
     url      = env("DATABASE_URL")
   }
   ```
2. Open `.env` and set the `DATABASE_URL` to match your connection string:
   - **Postgres**: `DATABASE_URL="postgresql://username:password@localhost:5432/ayurmilan?schema=public"`
   - **MySQL**: `DATABASE_URL="mysql://username:password@localhost:3306/ayurmilan"`
3. Regenerate and synchronize client:
   ```bash
   npx prisma db push
   ```

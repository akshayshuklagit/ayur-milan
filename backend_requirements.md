# AyurMilan 2026 Summit: Backend & Production Deployment Specification

This document details the backend requirements, API routes, database schema, and production setup instructions for the AyurMilan Summit registration system, which now processes payments exclusively through direct UPI transfers (via QR codes or deep-linked mobile apps) with manual admin verification of 12-digit transaction UTR codes.

---

## 1. Technical Stack & Requirements

- **Runtime Environment:** Node.js `>= 18.0.0`
- **Application Framework:** Express.js `^4.18.3`
- **Database ORM:** Prisma ORM `^5.10.2`
- **Database Engine:** MySQL or PostgreSQL (recommended for production)
- **SMTP Server:** SMTP server credentials (e.g. Hostinger, Gmail SMTP, Resend, or SendGrid) for transactional registration emails.
- **Process Manager:** PM2 (for keeping the Node.js process alive in production)
- **Web Server:** Nginx (acting as a reverse proxy and handling SSL/TLS termination)
- **SSL Certificates:** Let's Encrypt / Certbot (for free HTTPS certificates)

---

## 2. Environment Variables (`.env`)

Create a `.env` file in the root of the `backend` folder with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=production

# Database URL (Example for PostgreSQL. If using MySQL, swap out the protocol)
DATABASE_URL="postgresql://db_user:db_password@localhost:5432/ayurmilan?schema=public"

# Session Secret (For AdminJS session management)
SESSION_SECRET="your-super-secure-random-session-secret"

# Transactional Email SMTP Configuration
SMTP_HOST="smtp.yourprovider.com"
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER="registrations@ayurmilan.in"
SMTP_PASS="your-smtp-password"
SMTP_FROM_EMAIL="AyurMilan registrations@ayurmilan.in"

# Admin Portal Credentials
ADMIN_EMAIL="admin@ayurmilan.in"
ADMIN_PASSWORD="ChooseAStrongPassword123!"
```

---

## 3. Database Schema (Prisma)

The application uses Prisma to manage database tables. Below is the production database schema (`prisma/schema.prisma`):

```prisma
datasource db {
  provider = "postgresql" // Or "mysql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// 1. Participant Registrations Table
model Registration {
  id                String        @id @default(uuid())
  name              String
  email             String
  phone             String
  whatsapp          String
  gender            String
  university        String
  city              String
  state             String
  designation       String
  participantType   String        // e.g. "UG Scholars & Interns", "PG Scholars / Ph.D / Practitioner", "Other Indian Delegates"
  accommodationType String        @default("None") // "Triple Sharing", "Double Sharing", "Single Room", "None"
  registrationFee   Float
  accommodationFee  Float
  discount          Float         @default(0)
  payableAmount     Float
  couponCode        String?
  coordinatorName   String?
  paymentReference  String?       // Stores the 12-digit UPI UTR Code
  paymentStatus     PaymentStatus @default(PENDING) // PENDING, PAID, FAILED
  verified          Boolean       @default(false)
  createdAt         DateTime      @default(now())
  updatedAt         DateTime      @updatedAt

  @@index([email])
  @@index([paymentReference])
}

enum PaymentStatus {
  PENDING
  PAID
  FAILED
}

// 2. Coupon Discount Codes Table
model Coupon {
  id           String       @id @default(uuid())
  code         String       @unique // e.g. "AYUR10", "WELCOME100"
  discountType DiscountType @default(FIXED) // PERCENT or FIXED
  value        Float        // Percentage value or Flat amount
  isActive     Boolean      @default(true)
  createdAt    DateTime     @default(now())
}

enum DiscountType {
  PERCENT
  FIXED
}

// 3. Payment Configurations (Admin-updatable QR / UPI ID)
model PaymentConfig {
  id             String  @id @default("default")
  upiId          String  @default("agniveshevents@upi")
  qrCodeUrl      String? @default("/assets/img/qr-code.png") // Fallback image path
  qrCodeBase64   String? // Store updated QR code as a base64 string directly
}

// 4. Contact Enquiry Form Submissions
model ContactSubmission {
  id        String   @id @default(uuid())
  name      String
  email     String
  phone     String
  message   String
  createdAt DateTime @default(now())
}

// 5. Abstract Presentation Submissions
model AbstractSubmission {
  id               String   @id @default(uuid())
  name             String
  email            String
  phone            String
  designation      String
  institution      String
  presentationType String   // Oral or Poster
  category         String   // Subject Area
  title            String
  abstractText     String   // Capped at 250 words
  createdAt        DateTime @default(now())
}

// 6. Exhibitor Stall Enquiry Submissions
model ExhibitorSubmission {
  id                String   @id @default(uuid())
  companyName       String
  contactName       String
  email             String
  phone             String
  category          String
  country           String
  state             String
  city              String
  street            String
  zip               String
  productCategories String?
  createdAt         DateTime @default(now())
}

// 7. Exhibitor Stalls Moving Logos list
model ExhibitorLogo {
  id        String   @id @default(uuid())
  imageUrl  String
  name      String
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
}
```

---

## 4. API Endpoints Specification

All public endpoints are rate-limited via `express-rate-limit` to prevent spamming. The base path is `/api`.

### 4.1 Payment Config
- **Route:** `GET /payment-config`
- **Description:** Returns the active UPI payment ID and QR code URL or base64 data to render dynamically on the checkout screen.
- **Response:**
  ```json
  {
    "status": 200,
    "data": {
      "id": "default",
      "upiId": "agniveshevents@upi",
      "qrCodeUrl": "/assets/img/qr-code.png",
      "qrCodeBase64": null
    }
  }
  ```

### 4.2 Validate Coupon Code
- **Route:** `POST /verify-coupon`
- **Request Body:**
  ```json
  { "code": "AYUR10" }
  ```
- **Response (200 - Valid):**
  ```json
  {
    "status": 200,
    "message": "Coupon validated successfully",
    "data": {
      "code": "AYUR10",
      "discountType": "PERCENT",
      "value": 10
    }
  }
  ```

### 4.3 Create Registration Ticket
- **Route:** `POST /register`
- **Description:** Validates client fields, checks active pricing rates, applies optional discount coupons, records registration in `PENDING` state, triggers a "Pending Registration" email, and returns calculated pricing and a unique registration ID.
- **Request Body:**
  ```json
  {
    "participantType": "UG Scholars & Interns",
    "name": "Dr. Aarav Sharma",
    "email": "aarav.sharma@bams.edu",
    "phone": "9876543210",
    "gender": "Male",
    "university": "State Ayurvedic College",
    "city": "Lucknow",
    "whatsapp": "9876543210",
    "state": "Uttar Pradesh",
    "designation": "BAMS 4th Professional",
    "couponCode": "AYUR10",
    "coordinatorName": "Dr. Mishra",
    "accommodationType": "Triple Sharing"
  }
  ```
- **Response (210 - Success):**
  ```json
  {
    "status": 201,
    "message": "Registration created successfully. Please submit payment UTR to confirm.",
    "data": {
      "id": "8c41d102-125c-42cb-b1b7-a3f2d26d8339",
      "payableAmount": 2879,
      "paymentStatus": "PENDING"
    }
  }
  ```

### 4.4 Submit UTR Code
- **Route:** `POST /submit-utr`
- **Description:** Attaches the 12-digit transaction UTR reference code entered by the user to their registration ID.
- **Request Body:**
  ```json
  {
    "registrationId": "8c41d102-125c-42cb-b1b7-a3f2d26d8339",
    "paymentReference": "317589620456"
  }
  ```
- **Response (200 - Success):**
  ```json
  {
    "status": 200,
    "message": "UTR payment reference code submitted successfully. Admin will verify it soon.",
    "data": {
      "id": "8c41d102-125c-42cb-b1b7-a3f2d26d8339",
      "paymentReference": "317589620456",
      "paymentStatus": "PENDING"
    }
  }
  ```

---

## 5. Admin Panel (AdminJS Integration)

The backend features a secure administration panel built with AdminJS located at `/admin`.

### 5.1 Admin Authentication
Access is guarded by standard cookie-sessions. Credentials are configured via `ADMIN_EMAIL` and `ADMIN_PASSWORD` in the environment configuration.

### 5.2 UTR Verification Flow
1. The Admin opens the **Registrations** resource tab.
2. Filter entries by `paymentStatus: PENDING` and check `paymentReference` (UTR).
3. The Admin cross-verifies the UTR and amount on their bank's UPI merchant portal.
4. Once confirmed, the Admin edits the registration in the panel:
   - Changes `paymentStatus` to `PAID`
   - Sets `verified` to `true`
5. The Prisma database trigger triggers `emailService.sendRegistrationConfirmedEmail(updated)` which sends the confirmation ticket and QR gate pass to the attendee's email automatically.

---

## 6. Production Setup & Deployment Guide

Follow these steps to deploy the backend to a production server (Ubuntu 20.04/22.04 LTS recommended):

### Step 1: Install Dependencies
SSH into your server and run:
```bash
# Update Packages
sudo apt update && sudo apt upgrade -y

# Install Node.js (Version 20)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node -v
npm -v

# Install Git & Process Manager (PM2)
sudo npm install -g pm2
```

### Step 2: Clone & Configure Backend
1. Clone your project code onto the server directory (e.g. `/var/www/ayurmilan`).
2. Move into the `backend` folder:
   ```bash
   cd /var/www/ayurmilan/backend
   npm install --omit=dev
   ```
3. Configure the `.env` file as described in Section 2.

### Step 3: Run Database Migrations
1. Run Prisma database migrations to create the required tables:
   ```bash
   npx prisma migrate deploy
   ```
2. (Optional) Run the database seed script to populate initial configurations, sample coupons, and defaults:
   ```bash
   npm run seed
   ```

### Step 4: Run Application with PM2
Launch your application in the background and configure PM2 to restart it automatically on server reboots:
```bash
# Start backend server
pm2 start src/server.js --name "ayurmilan-backend"

# Setup PM2 startup scripts
pm2 startup
# (Run the output command printed by PM2 on screen to configure systemd)

# Save process list
pm2 save
```

### Step 5: Configure Nginx as Reverse Proxy
1. Install Nginx:
   ```bash
   sudo apt install nginx -y
   ```
2. Create a virtual host configuration file:
   ```bash
   sudo nano /etc/nginx/sites-available/ayurmilan
   ```
3. Insert the following block (replace `api.ayurmilan.in` with your domain):
   ```nginx
   server {
       listen 80;
       server_name api.ayurmilan.in;

       # Security Headers
       add_header X-Frame-Options "SAMEORIGIN";
       add_header X-XSS-Protection "1; mode=block";
       add_header X-Content-Type-Options "nosniff";

       # Reverse Proxy for Express Backend
       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```
4. Enable the site and restart Nginx:
   ```bash
   sudo ln -s /etc/nginx/sites-available/ayurmilan /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

### Step 6: Secure Nginx with SSL (Let's Encrypt HTTPS)
Use Certbot to generate and install SSL certificates automatically:
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d api.ayurmilan.in
# Follow prompt choices to redirect HTTP traffic to secure HTTPS.
```

---

## 7. Security Best Practices Installed

1. **API Rate Limiting:** Prevent DDoS attacks on submission forms and endpoints using `express-rate-limit`.
2. **Helmet:** Configured Express headers to prevent common vulnerabilities (clickjacking, XSS, sniffing).
3. **CORS:** Configured to restrict requests solely to approved domain URLs.
4. **Data Sanitization:** Prisma automatically sanitizes inputs to prevent SQL Injection out of the box.

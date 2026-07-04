# AyurMilan 2026 Summit: End-to-End Registration & Email Notification Workflow

This document explains how the registration, direct UPI payment, admin review, and automated email confirmation systems function and interact on the backend.

```mermaid
sequenceDiagram
    autonumber
    actor Participant as Delegate (Attendee)
    actor Admin as Admin (Dashboard)
    participant API as Express API Server
    participant DB as Prisma Database
    participant Email as Nodemailer SMTP

    Participant->>API: 1. Submits Registration Form (Step 1)
    API->>DB: Saves Registration (Status: PENDING, Verified: false)
    API-->>Email: Triggers Async Pending Registration Email
    Email-->>Participant: Sends "Pending Payment" Email with ticket details
    API-->>Participant: Returns Registration ID & transitions to Step 2 (Checkout)
    
    Participant->>API: 2. Submits 12-digit UPI UTR Code (Step 2)
    API->>DB: Updates Registration with UTR code (Status: PENDING)
    API-->>Participant: Transitions to Step 3 (Success Screen)
    
    Admin->>API: 3. Reviews UTR on Admin Panel & clicks "Confirm & Approve"
    API->>DB: Updates Registration (Status: PAID, Verified: true)
    API-->>Email: AdminJS Hook triggers Confirmation Email
    Email-->>Participant: Sends Official confirmed E-Ticket with details
```

---

## 1. Step-by-Step Backend Execution Flow

### Step 1: User Submits Registration Form
1. The delegate fills out their personal details, category, accommodation choice, and applies any discount coupons in the React frontend.
2. The form is sent via `POST /api/registrations/register`.
3. The backend:
   - Validates the fields.
   - Calculates the pricing based on participant category and accommodation.
   - Validates and applies coupon discounts.
   - Creates a database record in the `Registration` table with `paymentStatus = "PENDING"` and `verified = false`.
   - Calls `emailService.sendRegistrationPendingEmail(registration)` asynchronously in the background so the HTTP request remains fast.
4. The client receives a successful response containing the unique `registrationId` and the exact calculated `payableAmount`, transitioning the user to **Step 2 (Pay & Verify)**.

---

### Step 2: User Pays via UPI & Submits UTR
1. On the checkout screen, the user scans the generated UPI QR Code or taps **"Pay via UPI App"** (on mobile).
2. The user pays the exact amount. The UPI transaction generates a unique **12-digit UPI Transaction Reference Number (UTR)**.
3. The user enters this UTR number in the form and clicks submit.
4. The frontend sends a `POST /api/registrations/submit-utr` request containing the `registrationId` and the UTR `paymentReference`.
5. The backend:
   - Locates the registration record.
   - Links the UTR `paymentReference` to the record in the database.
   - Keeps the status as `PENDING` awaiting admin verification.
6. The client is transitioned to **Step 3 (Success Screen)**, showing that their booking reference is logged and pending review.

---

### Step 3: Admin Review & Ticket Confirmation
1. The administrator logs in to the AdminJS portal at `/admin` and checks the **Registrations** tab.
2. The admin filters by `Payment Status = Pending Verification` and matches the submitted UTR reference code with their banking portal/UPI merchant app collections.
3. Once the payment is verified, the admin clicks the custom **Approve** button on the record.
4. The backend:
   - Receives the request in the custom AdminJS record action handler (`approve`).
   - Checks that the request method is `POST` (ensuring that just visiting the page doesn't trigger approval).
   - Updates the registration in the database setting `paymentStatus = "PAID"` and `verified = true`.
   - AdminJS triggers a `triggerEmailIfPaid` lifecycle hook. This hook detects the status change and triggers `emailService.sendRegistrationConfirmedEmail(registration)` immediately.
5. The participant receives their official confirmed **E-Ticket** in their email.

---

## 2. Transactional Email System (Nodemailer)

The email service in `backend/src/services/emailService.js` handles SMTP transmission and templates.

### 2.1 SMTP Initializer
Nodemailer creates a mail transporter using configuration variables in your `.env` file:
```javascript
const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
```
- **Live Mode:** If `SMTP_USER` and `SMTP_PASS` are provided, the transporter is initialized.
- **Mock Log Mode:** If credentials are missing, the email service operates in a fallback mode. It logs a text-stripped preview of the outgoing email directly to the server terminal instead of crashing. This is useful for testing locally without configuring mailboxes.

### 2.2 Outgoing Email Templates

#### A. Pending Registration Template
- **Triggered:** Form submission.
- **Subject:** `Registration Received - AyurMilan 2026 Summit (ID: 8c41d102)`
- **Content:**
  - Greets the delegate by name.
  - Warns that status is `Pending Payment Verification`.
  - Details the ticket category, accommodation selected, and amount to pay.
  - Explains how to complete payment and submit the UTR to activate the ticket.

#### B. Confirmed E-Ticket Template
- **Triggered:** Admin clicks "Approve" in the dashboard.
- **Subject:** `Registration Confirmed! 🎉 AyurMilan 2026 Ticket (ID: 8c41d102)`
- **Content:**
  - Displays a graphical **Official Entry Ticket** card.
  - Lists the delegate's confirmed details (Name, Ticket ID, Category, Accommodation, Amount Paid, and the linked UTR code).
  - Displays the verification status as **PAID & VERIFIED**.
  - Includes venue details (`Shri Krishna Janmashtami Ashram, Vrindavan`) and helpline contact numbers.
  - Instructs the delegate to bring a digital or printed copy of this E-ticket to the registration counter at the summit venue to receive their entry badge and kit.

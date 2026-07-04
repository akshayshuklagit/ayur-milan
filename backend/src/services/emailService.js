const nodemailer = require('nodemailer');

const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const smtpFrom = process.env.SMTP_FROM || '"AyurMilan 2026" <no-reply@ayurmilan.org>';

let transporter = null;

if (smtpUser && smtpPass) {
  transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass
    }
  });
  console.log('📬 Email transporter initialized with SMTP credentials.');
} else {
  console.warn('⚠️ SMTP credentials (SMTP_USER/SMTP_PASS) not found in environment variables. Email service is running in LOG/MOCK mode.');
}

/**
 * Send an email with HTML content
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.html - HTML body
 */
async function sendEmail({ to, subject, html }) {
  if (transporter) {
    try {
      const info = await transporter.sendMail({
        from: smtpFrom,
        to,
        subject,
        html
      });
      console.log(`✉️ Email sent successfully to ${to}. Message ID: ${info.messageId}`);
      return info;
    } catch (error) {
      console.error(`💥 Error sending email to ${to}:`, error);
      return { error: error.message };
    }
  } else {
    console.log(`=========================================`);
    console.log(`[MOCK EMAIL LOG]`);
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Body (Preview):`);
    // Output a clean text version of HTML for console logging
    const plainText = html
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    console.log(plainText.substring(0, 400) + '...');
    console.log(`=========================================`);
    return { mock: true, messageId: 'mock-id-' + Math.random().toString(36).substring(2, 9) };
  }
}

/**
 * Send email when registration is first created (pending payment / UTR submission)
 * @param {Object} registration - Registration data from database
 */
async function sendRegistrationPendingEmail(registration) {
  const subject = `Registration Received - AyurMilan 2026 Summit (ID: ${registration.id.substring(0, 8)})`;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>AyurMilan 2026 Registration</title>
      <style>
        body {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          background-color: #f6f5f0;
          color: #2e3532;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }
        .header {
          background-color: #1b4d3e;
          padding: 30px 20px;
          text-align: center;
          color: #ffffff;
        }
        .header h1 {
          margin: 0;
          font-size: 26px;
          letter-spacing: 1px;
          color: #f7e7c4;
        }
        .header p {
          margin: 5px 0 0 0;
          font-size: 14px;
          opacity: 0.9;
        }
        .content {
          padding: 30px 25px;
          line-height: 1.6;
        }
        .welcome-text {
          font-size: 16px;
          margin-bottom: 20px;
        }
        .status-box {
          background-color: #fff9e6;
          border-left: 4px solid #c5a059;
          padding: 15px;
          margin: 20px 0;
          border-radius: 4px;
        }
        .status-box h3 {
          margin: 0 0 5px 0;
          color: #c5a059;
          font-size: 16px;
        }
        .status-box p {
          margin: 0;
          font-size: 14px;
        }
        .details-table {
          width: 100%;
          border-collapse: collapse;
          margin: 25px 0;
        }
        .details-table th, .details-table td {
          padding: 10px 12px;
          text-align: left;
          border-bottom: 1px solid #eeeeee;
          font-size: 14px;
        }
        .details-table th {
          font-weight: bold;
          color: #1b4d3e;
          width: 40%;
        }
        .btn-container {
          text-align: center;
          margin: 30px 0;
        }
        .btn {
          background-color: #1b4d3e;
          color: #ffffff !important;
          padding: 12px 25px;
          text-decoration: none;
          font-weight: bold;
          border-radius: 4px;
          display: inline-block;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .footer {
          background-color: #fcfbf7;
          border-top: 1px solid #eeeeee;
          padding: 20px;
          text-align: center;
          font-size: 12px;
          color: #777777;
        }
      </style>
    </head>
    <body>
      <div class="wrapper" style="padding: 20px 0; background-color: #f6f5f0;">
        <div class="container">
          <div class="header">
            <h1>AyurMilan 2026</h1>
            <p>National Ayurveda Summit | 1 - 2 October | Vrindavan</p>
          </div>
          
          <div class="content">
            <p class="welcome-text">Dear <strong>${registration.name}</strong>,</p>
            <p>Thank you for submitting your registration details for the upcoming AyurMilan 2026 Summit. We are excited to have you join us!</p>
            
            <div class="status-box">
              <h3>Status: Pending Payment Verification</h3>
              <p>Your registration profile has been successfully saved. To secure your ticket and confirmation badge, please verify your payment by uploading your transaction UTR / Reference ID, or proceed with online payment.</p>
            </div>
            
            <h3>Registration Details</h3>
            <table class="details-table">
              <tr>
                <th>Registration ID</th>
                <td><code>${registration.id}</code></td>
              </tr>
              <tr>
                <th>Participant Type</th>
                <td>${registration.participantType}</td>
              </tr>
              <tr>
                <th>Accommodation</th>
                <td>${registration.accommodationType}</td>
              </tr>
              <tr>
                <th>Total Payable Amount</th>
                <td style="font-weight: bold; color: #1b4d3e;">₹${registration.payableAmount}</td>
              </tr>
            </table>

            <p style="font-size: 14px; color: #555555;">
              If you paid via UPI or direct bank transfer, please make sure to submit your UTR/Reference number on the payment page so our administrative team can verify your payment and issue your confirmed entry ticket.
            </p>
            
            <p>For any queries, feel free to contact us at <a href="mailto:ayurmilanofficial@gmail.com">ayurmilanofficial@gmail.com</a> or call us at <strong>+91 6280632669</strong> or <strong>+91 9697970004</strong>.</p>
          </div>
          
          <div class="footer">
            <p>Shri Krishna Janmashtami Ashram, Opp Akshay Patra, Chattikara, Mathura-Vrindavan Marg, Mathura, UP - 281121</p>
            <p>© 2026 AyurMilan Summit. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
  
  return sendEmail({ to: registration.email, subject, html });
}

/**
 * Send email when registration is confirmed (paid/verified)
 * @param {Object} registration - Registration data from database
 */
async function sendRegistrationConfirmedEmail(registration) {
  const subject = `Registration Confirmed! 🎉 AyurMilan 2026 Ticket (ID: ${registration.id.substring(0, 8)})`;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>AyurMilan 2026 E-Ticket</title>
      <style>
        body {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          background-color: #f6f5f0;
          color: #2e3532;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }
        .header {
          background-color: #1b4d3e;
          padding: 30px 20px;
          text-align: center;
          color: #ffffff;
        }
        .header h1 {
          margin: 0;
          font-size: 26px;
          letter-spacing: 1px;
          color: #f7e7c4;
        }
        .header p {
          margin: 5px 0 0 0;
          font-size: 14px;
          opacity: 0.9;
        }
        .content {
          padding: 30px 25px;
          line-height: 1.6;
        }
        .ticket-wrapper {
          margin: 30px 0;
          background-color: #fbfbfa;
          border: 2px dashed #1b4d3e;
          border-radius: 8px;
          overflow: hidden;
        }
        .ticket-header {
          background-color: #1b4d3e;
          color: #ffffff;
          padding: 15px;
          text-align: center;
          font-weight: bold;
          letter-spacing: 2px;
          font-size: 14px;
          color: #f7e7c4;
        }
        .ticket-body {
          padding: 20px;
        }
        .ticket-title {
          font-size: 18px;
          font-weight: bold;
          color: #1b4d3e;
          margin: 0 0 15px 0;
          text-align: center;
          border-bottom: 1px solid #eeeeee;
          padding-bottom: 10px;
        }
        .ticket-info {
          width: 100%;
          border-collapse: collapse;
        }
        .ticket-info td {
          padding: 8px 0;
          font-size: 14px;
          border-bottom: 1px solid #f6f5f0;
        }
        .ticket-info td.label {
          font-weight: bold;
          color: #777777;
          width: 35%;
        }
        .ticket-info td.value {
          color: #2e3532;
        }
        .badge {
          background-color: #e3f7ed;
          color: #1b4d3e;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: bold;
          display: inline-block;
          border: 1px solid #bce4d8;
        }
        .event-info {
          background-color: #fcfbf7;
          border: 1px solid #e9e7df;
          border-radius: 6px;
          padding: 15px;
          margin: 25px 0;
        }
        .event-info h4 {
          margin: 0 0 10px 0;
          color: #1b4d3e;
          font-size: 15px;
        }
        .event-info p {
          margin: 5px 0;
          font-size: 14px;
        }
        .footer {
          background-color: #fcfbf7;
          border-top: 1px solid #eeeeee;
          padding: 20px;
          text-align: center;
          font-size: 12px;
          color: #777777;
        }
      </style>
    </head>
    <body>
      <div class="wrapper" style="padding: 20px 0; background-color: #f6f5f0;">
        <div class="container">
          <div class="header">
            <h1>AyurMilan 2026</h1>
            <p>National Ayurveda Summit | 1 - 2 October | Vrindavan</p>
          </div>
          
          <div class="content">
            <p>Dear <strong>${registration.name}</strong>,</p>
            <p>Great news! Your payment has been verified, and your registration for the <strong>AyurMilan 2026 Summit</strong> is now officially <strong>CONFIRMED</strong>. We have generated your e-ticket below!</p>
            
            <div class="ticket-wrapper">
              <div class="ticket-header">
                OFFICIAL ENTRY TICKET
              </div>
              <div class="ticket-body">
                <div class="ticket-title">AYURMILAN 2026 SUMMIT</div>
                <table class="ticket-info">
                  <tr>
                    <td class="label">Ticket Number</td>
                    <td class="value"><code>${registration.id}</code></td>
                  </tr>
                  <tr>
                    <td class="label">Attendee Name</td>
                    <td class="value" style="font-weight: bold;">${registration.name}</td>
                  </tr>
                  <tr>
                    <td class="label">Participant Type</td>
                    <td class="value">${registration.participantType}</td>
                  </tr>
                  <tr>
                    <td class="label">Accommodation</td>
                    <td class="value">${registration.accommodationType}</td>
                  </tr>
                  <tr>
                    <td class="label">Amount Paid</td>
                    <td class="value" style="font-weight: bold;">₹${registration.payableAmount}</td>
                  </tr>
                  <tr>
                    <td class="label">Transaction Reference</td>
                    <td class="value"><code>${registration.paymentReference || 'N/A'}</code></td>
                  </tr>
                  <tr>
                    <td class="label">Verification Status</td>
                    <td class="value"><span class="badge">PAID & VERIFIED</span></td>
                  </tr>
                </table>
              </div>
            </div>

            <div class="event-info">
              <h4>📍 Summit Details & Venue</h4>
              <p><strong>Dates:</strong> 1 – 2 October 2026</p>
              <p><strong>Venue:</strong> Shri Krishna Janmashtami Ashram, Opp Akshay Patra, Chattikara, Mathura-Vrindavan Marg, Mathura, Uttar Pradesh - 281121</p>
            </div>

            <p style="font-size: 14px; color: #555555;">
              Please carry a digital or printed copy of this email to the registration counter at the venue to receive your attendee badge and summit kit.
            </p>
            
            <p>If you have any questions or require accommodation details, reach out to us at <a href="mailto:ayurmilanofficial@gmail.com">ayurmilanofficial@gmail.com</a> or call <strong>+91 6280632669</strong> / <strong>+91 9697970004</strong>.</p>
            
            <p>See you in Vrindavan!</p>
          </div>
          
          <div class="footer">
            <p>AyurMilan 2026 Organizing Committee</p>
            <p>© 2026 AyurMilan. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
  
  return sendEmail({ to: registration.email, subject, html });
}

module.exports = {
  sendEmail,
  sendRegistrationPendingEmail,
  sendRegistrationConfirmedEmail
};

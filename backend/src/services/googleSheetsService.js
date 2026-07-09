const prisma = require('../config/db');

/**
 * Synchronizes registration data with a Google Sheet via a Web App webhook.
 * @param {Object} registration - The registration record from database.
 */
async function syncRegistration(registration) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn("⚠️ Google Sheets Webhook URL is not set in environment variables. Skipping sync.");
    return;
  }

  try {
    const payload = {
      timestamp: registration.createdAt ? new Date(registration.createdAt).toISOString() : new Date().toISOString(),
      id: registration.id,
      name: registration.name,
      email: registration.email,
      phone: registration.phone,
      whatsapp: registration.whatsapp || "",
      gender: registration.gender || "",
      university: registration.university || "",
      city: registration.city || "",
      state: registration.state || "",
      designation: registration.designation || "",
      participantType: registration.participantType,
      accommodationType: registration.accommodationType,
      couponCode: registration.couponCode || "",
      coordinatorName: registration.coordinatorName || "",
      registrationFee: registration.registrationFee,
      accommodationFee: registration.accommodationFee,
      discount: registration.discount,
      payableAmount: registration.payableAmount,
      paymentStatus: registration.paymentStatus,
      paymentReference: registration.paymentReference || "",
      verified: registration.verified === true || registration.verified === 'true'
    };

    console.log(`📊 Syncing registration ${registration.id} (${registration.name}) to Google Sheets...`);

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const resData = await response.json();
    console.log(`✅ Google Sheet Sync successful:`, resData);
  } catch (error) {
    console.error(`❌ Google Sheet Sync failed for registration ${registration.id}:`, error.message);
  }
}

module.exports = {
  syncRegistration
};

const { Resend } = require('resend');
require('dotenv').config();

const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
  console.warn("⚠️ Warning: Resend API Key is missing in your .env file.");
}

const resend = new Resend(resendApiKey);

module.exports = resend;
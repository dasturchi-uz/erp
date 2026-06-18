import axios from 'axios';

let currentToken = null;
let tokenExpiresAt = null;

const BASE_URL = 'https://notify.eskiz.uz/api';

/**
 * Authenticate with Eskiz API and get token
 */
export async function getEskizToken() {
  // Return cached token if valid (Eskiz tokens usually last 30 days, we'll cache for 29 days)
  if (currentToken && tokenExpiresAt && new Date() < tokenExpiresAt) {
    return currentToken;
  }

  try {
    const formData = new FormData();
    formData.append('email', process.env.ESKIZ_EMAIL);
    formData.append('password', process.env.ESKIZ_PASSWORD);

    const response = await axios.post(`${BASE_URL}/auth/login`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const token = response.data.data.token;
    currentToken = token;
    
    // Set expiration to 29 days
    const expires = new Date();
    expires.setDate(expires.getDate() + 29);
    tokenExpiresAt = expires;

    return token;
  } catch (error) {
    console.error('Eskiz Auth Error:', error?.response?.data || error.message);
    throw new Error('Eskiz API authentication failed');
  }
}

/**
 * Send an SMS message
 * @param {string} phone - Format: 998901234567
 * @param {string} message - Text message
 */
export async function sendSms(phone, message) {
  try {
    const token = await getEskizToken();
    
    // Clean phone number (remove +, spaces, dashes)
    const cleanPhone = phone.replace(/[^0-9]/g, '');

    const formData = new FormData();
    formData.append('mobile_phone', cleanPhone);
    formData.append('message', message);
    formData.append('from', '4546'); // Default alphanumeric string provided by Eskiz

    const response = await axios.post(`${BASE_URL}/message/sms/send`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return { success: true, data: response.data };
  } catch (error) {
    console.error('Eskiz Send SMS Error:', error?.response?.data || error.message);
    return { success: false, error: error?.response?.data || error.message };
  }
}

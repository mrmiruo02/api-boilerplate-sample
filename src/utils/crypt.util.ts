import dotenv from 'dotenv';
import crypto from 'crypto';
import ValidationError from '../errors/ValidationError';

dotenv.config();

/**
 * Encrypting the data (Handles both strings and numbers)
 * @param {string | number | boolean} text
 * @returns {string}
 */
const encrypt = (text?: string | number | boolean): string => {
  if (!process.env.APP_KEY) {
    throw new Error('APP_KEY is not defined');
  }

  const key = crypto.scryptSync(process.env.APP_KEY, 'salt', 32);
  const iv = crypto.randomBytes(12); // 12-byte IV for AES-GCM

  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  // Convert the input to a string before encryption
  const textToEncrypt = String(text);
  const encrypted = Buffer.concat([cipher.update(textToEncrypt, 'utf8'), cipher.final()]);
  const authTag = cipher.getAuthTag(); // Get authentication tag

  return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted.toString('hex')}`;
};

/**
 * Decrypting the data (Handles both strings and numbers)
 * @param {string} text
 * @returns {string | number}
 */
const decrypt = (text?: string): string | number => {
  if (!process.env.APP_KEY) {
    throw new Error('APP_KEY is not defined');
  }

  if (!text) {
    return '';
  }

  const key = crypto.scryptSync(process.env.APP_KEY, 'salt', 32); // Derive the key
  const parts = text.split(':');

  if (parts.length !== 3) {
    throw new ValidationError([{ property: 'Encryption', message: 'Invalid Encryption Format' }]);
  }

  const iv = Buffer.from(parts[0], 'hex'); // Extract IV
  const authTag = Buffer.from(parts[1], 'hex'); // Extract Auth Tag
  const encryptedBuffer = Buffer.from(parts[2], 'hex'); // Extract Encrypted Data

  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);

  decipher.setAuthTag(authTag); // Set authentication tag

  let decrypted = decipher.update(encryptedBuffer);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  const decryptedText = decrypted.toString('utf8'); // Convert to string after decryption

  // Try to parse it as a number if it's a valid number
  const parsedNumber = parseFloat(decryptedText);
  return isNaN(parsedNumber) ? decryptedText : parsedNumber;
};

export { encrypt, decrypt };

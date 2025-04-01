import dotenv from 'dotenv';
import crypto from 'crypto';
import ValidationError from '../errors/ValidationError';

dotenv.config();

/**
 * encrypting the data
 * @param {string} text
 * @returns {string}
 */
const encrypt = (text: string): string => {
  if (!process.env.APP_KEY) {
    throw new Error('APP_KEY is not defined');
  }

  const key = crypto.scryptSync(process.env.APP_KEY, 'salt', 32);
  const iv = crypto.randomBytes(12); // 12-byte IV for AES-GCM

  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const encrypted = Buffer.concat([
    cipher.update(text, 'utf8'),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag(); // Get authentication tag

  return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted.toString('hex')}`;
};

/**
 * decrypting the data
 * @param {string} text
 * @returns {string}
 */
const decrypt = (text: string): string => {
  if (!process.env.APP_KEY) {
    throw new Error('APP_KEY is not defined');
  }

  const key = crypto.scryptSync(process.env.APP_KEY, 'salt', 32); // Derive the key
  const parts = text.split(':');

  if (parts.length !== 3) {
    throw new ValidationError([
      { property: 'Encryption', message: 'Invalid Ecryption Format' },
    ]);
  }

  const iv = Buffer.from(parts[0], 'hex'); // Extract IV
  const authTag = Buffer.from(parts[1], 'hex'); // Extract Auth Tag
  const encryptedBuffer = Buffer.from(parts[2], 'hex'); // Extract Encrypted Data

  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);

  decipher.setAuthTag(authTag); // Set authentication tag

  let decrypted = decipher.update(encryptedBuffer);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString('utf8'); // Convert to string after decryption
};

export { encrypt, decrypt };

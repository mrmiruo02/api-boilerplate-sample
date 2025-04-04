import dotenv from 'dotenv';
import crypto from 'crypto';
import ValidationError from '../errors/ValidationError';

dotenv.config();
const derivedKey = process.env.APP_KEY ? crypto.scryptSync(process.env.APP_KEY, 'salt', 32) : null;

/**
 * Encrypting the data (Handles both strings and numbers)
 * @param {string | number | boolean} text
 * @returns {any}
 */
const encrypt = (text?: string | number | boolean | null): string | null | undefined => {
  if (!derivedKey) {
    throw new Error('APP_KEY is not defined');
  }

  if (text !== undefined) {
    const hash = crypto.createHash('sha256').update(String(text)).digest();
    const iv = Buffer.from(hash.buffer, hash.byteOffset, 12); // 12-byte IV for AES-GCM

    const cipher = crypto.createCipheriv('aes-256-gcm', derivedKey, iv);
    // Convert the input to a string before encryption
    const textToEncrypt = String(text);
    const encrypted = Buffer.concat([cipher.update(textToEncrypt, 'utf8'), cipher.final()]);
    const authTag = cipher.getAuthTag(); // Get authentication tag

    return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted.toString('hex')}`;
  }

  if (text === null) {
    return null;
  }
};

/**
 * Decrypting the data (Handles both strings and numbers)
 * @param {string} text
 * @returns {string | number | undefined}
 */
const decrypt = (text?: string | null): string | number | undefined | null => {
  if (!derivedKey) {
    throw new Error('APP_KEY is not defined');
  }

  const parts = text?.split(':');
  if (parts?.length !== 3) {
    throw new ValidationError([{ property: 'Encryption', message: 'Invalid Encryption Format' }]);
  }

  const iv = Buffer.from(parts[0], 'hex');
  const authTag = Buffer.from(parts[1], 'hex');
  const encryptedBuffer = Buffer.from(parts[2], 'hex');

  const decipher = crypto.createDecipheriv('aes-256-gcm', derivedKey, iv);
  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(encryptedBuffer);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  const decryptedText = decrypted.toString('utf8');

  // Return '0' or '1' as strings
  if (decryptedText === '0' || decryptedText === '1') {
    return decryptedText;
  }

  // return null
  if (decryptedText === 'null') {
    return null;
  }

  // Parse decrypted text as number if possible
  const parsed = parseFloat(decryptedText);

  // If parsed value is a valid number, return it as a number
  if (!isNaN(parsed)) {
    return parsed;
  }

  // Otherwise return as string
  return decryptedText;
};

export { encrypt, decrypt };

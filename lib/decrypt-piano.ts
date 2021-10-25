import crypto from 'crypto';

const DELIMITER = '~~~';
const OPENSSL_CIPHER_METHOD = 'aes-256-ecb';

/**
 * Replace unsafe characters in string with safe ones and return BASE64 encoded string
 * @param data
 * @returns URL-safe string
 */
export function urlensafe(data: string): string {
  const dataBuffer = Buffer.from(data);
  const base64Data = dataBuffer.toString('base64');
  const replacedData = base64Data.replace(/\+/g, '-').replace(/\//g, '_');
  return replacedData.replace(/=+$/g, '');
}

/**
 * Receiving BASE64 encoded URL-safe string, replace safe characters in string with original ones and return buffer
 * @param data
 * @returns buffer
 */
export function urldesafe(data: string): Buffer {
  const replacedData = data.replace(/-/g, '+').replace(/_/g, '/');
  return Buffer.from(replacedData, 'base64');
}

/**
 * Decrypt Piano encrypted data
 *
 * @param keyString - Piano private key
 * @param data - Encrypted data
 * @returns Decrypted data
 */
export function decrypt(keyString: string, data: string): string {
  const pos = data.lastIndexOf(DELIMITER);

  if (pos > 0) {
    data = data.substr(0, pos);
  }

  if (keyString.length > 32) {
    keyString = keyString.substr(0, 32);
  }

  if (keyString.length < 32) {
    keyString = keyString.padEnd(32, 'X');
  }

  return sslDecrypt(keyString, urldesafe(data));
}

function sslDecrypt(keyString: string, data: Buffer): string {
  const decipher = crypto.createDecipheriv(
    OPENSSL_CIPHER_METHOD,
    keyString,
    ''
  );

  const output = decipher.update(data);
  const resultBuffer = Buffer.concat([output, decipher.final()]);

  return resultBuffer.toString('utf8');
}
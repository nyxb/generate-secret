import { randomBytes } from 'crypto';

export async function generateSecret(length: number): Promise<string> {
  return new Promise((resolve, reject) => {
    randomBytes(Math.ceil(length/2), (err, buffer) => {
      if (err) reject(err);
      resolve(buffer.toString('hex').slice(0, length));
    });
  });
} 

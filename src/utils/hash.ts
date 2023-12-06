import 'dotenv/config';

import config from 'config';
import bcrypt from 'bcrypt';

const SALT: number = config.get('SALT');

export function createHash(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(SALT, (saltErr, salt) => {
      if (saltErr) {
        reject(saltErr);
      } else {
        bcrypt.hash(password, salt, (hashErr, hash) => {
          if (hashErr) {
            reject(hashErr);
          } else {
            resolve(hash);
          }
        });
      }
    });
  });
}
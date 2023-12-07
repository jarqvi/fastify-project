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

export function compareHash(password: string, hash: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
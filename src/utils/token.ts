import 'dotenv/config';

import config from 'config';
import jwt, { VerifyErrors } from 'jsonwebtoken';

import { UserModel } from '../models/index';
import { DecodedToken, TokenPayload } from '../interfaces/token';

const SECRET_KEY: string = config.get('SECRET_KEY');

export function createToken(id: number, username: string): Promise<string> {
  const payload: TokenPayload = {
    id,
    username,
  };
  const expiresIn = '1h';

  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, SECRET_KEY, { expiresIn }, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token as string);
      }
    });
  });
}

export function verifyToken(token: string): Promise<Record<string, any>> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_KEY, async (err: VerifyErrors | null, decoded?: object | string) => {
      if (err) {
        reject(err);
      } else {
        const { username, id } = decoded as DecodedToken;

        try {
          const user = await UserModel.findOne({
            where: {
              id,
              username,
            },
          });

          if (!user) {
            reject('Unauthorized.');
          } else {
            resolve(decoded as Record<string, any>);
          }
        } catch (error) {
          reject('Internal server error.');
        }
      }
    });
  });
}
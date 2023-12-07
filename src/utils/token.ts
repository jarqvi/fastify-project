import 'dotenv/config';

import config from 'config';
import jwt from 'jsonwebtoken';

const SECRET_KEY: string = config.get('SECRET_KEY');

export function createToken(id: number, username: string): string {
  const payload = {
    id,
    username
  };
  const expiresIn = '1h';

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn })
  return token;
}
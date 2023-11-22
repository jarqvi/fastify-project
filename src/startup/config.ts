import 'dotenv/config';

import { cleanEnv, str } from 'envalid';

import IEnv from '../interfaces/env';

export const env: IEnv = cleanEnv(process.env, {
  NODE_ENV: str({ desc: 'development or production' }),
  DB_URI: str({ desc: 'for postgres database' }),
  HOST: str({ desc: 'the host of app' }),
  SECRET_KEY: str({ desc: 'a secret for hashing' }),
  DB_USER: str({ desc: 'for connect to db' }),
  DB_PASS: str({ desc: 'for connect to db' }),
  PG_EMAIL: str({ desc: 'for connect to db gui' }),
  PG_PASS: str({ desc: 'for connect to db gui' }),
});

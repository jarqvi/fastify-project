import 'dotenv/config';

import pino from 'pino';
import config from 'config';
import { cleanEnv, str } from 'envalid';

import IEnv from './interface/env';

const APP_NAME: string = config.get('APP_NAME');
const PORT: string = config.get('PORT');
// ---
const HOST: string = config.get('HOST');
const DB_URI: string = config.get('DB_URI');
const SECRET_KEY: string = config.get('SECRET_KEY');
// ---
const NODE_ENV = process.env.NODE_ENV;

const env: IEnv = cleanEnv(process.env, {
    NODE_ENV: str({ desc: 'development or production' }),
    DB_URI: str({ desc: 'for postgres database' }),
    HOST: str({ desc: 'the host of app' }),
    SECRET_KEY: str({ desc: 'a secret for hashing' }),
});
// ---
env.NODE_ENV;
env.DB_URI;
env.HOST;
env.SECRET_KEY;

const logger = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
        },
    },
    stream: process.stdout,
});

import 'dotenv/config';

import pino from 'pino';
import config from 'config';
import fastify from 'fastify';
import cors from '@fastify/cors';
import { Sequelize } from 'sequelize';
import { cleanEnv, str } from 'envalid';

import IEnv from './interfaces/env';
import authRoute from './routes/v1/auth';

const APP_NAME: string = config.get('APP_NAME');
const PORT: number = config.get('PORT');
const HOST: string = config.get('HOST');
const DB_URI: string = config.get('DB_URI');
// const SECRET_KEY: string = config.get('SECRET_KEY');
// const NODE_ENV = process.env.NODE_ENV;

const env: IEnv = cleanEnv(process.env, {
    NODE_ENV: str({ desc: 'development or production' }),
    DB_URI: str({ desc: 'for postgres database' }),
    HOST: str({ desc: 'the host of app' }),
    SECRET_KEY: str({ desc: 'a secret for hashing' }),
});
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

export const sequelize = new Sequelize(DB_URI);
(async () => {
    try {
        await sequelize.authenticate();
        logger.info(`${APP_NAME} database connected`);
    } catch (err) {
        logger.error(err);
    }
})();

export const server = fastify({
    logger,
    ignoreDuplicateSlashes: true,
});

server.register(cors, {
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
});

server.register(authRoute, { prefix: '/api/v1' });

server.listen({ port: +PORT, host: HOST }, async (err: Error | null, address: string) => {
    if (err) {
        server.log.error(err);
        process.exit(1);
    }
});

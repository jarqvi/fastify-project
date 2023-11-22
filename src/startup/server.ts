import 'dotenv/config';

import pino from 'pino';
import config from 'config';
import fastify from 'fastify';
import cors from '@fastify/cors';
import { Sequelize } from 'sequelize';

import { db } from './db';
import { env } from './config';
import { logger } from './logger';
import IEnv from '../interfaces/env';
import authRoute from '../routes/v1/auth';

const PORT: number = config.get('PORT');
const HOST: string = config.get('HOST');

env.NODE_ENV;
env.DB_URI;
env.HOST;
env.DB_USER;
env.DB_PASS;
env.PG_EMAIL;
env.PG_PASS;

db();

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

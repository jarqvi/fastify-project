import 'dotenv/config';

import config from 'config';
import fastify from 'fastify';
import cors from '@fastify/cors';

import { db } from './db';
import { env } from './config';
import { logger } from './logger';
import v1Routes from '../routes/v1';
import { verifyToken } from '../utils/token';

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

// server.addHook('preHandler', async (req, reply) => {
//   try {
//     const token = req.headers.authorization?.replace('Bearer ', '');
//     if (!token) {
//       return reply.status(401).send({ error: 'Unauthorized.' });
//     }

//     const decodedToken = await verifyToken(token);
    
//     //@ts-ignore
//     req.user = decodedToken;
//   } catch (error) {
//     reply.status(401).send({ error: 'Unauthorized.' });
//   }
// });
server.route({
  method: 'GET',
  url: '/',
  handler: (req, reply) => {
    return reply.status(200).send({
      statusCode: 200,
      message: 'API web service started',
    });
  },
});
server.register(v1Routes, { prefix: '/api/v1' });

server.listen({ port: +PORT, host: HOST }, async (err: Error | null, address: string) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});

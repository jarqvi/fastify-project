import 'dotenv/config';

import path from 'path';

import middie from '@fastify/middie';
import fastify from 'fastify';

import serve from 'serve-static';
import config from 'config';
import cors from 'cors';

import { db } from './db';
import { env } from './config';
import { logger } from './logger';
import { verifyToken } from '../utils/token';

import v1Routes from '../routes/v1';

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

(async () => {
  //Middleware
  await server.register(middie);

  server.use(cors());
  server.use('/public', serve(path.join(__dirname, '../../public')));
  
  //Auth
  server.addHook('preHandler', async (req, reply) => {
    try {
      if (req.url.startsWith('/api/v1/auth/') || req.url === '/' || req.url.startsWith('/public/')) return;
  
      const token = req.headers.authorization?.replace('Bearer ', '');
      if (!token) {
        return reply.status(401).send({ error: 'Unauthorized.' });
      }
  
      const decodedToken = await verifyToken(token);
      
      //@ts-ignore
      req.user = decodedToken;
    } catch (error) {
      reply.status(401).send({ error: 'Unauthorized.' });
    }
  });
  
  //Routes
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
  
  //Server
  server.listen({ port: +PORT, host: HOST }, async (err: Error | null, address: string) => {
    if (err) {
      server.log.error(err);
      process.exit(1);
    }
  });
})();

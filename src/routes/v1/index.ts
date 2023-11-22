import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import authRoute from './auth';

export default function v1Routes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: (err?: Error | undefined) => void,
) {
  fastify.register(authRoute, { prefix: '/auth' });

  done();
}

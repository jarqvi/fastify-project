import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import AuthController from '../../handlers/auth';

export default function authRoute(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: (err?: Error | undefined) => void,
) {
  fastify.route({
    method: 'POST',
    url: '/register',
    handler: AuthController.register,
  });

  done();
}

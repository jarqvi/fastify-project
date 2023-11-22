import { FastifyRequest, FastifyReply } from 'fastify';

class AuthController {
  async register(req: FastifyRequest, reply: FastifyReply) {
    return reply.send({ hello: 'world' });
  }
}

export default new AuthController();

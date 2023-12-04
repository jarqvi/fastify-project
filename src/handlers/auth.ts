import { FastifyRequest, FastifyReply } from 'fastify';

class AuthController {
  async register(req: FastifyRequest, reply: FastifyReply) {
    return reply.send(req.headers.authorization);
  }
}

export default new AuthController();

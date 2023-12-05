import { FastifyRequest, FastifyReply } from 'fastify';

import { registerSchema } from '../schemas/validations/auth';

class AuthController {
  async register(req: FastifyRequest, reply: FastifyReply) {
    const isBodyValid = registerSchema(req.body);
    console.log(isBodyValid);
    if (!isBodyValid) {
      
    }
  }
}

export default new AuthController();

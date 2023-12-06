import { FastifyRequest, FastifyReply } from 'fastify';

import { registerSchema } from '../schemas/validations/auth';
import { UserModel } from '../models/index';
import { createHash } from '../utils/hash';

class AuthController {
  async register(req: FastifyRequest, reply: FastifyReply) {
    const body = registerSchema(req.body);
    if (!body) {
      return reply.code(400).send({
        message: registerSchema.errors
      });
    }

    const {
      fullName,
      username,
      password
    } = req.body as {
      fullName: string;
      username: string;
      password: string;
    };

    const user = await UserModel.findOne({
      where: {
        username
      }
    });
    if (user) {
      return reply.code(409).send({
        message: 'User already exist.'
      })
    }

    const hashPassword = await createHash(password);
    const newUser = await UserModel.create({
      fullName,
      username,
      password: hashPassword,
    });
    if (!newUser) {
      return reply.code(500).send({
        message: 'Internal server error.'
      });
    }

    return reply.code(201).send({
      message: 'User created successfully'
    });
  }
}

export default new AuthController();

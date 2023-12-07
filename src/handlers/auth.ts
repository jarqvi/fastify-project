import { FastifyRequest, FastifyReply } from 'fastify';

import { registerSchema, loginSchema } from '../schemas/validations/auth';
import { createHash, compareHash } from '../utils/hash';
import { UserModel } from '../models/index';
import { createToken } from '../utils/token';

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

  async login(req: FastifyRequest, reply: FastifyReply) {
    const body = loginSchema(req.body);
    if (!body) {
      return reply.code(400).send({
        message: loginSchema.errors
      });
    }

    const {
      username,
      password
    } = req.body as {
      username: string;
      password: string;
    };

    const user = await UserModel.findOne({
      where: {
        username
      }
    });
    if (!user) {
      return reply.code(400).send({
        message: 'The username or password in incorrect.'
      })
    }

    const validatePassword = await compareHash(password, user.getDataValue('password'));
    if (!validatePassword) {
      return reply.code(400).send({
        message: 'The username or password in incorrect.'
      })
    }

    const token = createToken(user.getDataValue('id'), user.getDataValue('username')); 

    return reply.code(200).send({
      token
    });
  }
}

export default new AuthController();

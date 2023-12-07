import Ajv from 'ajv';

const ajv = new Ajv();

export const registerSchema = ajv.compile({
    type: 'object',
    properties: {
      fullName: {
        type: 'string',
        minLength: 4,
        maxLength: 50,
      },
      username: {
          type: 'string',
          minLength: 4,
          maxLength: 50,
          nullable: false
      },
      password: {
          type: 'string',
          minLength: 8,
          maxLength: 255,
          nullable: false
      },
    },
    required: [
      'fullName',
      'username', 
      'password'
    ],
    additionalProperties: false,
});

export const loginSchema = ajv.compile({
  type: 'object',
  properties: {
    username: {
        type: 'string',
        minLength: 4,
        maxLength: 50,
        nullable: false
    },
    password: {
        type: 'string',
        minLength: 8,
        maxLength: 255,
        nullable: false
    },
  },
  required: [
    'username', 
    'password'
  ],
  additionalProperties: false,
});
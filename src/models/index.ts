import UserModel from './user';

UserModel.sync({ alter: true });

export {
  UserModel,
};
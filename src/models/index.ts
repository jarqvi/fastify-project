import UserModel from './user';
import UserDetailsModel from './userDetails';

UserModel.hasOne(UserDetailsModel);
UserDetailsModel.belongsTo(UserModel);

UserModel.sync({ alter: true });
UserDetailsModel.sync({ alter: true });

export {
  UserModel,
  UserDetailsModel,
};
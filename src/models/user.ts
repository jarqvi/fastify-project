import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../startup/db';

export default class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING(50),
    },
    last_name: {
      type: DataTypes.STRING(50),
    },
    username: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    birth_date: {
      type: DataTypes.DATEONLY,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  },
);

User.sync({ force: true });

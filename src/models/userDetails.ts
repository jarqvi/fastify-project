import { DataTypes } from 'sequelize';

import { sequelize } from '../startup/db';

export default sequelize.define(
  'UserDetails',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(50),
    },
    latitudes: {
      type: DataTypes.DOUBLE
    },
    longitudes: {
      type: DataTypes.DOUBLE
    },
    userId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: true,
  },
);

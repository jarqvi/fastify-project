import 'dotenv/config';

import config from 'config';
import { Sequelize } from 'sequelize';

import { logger } from './logger';

const APP_NAME: string = config.get('APP_NAME');
const DB_URI: string = config.get('DB_URI');

export const sequelize = new Sequelize(DB_URI, { logging: false });
export const db = async () => {
  try {
    await sequelize.authenticate();
    logger.info(`${APP_NAME} database connected`);
  } catch (err) {
    logger.error(err);
  }
};

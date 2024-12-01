import sequelize from '../config/db.js';
import User from '../models/user.js';
import Task from '../models/task.js';

async function syncDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    await sequelize.sync({ alter: true });
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

export default syncDatabase

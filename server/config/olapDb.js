import { Sequelize } from 'sequelize';

const olapSequelize = new Sequelize('sd lab02', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres'
});

export default olapSequelize;
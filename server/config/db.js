import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('sd', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres'
});

export default sequelize;
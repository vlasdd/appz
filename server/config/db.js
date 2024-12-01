import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('appz6', 'postgres', '1111', {
  host: 'localhost',
  dialect: 'postgres'
});

export default sequelize;
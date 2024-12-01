import sequelize from '../config/db.js';

async function dropAllTables() {
  try {
    await sequelize.drop();
    console.log('All tables dropped successfully.');
  } catch (error) {
    console.error('Error dropping tables:', error);
  }
}

export default dropAllTables
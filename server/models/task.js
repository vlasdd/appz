import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './user.js';

const Task = sequelize.define('Task', {
  task_id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'user_id',
    },
  },
  course: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date_started: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  score: {
    type: DataTypes.STRING, // Наприклад, '6/10'
    allowNull: true,
  },
  details: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING, // Наприклад, 'completed', 'in progress', 'not started'
    allowNull: false,
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  answer: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'tasks',
  timestamps: false, // Якщо не потрібні поля createdAt/updatedAt
});

// Встановлення зв’язку із таблицею User
Task.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Task, { foreignKey: 'user_id' });

export default Task;

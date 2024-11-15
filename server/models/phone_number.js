import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const PhoneNumber = sequelize.define('PhoneNumber', {
  phone_number_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false
  },
  creation_date: {
    type: DataTypes.DATE,
    allowNull: false,
    timezone: false 
  },
  update_date: {
    type: DataTypes.DATE,
    allowNull: false,
    timezone: false 
  },
}, {
  tableName: 'phone_number',
  timestamps: false,
});

export default PhoneNumber;
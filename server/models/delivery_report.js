import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const DeliveryReport = sequelize.define('DeliveryReport', {
  delivery_report_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  delivery_order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  multiple_delivers: {
    type: DataTypes.BOOLEAN,
  },
  time_taken: {
    type: DataTypes.INTEGER,
  },
  traffic_density: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  area_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  time_order_picked: {
    type: DataTypes.DATE,
    timezone: false 
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
  tableName: 'delivery_report',
  timestamps: false,
});

export default DeliveryReport;
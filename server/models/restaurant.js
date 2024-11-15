import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import RestaurantAddress from './restaurant_address.js';

const Restaurant = sequelize.define('Restaurant', {
  restaurant_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
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
  tableName: 'restaurant',
  timestamps: false,
});

Restaurant.hasOne(RestaurantAddress, { foreignKey: 'restaurant_id' });

export default Restaurant;
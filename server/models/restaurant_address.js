import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Address from './address.js';

const RestaurantAddress = sequelize.define('RestaurantAddress', {
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  address_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
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
  tableName: 'restaurant_address',
  timestamps: false,
});

RestaurantAddress.removeAttribute('id');
RestaurantAddress.belongsTo(Address, { foreignKey: 'address_id' });

export default RestaurantAddress;
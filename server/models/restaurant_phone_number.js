import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import PhoneNumber from './phone_number.js';
import Restaurant from './restaurant.js';

const RestaurantPhoneNumber = sequelize.define('RestaurantPhoneNumber', {
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  phone_number_id: {
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
  tableName: 'restaurant_phone_number',
  timestamps: false,
});

RestaurantPhoneNumber.removeAttribute('id');
RestaurantPhoneNumber.belongsTo(Restaurant, { foreignKey: 'restaurant_id' });
RestaurantPhoneNumber.belongsTo(PhoneNumber, { foreignKey: 'phone_number_id' });

export default RestaurantPhoneNumber;
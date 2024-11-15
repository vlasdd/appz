import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import CustomerOrder from './customer_order.js';
import Restaurant from './restaurant.js';

const RestaurantOrder = sequelize.define('RestaurantOrder', {
  restaurant_order_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  delivery_order_id: {
    type: DataTypes.INTEGER,
  },
  customer_order_id: {
    type: DataTypes.INTEGER,
  },
  status: {
    type: DataTypes.STRING,
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
  tableName: 'restaurant_order',
  timestamps: false,
});

RestaurantOrder.belongsTo(Restaurant, { foreignKey: 'restaurant_id' });
RestaurantOrder.belongsTo(CustomerOrder, { foreignKey: 'customer_order_id' });

export default RestaurantOrder;
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Person from './person.js';
import Restaurant from './restaurant.js';

const CustomerOrder = sequelize.define('CustomerOrder', {
  customer_order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  restaurant_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  customer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type_of_order: {
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
  tableName: 'customer_order',
  timestamps: false,
});

CustomerOrder.belongsTo(Person, { foreignKey: 'customer_id' });
CustomerOrder.belongsTo(Restaurant, { foreignKey: 'restaurant_id' });

export default CustomerOrder;
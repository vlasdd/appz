import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import DeliveryAddress from './delivery_address.js';
import DeliveryReport from './delivery_report.js';
import Person from './person.js';
import RestaurantOrder from './restaurant_order.js';

const DeliveryOrder = sequelize.define('DeliveryOrder', {
  delivery_order_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  delivery_person_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  vehicle_type: {
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
  tableName: 'delivery_order',
  timestamps: false,
});

DeliveryOrder.hasOne(DeliveryReport, { foreignKey: 'delivery_order_id' });
DeliveryOrder.hasOne(RestaurantOrder, { foreignKey: 'delivery_order_id' });
DeliveryOrder.hasOne(DeliveryAddress, { foreignKey: 'delivery_order_id' });
DeliveryOrder.belongsTo(Person, { foreignKey: 'delivery_person_id' });

export default DeliveryOrder;
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Address from './address.js';

const DeliveryAddress = sequelize.define('DeliveryAddress', {
  delivery_order_id: {
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
  tableName: 'delivery_address',
  timestamps: false,
});

DeliveryAddress.removeAttribute('id');
DeliveryAddress.belongsTo(Address, { foreignKey: 'address_id' });

export default DeliveryAddress;
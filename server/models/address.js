import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import City from './city.js';

const Address = sequelize.define('Address', {
  address_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  city: {
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
  street_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  longtitude: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  latitude: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'address',
  timestamps: false,
});

Address.belongsTo(City, { foreignKey: 'city' });

export default Address;
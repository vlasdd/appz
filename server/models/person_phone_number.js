import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Person from './person.js';
import PhoneNumber from './phone_number.js';

const PersonPhoneNumber = sequelize.define('PersonPhoneNumber', {
  person_id: {
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
  tableName: 'person_phone_number',
  timestamps: false,
});

PersonPhoneNumber.removeAttribute('id');
PersonPhoneNumber.belongsTo(Person, { foreignKey: 'person_id' });
PersonPhoneNumber.belongsTo(PhoneNumber, { foreignKey: 'phone_number_id' });

export default PersonPhoneNumber;
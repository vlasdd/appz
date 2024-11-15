import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Email from './email.js';
import Person from './person.js';

const PersonEmail = sequelize.define('PersonEmail', {
  person_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  email_id: {
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
  tableName: 'person_email',
  timestamps: false,
});

PersonEmail.removeAttribute('id');
PersonEmail.belongsTo(Person, { foreignKey: 'person_id' });
PersonEmail.belongsTo(Email, { foreignKey: 'email_id' });

export default PersonEmail;
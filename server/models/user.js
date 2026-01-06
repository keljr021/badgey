import { DataTypes } from 'sequelize';
import { sequelize } from '../sequelize.js';

export const User = sequelize.define('User', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  userType: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '',
  },
  image: {
    type: DataTypes.BLOB('long'),
    allowNull: true,
    get() {
        // Convert the Buffer to a Base64 string when accessed
        const rawValue = this.getDataValue('image');
        return rawValue ? rawValue.toString('base64') : null;
      }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '',
  },
  username: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '',
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '',
  },
  dob: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '',
  },
  company: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '',
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, 
{
  tableName: 'Users',
  timestamps: false,
});

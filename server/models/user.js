import { DataTypes } from 'sequelize';
import { sequelize } from '../sequelize.js';

export const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {});

// Define associations if necessary
// User.associate = (models) => { /* ... */ };

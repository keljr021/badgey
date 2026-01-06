import { DataTypes } from 'sequelize';
import { sequelize } from '../sequelize.js';

const stringType = {
    type: DataTypes.STRING,
    allowNull: true,
};

export const Badge = sequelize.define('Badge', {
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  userId: stringType,
  image: {
    type: DataTypes.BLOB('long'),
    allowNull: true,
  },
  name: stringType,
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  isApproved: {
    type: DataTypes.TINYINT,
    allowNull: false,
  },
  rejectReason: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
},
{
    tableName: 'Badges',
    timestamps: false,
});

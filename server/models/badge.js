import { DataTypes } from 'sequelize';
import { sequelize } from '../sequelize.js';

export const Badge = sequelize.define('Badge', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: true,
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
  },
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

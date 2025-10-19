import { DataTypes } from 'sequelize';
import sequelize from './../config/dbConfig.js'

const User = sequelize.define('User', {
  user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  phone_number: { type: DataTypes.STRING },
  hash_password: { type: DataTypes.STRING, allowNull: false },
  activation_link: { type: DataTypes.STRING, allowNull: false },
  is_activated: { type: DataTypes.BOOLEAN, defaultValue: false },
}, {
  tableName: 'users',
  timestamps: false,
});

export default User;

import { DataTypes } from 'sequelize';
import sequelize from './../config/dbConfig.js'

import User from './User.js';

const Business = sequelize.define('Business', {
    business_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    address: { type: DataTypes.TEXT, allowNull: false },
    work_time: { type: DataTypes.STRING },
    latitude: { type: DataTypes.DECIMAL(9, 6) },
    longitude: { type: DataTypes.DECIMAL(9, 6) },
}, {
    tableName: 'businesses',
    timestamps: false,
});

Business.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
User.hasOne(Business, { foreignKey: 'user_id' });

export default Business;

// src/models/SurpriseBox.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig.js';
import Business from './Business.js';

const SurpriseBox = sequelize.define('SurpriseBox', {
    box_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    business_id: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    weight: { type: DataTypes.DECIMAL(10, 2) },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    active_start_time: { type: DataTypes.DATE },
    active_end_time: { type: DataTypes.DATE },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    quantity_available: { type: DataTypes.INTEGER, defaultValue: 0 },
}, {
    tableName: 'surpriseboxes',
    timestamps: false,
});

SurpriseBox.belongsTo(Business, { foreignKey: 'business_id', onDelete: 'CASCADE' });
Business.hasMany(SurpriseBox, { foreignKey: 'business_id' });

export default SurpriseBox;

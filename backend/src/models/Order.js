// src/models/Order.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig.js';
import Client from './Client.js';

const Order = sequelize.define('Order', {
    order_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    client_id: { type: DataTypes.INTEGER, allowNull: false },
    created_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    closed_date: { type: DataTypes.DATE },
    summary: { type: DataTypes.DECIMAL(10, 2) },
    status: { type: DataTypes.STRING, defaultValue: 'pending' },
}, {
    tableName: 'orders',
    timestamps: false,
});

Order.belongsTo(Client, { foreignKey: 'client_id', onDelete: 'CASCADE' });
Client.hasMany(Order, { foreignKey: 'client_id' });

export default Order;

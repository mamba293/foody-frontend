// src/models/OrderStatusHistory.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig.js';
import Order from './Order.js';

const OrderStatusHistory = sequelize.define('OrderStatusHistory', {
    history_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    order_id: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
    changed_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
    tableName: 'orderstatushistory',
    timestamps: false,
});

OrderStatusHistory.belongsTo(Order, { foreignKey: 'order_id', onDelete: 'CASCADE' });
Order.hasMany(OrderStatusHistory, { foreignKey: 'order_id' });

export default OrderStatusHistory;

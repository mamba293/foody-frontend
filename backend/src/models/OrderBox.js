// src/models/OrderBox.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig.js';
import Order from './Order.js';
import SurpriseBox from './SurpriseBox.js';

const OrderBox = sequelize.define('OrderBox', {
    order_box_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    order_id: { type: DataTypes.INTEGER, allowNull: false },
    box_id: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, defaultValue: 1, allowNull: false },
}, {
    tableName: 'orderboxes',
    timestamps: false,
});

OrderBox.belongsTo(Order, { foreignKey: 'order_id', onDelete: 'CASCADE' });
Order.hasMany(OrderBox, { foreignKey: 'order_id' });

OrderBox.belongsTo(SurpriseBox, { foreignKey: 'box_id', onDelete: 'CASCADE' });
SurpriseBox.hasMany(OrderBox, { foreignKey: 'box_id' });

export default OrderBox;

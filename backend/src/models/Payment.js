// src/models/Payment.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig.js';
import Order from './Order.js';
import PaymentMethod from './PaymentMethod.js';

const Payment = sequelize.define('Payment', {
    payment_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    order_id: { type: DataTypes.INTEGER, allowNull: false },
    method_id: { type: DataTypes.INTEGER, allowNull: false },
    amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: 'pending' },
    payment_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
    tableName: 'payments',
    timestamps: false,
});

Payment.belongsTo(Order, { foreignKey: 'order_id', onDelete: 'CASCADE' });
Order.hasMany(Payment, { foreignKey: 'order_id' });

Payment.belongsTo(PaymentMethod, { foreignKey: 'method_id', onDelete: 'RESTRICT' });
PaymentMethod.hasMany(Payment, { foreignKey: 'method_id' });

export default Payment;

// src/models/PaymentHistory.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig.js';
import Payment from './Payment.js';

const PaymentHistory = sequelize.define('PaymentHistory', {
    history_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    payment_id: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.STRING },
    changed_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
    tableName: 'paymenthistory',
    timestamps: false,
});

PaymentHistory.belongsTo(Payment, { foreignKey: 'payment_id', onDelete: 'CASCADE' });
Payment.hasMany(PaymentHistory, { foreignKey: 'payment_id' });

export default PaymentHistory;

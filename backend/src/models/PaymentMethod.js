// src/models/PaymentMethod.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig.js';

const PaymentMethod = sequelize.define('PaymentMethod', {
    method_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
}, {
    tableName: 'paymentmethods',
    timestamps: false,
});

export default PaymentMethod;

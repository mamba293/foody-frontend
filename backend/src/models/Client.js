import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig.js';
import User from './User.js';

const Client = sequelize.define('Client', {
    client_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
}, {
    tableName: 'clients',
    timestamps: false,
});

Client.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
User.hasOne(Client, { foreignKey: 'user_id' });

export default Client;

import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig.js';
import User from './User.js';

const Token = sequelize.define('Token', {
    token_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    refresh_token: { type: DataTypes.TEXT, allowNull: false },
}, {
    tableName: 'tokens',
    timestamps: false,
});

User.hasMany(Token, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Token.belongsTo(User, { foreignKey: 'user_id' });

export default Token;

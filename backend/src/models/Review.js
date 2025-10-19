// src/models/Review.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig.js';
import Client from './Client.js';
import Business from './Business.js';

const Review = sequelize.define('Review', {
    review_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    client_id: { type: DataTypes.INTEGER, allowNull: false },
    business_id: { type: DataTypes.INTEGER, allowNull: false },
    created_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_date: { type: DataTypes.DATE },
    rating: { type: DataTypes.DECIMAL(2, 1) },
    description: { type: DataTypes.TEXT },
}, {
    tableName: 'reviews',
    timestamps: false,
});

Review.belongsTo(Client, { foreignKey: 'client_id', onDelete: 'CASCADE' });
Client.hasMany(Review, { foreignKey: 'client_id' });

Review.belongsTo(Business, { foreignKey: 'business_id', onDelete: 'CASCADE' });
Business.hasMany(Review, { foreignKey: 'business_id' });

export default Review;

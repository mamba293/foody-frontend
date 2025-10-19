import { DataTypes } from 'sequelize';
import sequelize from './../config/dbConfig.js'

import Business from './Business.js';

const BusinessImage = sequelize.define('BusinessImage', {
    image_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    business_id: { type: DataTypes.INTEGER, allowNull: false },
    image_url: { type: DataTypes.STRING, allowNull: false },
}, {
    tableName: 'businessimages',
    timestamps: false,
});

BusinessImage.belongsTo(Business, { foreignKey: 'business_id', onDelete: 'CASCADE' });
Business.hasMany(BusinessImage, { foreignKey: 'business_id' });

export default BusinessImage;

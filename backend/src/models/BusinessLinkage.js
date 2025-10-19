import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig.js';
import Business from './Business.js';
import BusinessCategory from './BusinessCategory.js';

const BusinessLinkage = sequelize.define('BusinessLinkage', {
    business_id: { type: DataTypes.INTEGER, primaryKey: true },
    category_id: { type: DataTypes.INTEGER, primaryKey: true },
}, {
    tableName: 'businesslinkages',
    timestamps: false,
});

BusinessLinkage.belongsTo(Business, { foreignKey: 'business_id', onDelete: 'CASCADE' });
BusinessLinkage.belongsTo(BusinessCategory, { foreignKey: 'category_id', onDelete: 'CASCADE' });

Business.hasMany(BusinessLinkage, { foreignKey: 'business_id' });
BusinessCategory.hasMany(BusinessLinkage, { foreignKey: 'category_id' });

export default BusinessLinkage;

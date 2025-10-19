import { DataTypes } from 'sequelize';
import sequelize from './../config/dbConfig.js'

const BusinessCategory = sequelize.define('BusinessCategory', {
    category_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    description: { type: DataTypes.TEXT },
}, {
    tableName: 'businesscategories',
    timestamps: false,
});

export default BusinessCategory;

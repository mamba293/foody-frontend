import sequelize from "../config/dbConfig.js";

export const initModels = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to DB has been established successfully.');

        await sequelize.sync({ alter: true });
        console.log('All models were synchronized successfully.');
    } catch (err) {
        console.error('Unable to connect or sync DB:', err);
    }
};
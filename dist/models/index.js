"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sequelize_1 = require("sequelize");
const config_1 = tslib_1.__importDefault(require("../config/config"));
const user_1 = require("./user");
const sequelize = new sequelize_1.Sequelize(config_1.default.dbConfig.database, config_1.default.dbConfig.username, config_1.default.dbConfig.password, {
    host: config_1.default.dbConfig.host,
    dialect: config_1.default.dbConfig.dialect,
    port: config_1.default.dbConfig.port,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
});
// Initialize models
const User = (0, user_1.UserModel)(sequelize);
const db = {
    User,
    sequelize,
    Sequelize: sequelize_1.Sequelize,
};
exports.default = db;

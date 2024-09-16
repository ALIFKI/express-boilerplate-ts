"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.User = void 0;
const tslib_1 = require("tslib");
const sequelize_1 = require("sequelize");
const bcryptjs_1 = tslib_1.__importDefault(require("bcryptjs"));
class User extends sequelize_1.Model {
    comparePassword(password) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return bcryptjs_1.default.compare(password, this.password);
        });
    }
}
exports.User = User;
const UserModel = (sequelize) => {
    User.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Name cannot be empty",
                },
            },
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    msg: "Email must be a valid email address",
                },
            },
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            validate: {
                min: {
                    args: [6],
                    msg: "Password Must be more than 6 Character",
                },
            },
        },
    }, {
        sequelize,
        tableName: "Users",
        schema: "public",
    });
    return User;
};
exports.UserModel = UserModel;

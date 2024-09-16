"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const tslib_1 = require("tslib");
const user_1 = require("@/models/user");
const bcryptjs_1 = tslib_1.__importDefault(require("bcryptjs"));
class UserService {
    getAllUsers() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield user_1.User.findAll();
        });
    }
    getUserByID(_id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield user_1.User.findByPk(_id);
        });
    }
    getUserByEmail(_email) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield user_1.User.findOne({
                where: { email: _email },
            });
        });
    }
    createUser(userData) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcryptjs_1.default.hash(userData.password, 10);
            return yield user_1.User.create(Object.assign(Object.assign({}, userData), { password: hashedPassword }));
        });
    }
}
exports.UserService = UserService;
const userService = new UserService();
exports.default = userService;

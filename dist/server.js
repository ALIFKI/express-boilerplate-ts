"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const app_1 = tslib_1.__importDefault(require("./app"));
const config_1 = tslib_1.__importDefault(require("./config/config"));
const models_1 = tslib_1.__importDefault(require("./models"));
// Sync the database and then start the server
models_1.default.sequelize
    .sync()
    .then(() => {
    app_1.default.listen(config_1.default.port, () => {
        console.log(`Server is running on port ${config_1.default.port}`);
    });
})
    .catch((err) => {
    console.log(err);
});

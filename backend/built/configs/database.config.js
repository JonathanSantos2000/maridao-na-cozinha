"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dpConnect = void 0;
var mongoose_1 = require("mongoose");
var dpConnect = function () {
    (0, mongoose_1.connect)(process.env.MONGO_URI, {}).then(function () { return console.log("Connect successfully"); }, function (error) { return console.log(error); });
};
exports.dpConnect = dpConnect;

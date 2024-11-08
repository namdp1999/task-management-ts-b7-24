"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const user_model_1 = require("../../models/user.model");
const requireAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers.authorization) {
        res.json({
            code: "error",
            message: "Vui lòng gửi kèm theo token!"
        });
        return;
    }
    const token = req.headers.authorization.split(" ")[1];
    const existUser = yield user_model_1.User.findOne({
        token: token,
        deleted: false
    });
    if (!existUser) {
        res.json({
            code: "error",
            message: "Token không hợp lệ!"
        });
        return;
    }
    req["user"] = existUser;
    next();
});
exports.requireAuth = requireAuth;

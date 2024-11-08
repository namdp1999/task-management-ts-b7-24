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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = exports.login = exports.register = void 0;
const user_model_1 = require("../../models/user.model");
const md5_1 = __importDefault(require("md5"));
const generate_helper_1 = require("../../helpers/generate.helper");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    const existUser = yield user_model_1.User.findOne({
        email: user.email,
        deleted: false
    });
    if (existUser) {
        res.json({
            code: "error",
            message: "Email đã tồn tại trong hệ thống!"
        });
        return;
    }
    const dataUser = {
        fullName: user.fullName,
        email: user.email,
        password: (0, md5_1.default)(user.password),
        token: (0, generate_helper_1.generateRandomString)(30)
    };
    const newUser = new user_model_1.User(dataUser);
    yield newUser.save();
    res.json({
        code: "success",
        message: "Đăng ký thành công!",
        token: newUser.token
    });
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    const existUser = yield user_model_1.User.findOne({
        email: email,
        deleted: false
    });
    if (!existUser) {
        res.json({
            code: "error",
            message: "Email không tồn tại trong hệ thống!"
        });
        return;
    }
    if ((0, md5_1.default)(password) != existUser.password) {
        res.json({
            code: "error",
            message: "Sai mật khẩu!"
        });
        return;
    }
    res.json({
        code: "success",
        message: "Đăng nhập thành công!",
        token: existUser.token
    });
});
exports.login = login;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.body.token;
    if (!token) {
        res.json({
            code: "error",
            message: "Vui lòng gửi kèm theo token!"
        });
        return;
    }
    const user = yield user_model_1.User.findOne({
        token: token,
        deleted: false
    }).select("id fullName email");
    if (!user) {
        res.json({
            code: "error",
            message: "Token không hợp lệ!"
        });
        return;
    }
    res.json({
        code: "success",
        message: "Thành công!",
        data: user
    });
});
exports.profile = profile;

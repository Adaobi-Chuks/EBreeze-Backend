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
const user_models_1 = __importDefault(require("../models/user.models"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.SECRET;
class UserService {
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdUser = yield user_models_1.default.create(user);
            return yield user_models_1.default.findOne({ _id: createdUser.id }, "-__v -password");
        });
    }
    findOne(param) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_models_1.default.findOne(param, "-__v");
        });
    }
    generateAuthToken(user) {
        return jsonwebtoken_1.default.sign({
            id: user.id,
            email: user.email
        }, secret, {
            expiresIn: (3 * 24 * 60 * 60)
        });
    }
}
exports.default = UserService;

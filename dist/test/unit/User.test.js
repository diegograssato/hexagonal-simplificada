"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../src/domain/entity/User"));
test("Não deve criar um usuario", function () {
    expect(() => new User_1.default("aaaa", "aaaa", undefined)).toThrow(new Error("Invalid email"));
});
//# sourceMappingURL=User.test.js.map
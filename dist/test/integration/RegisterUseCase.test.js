"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RegisterUseCase_1 = __importDefault(require("../../src/application/usecase/RegisterUseCase"));
const UserMemory_1 = __importDefault(require("../../src/infra/repository/UserMemory"));
const RegisterUserHttpCryptoFactory_1 = __importDefault(require("../../src/infra/factory/RegisterUserHttpCryptoFactory"));
describe('Register User UseCase', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });
    it('deve registrar usuário', async () => {
        const registerUserFactory = new RegisterUserHttpCryptoFactory_1.default();
        const useCase = new RegisterUseCase_1.default(registerUserFactory);
        const user = { "id": "adsdasdss", "name": "Diego", "email": "diego.grassato@gmail.com", "password": "grassato" };
        const spy = jest.spyOn(UserMemory_1.default.prototype, 'add');
        await useCase.execute(user);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toBeCalled();
    });
});
//# sourceMappingURL=RegisterUseCase.test.js.map
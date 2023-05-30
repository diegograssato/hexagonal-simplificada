"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RegisterUser {
    constructor(factory) {
        this.factory = factory;
        this.cryptoProvider = factory.createCryptoProvider();
        this.gateway = factory.createUserGateway();
        this.repository = factory.createUserRepository();
        this.logger = factory.getLogger("RegisterUser");
    }
    async execute(user) {
        const passwordCripto = await this.cryptoProvider.crypt(user.password);
        const data = await this.gateway.getData();
        this.logger.info("Dentro do useCase", "asdasda");
        const userTosave = Object.assign(Object.assign({}, user), { id: data.uuid, password: passwordCripto });
        await this.repository.add(userTosave);
    }
}
exports.default = RegisterUser;
//# sourceMappingURL=RegisterUseCase.js.map
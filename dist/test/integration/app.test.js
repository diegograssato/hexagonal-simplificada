"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../../src/app"));
const supertest_1 = __importDefault(require("supertest"));
describe('Integration test', () => {
    const app = app_1.default.app;
    let server;
    beforeEach(async () => {
        server = await app_1.default.listen(9090);
    });
    afterEach(async () => {
        jest.restoreAllMocks();
        await server.close();
    });
    test("Deve testar o POST via controller /", async function () {
        const body = { id: "", name: "Diego", email: "diego.grassato@gmail.com", password: "grassato" };
        await (0, supertest_1.default)(app)
            .post('/')
            .send(body)
            .expect(200)
            .expect(response => {
            expect(response.body.data.email).toEqual(body.email);
        });
    });
    test("Deve testar o POST via controller /", async function () {
        await (0, supertest_1.default)(app)
            .get('/')
            .expect(200)
            .expect(response => {
            expect(response.body.data).toEqual("Diego");
        });
    });
});
//# sourceMappingURL=app.test.js.map
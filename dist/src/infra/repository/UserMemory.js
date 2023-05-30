"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserMemory {
    async add(user) {
        UserMemory.users.push(user);
    }
    findByEmail(email) {
        return UserMemory.users.find(user => user.email === email);
    }
}
UserMemory.users = [];
exports.default = UserMemory;
//# sourceMappingURL=UserMemory.js.map
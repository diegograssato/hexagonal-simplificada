"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
        if (email == undefined)
            throw new Error("Invalid email");
    }
}
exports.default = User;

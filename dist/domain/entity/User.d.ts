export default class User {
    readonly id: string;
    readonly name: string;
    readonly email: string;
    password?: string;
    constructor(id: string, name: string, email: string);
}

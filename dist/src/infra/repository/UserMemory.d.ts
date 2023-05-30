import User from "../../domain/entity/User";
import UserCollection from "../../application/repository/UserCollection";
export default class UserMemory implements UserCollection {
    static readonly users: User[];
    add(user: User): Promise<void>;
    findByEmail(email: string): User | null;
}

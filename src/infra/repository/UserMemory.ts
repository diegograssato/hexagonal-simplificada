import User from "../../domain/entity/User";
import UserCollection from "../../application/repository/UserCollection";


export default class UserMemory implements UserCollection {

  static readonly users: User[] = []


  async add (user: User): Promise<void> {

    UserMemory.users.push(user);

  }

  findByEmail(email:  string): User | null {
 
    return UserMemory.users.find(user => user.email === email)

  }

}
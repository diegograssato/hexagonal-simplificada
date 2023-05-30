import User from "../../domain/entity/User";


export default interface UserCollection {
 
  add(user: User): Promise<void>

  findByEmail(email: string): User | null 

}
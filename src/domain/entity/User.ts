export default class User {
 
  password?: string

  constructor(readonly id: string, readonly name: string, readonly email: string) {
    if (email == undefined) throw new Error("Invalid email");
  }
}
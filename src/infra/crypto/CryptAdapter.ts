import CryptoProvider from "./CryptoProvider";
import * as bcrypt from "bcrypt";

export default class CryptAdapter implements CryptoProvider {
  async crypt(password: string): Promise<string> {
    
    return bcrypt.hash(password, 10);

  }
  async decrypt(password: string, cryptPassword: string): Promise<boolean> {
    return bcrypt.compare(password, cryptPassword);
  }

}
import CryptoProvider from "./CryptoProvider";
export default class CryptAdapter implements CryptoProvider {
    crypt(password: string): Promise<string>;
    decrypt(password: string, cryptPassword: string): Promise<boolean>;
}

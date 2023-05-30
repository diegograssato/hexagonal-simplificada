export default interface CryptoProvider {
    crypt(password: string): Promise<string>;
    decrypt(password: string, cryptPassword: string): Promise<boolean>;
}

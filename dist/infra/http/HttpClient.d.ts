export default interface HttpClient {
    get(url: string): Promise<object>;
    post(url: string, body: object): Promise<object>;
}

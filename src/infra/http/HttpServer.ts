

export default interface HttpServer {
  app?: object;
  register(method: string, url: string, callback: Function): Promise<void>;
  listen(port: number): Promise<void>;
  handlers(): void
  
}
export default interface UserGateway {
  getData(): Promise<object>;
}
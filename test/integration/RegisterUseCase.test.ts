import RegisterUser from "../../src/application/usecase/RegisterUseCase";
import UserRepoMemory from "../../src/infra/repository/UserMemory"; 
import RegisterUserFactory from "../../src/application/factory/RegisterUserFactory";
import RegisterUserHttpCryptoFactory from "../../src/infra/factory/RegisterUserHttpCryptoFactory";
describe('Register User UseCase', () => {

 
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('deve registrar usuário', async () => {
     
    const registerUserFactory: RegisterUserFactory = new RegisterUserHttpCryptoFactory();

    const useCase = new RegisterUser(registerUserFactory);

    const user = { "id": "adsdasdss", "name": "Diego", "email": "diego.grassato@gmail.com", "password": "grassato" };

    
    const spy = jest.spyOn(UserRepoMemory.prototype, 'add');

    await useCase.execute(user); 
    
 
    expect(spy).toHaveBeenCalledTimes(1);
  
    expect(spy).toBeCalled();


  })
  
})
// @typescript-eslint/no-unused-vars
import { Server } from "http";
import httpServer from "../../src/app";
import request from 'supertest';

describe('Integration test', () => {
  
  const app = httpServer.app; 
  let server: Server
  
  beforeEach( async () => {
    
    server = await httpServer.listen(9090);

  })

  afterEach(async  () => {
    jest.restoreAllMocks();
    await server.close();
  })
 
  test("Deve testar o POST via controller /", async function () {
    
    const body = { id: "", name: "Diego", email: "diego.grassato@gmail.com", password: "grassato" };
  
    await request(app)
      .post('/')
      .send(body)
       .expect(200)
      .expect(response => { 
        expect(response.body.data.email).toEqual(body.email);
      });
  });

  test("Deve testar o POST via controller /", async function () { 

    await request(app)
      .get('/') 
      .expect(200)
      .expect(response => {         
        expect(response.body.data).toEqual("Diego");
      });

  });

  
})



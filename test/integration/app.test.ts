// @typescript-eslint/no-unused-vars
import { Server } from "http";
import httpServer from "../../src/app";
import supertest from 'supertest';

describe('Integration test', () => {
  
  let server: Server;
  const request = supertest(httpServer.app);


  afterEach(async  () => {
    jest.restoreAllMocks();
       await server?.close();
  })
 
  test("Deve testar o POST via controller /", async function () {
    
    const body = { id: "", name: "Diego", email: "diego.grassato@gmail.com", password: "grassato" };
  
    await request
      .post('/')
      .send(body)
      .expect(200)
      .expect(response => { 
        expect(response.body.data.email).toEqual(body.email);
      });
  });

  test("Deve testar o GET via controller /", async function () { 

    await request
      .get('/') 
      .expect(200)
      .expect(response => {         
        expect(response.body.data).toEqual("Diego");
      });

  });

  
})



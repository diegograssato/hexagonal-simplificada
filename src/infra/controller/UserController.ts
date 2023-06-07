 
import UseCase from "src/application/usecase/shared/UseCase";
import HttpServer from "../http/HttpServer"; 
import { Logger } from "log4js"; 
import NodeCache from "../cache/NodeCache";

export default class UserController {

   
  constructor(
    readonly httpServer: HttpServer,
    readonly useCaseRegister: UseCase<any, any>,
    readonly logger: Logger
  ) {
    
    
    /**
    * @openapi
    * definitions:
    *   Login:
    *     required:
    *       - username
    *       - password
    *     properties:
    *       username:
    *         type: string
    *       password:
    *         type: string
    *       path:
    *         type: string
    */

    /**
     * @openapi
     * tags:
     *   name: Users
     *   description: User management and login
     */

    /**
     * @openapi
     * tags:
     *   - name: Login
     *     description: Login
     *   - name: Accounts
     *     description: Accounts
     */

    /**
     * @openapi
     * /:
     *   post:
     *     description: Login to the application
     *     tags: [Users, Login]
     *     produces:
     *       - application/json
     *     parameters:
     *       - $ref: '#/parameters/username'
     *       - name: password
     *         description: User's password.
     *         in: formData
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: login
     *         schema:
     *           type: object
     *           $ref: '#/definitions/Login'
     */
    httpServer.register("post", "/", async function (_params: object, body: object) {
      console.log(body)
      await useCaseRegister.execute(body);
      logger.info("Acessando via POST ")
      
      return { email: "diego.grassato@gmail.com", password: "grassato" }

    });

    /**
    * @openapi
    * /:
    *   get:
    *     description: Returns the homepage
    *     tags:
    *      - Users
    *     responses:
    *       200:
    *         description: hello world
    */
    httpServer.register("get", "/", async function (params: object) {

      const data = { email: "diego.grassato@gmail.com", password: "grassato" };
      await useCaseRegister.execute(data);
      logger.debug("Acessando via GET", params)
      
      return "Diego"

    });

  }

  
}
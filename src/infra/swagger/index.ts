import swaggerJSDoc from 'swagger-jsdoc' 

/**
 * Swagger Setup
 */
export function getSwaggerJSDoc(): object {
  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Documentação para o projeto NodeJs',
        version: '1.0.0',
        description: 'Esse projeto tem o objetivo de servir como backend para os sistemas criados nas necessidades existentes de reestruturação',
        contact: {
          name: 'Reestruturação',
          url: '',
          email: ''
        }
      },
      servers: [
        {
          url: 'http://localhost:3333',
          description: 'Ambiente local'
        },
        {
          url: 'http://10.22.0.20:8081',
          description: 'Remote'
        }
      ]
    },
    //apis: [`${__dirname}/src/infra/controller/*.ts`, `${__dirname}/parameters.yaml`],
    apis: ['./src/infra/controller/*.ts', '../../parameters.yaml']
  }

  // initialize swagger-jsdoc
  return swaggerJSDoc(options)
}

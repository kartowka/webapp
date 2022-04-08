import swaggerJsDoc from 'swagger-jsdoc'

const swaggerConnection = (env: string, port: string) => {
  if (env == 'development') {
    const options = {
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'Library API',
          version: '1.0.0',
          description: 'A simple Express Library API',
        },
        servers: [{ url: 'http://localhost:' + port }],
      },
      apis: ['./src/routes/*.ts'],
    }
    return swaggerJsDoc(options)
  }
}
export default swaggerConnection

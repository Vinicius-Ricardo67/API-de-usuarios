const swaggerJSDoc = require("swagger-jsdoc");
const path = require("path");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API de Usuários",
    version: "1.0.0",
    description: "Documentação da API de usuários com Swagger",
  },
  servers: [
    {
      url: "http://localhost:3333",
      description: "Servidor de desenvolvimento",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: [path.resolve(__dirname, "../swagger-docs/*.yaml")],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
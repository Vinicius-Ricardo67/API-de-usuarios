const { version } = require("joi");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API de usuários",
            version: "1.0.0",
            description: "Documentação da API de usuários",
        },
    },
    apis: ["./src/routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(options);

module.exports = swaggerDocs;
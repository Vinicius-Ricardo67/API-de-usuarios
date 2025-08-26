const express = require("express");
const usersRoutes = require('./src/routes/users')
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./src/swagger/swagger");

const app = express();
app.use(express.json());

app.use("/users.json", usersRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(3333, () => {
    console.log("Api rodando no https://localhost:3333");
    console.log("Swagger UI: https://localhost:3333/api-docs");
});
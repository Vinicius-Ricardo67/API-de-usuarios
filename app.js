const express = require("express");
const usersRoutes = require('./src/routes/users');
const swaggerUi = require("swagger-ui-express");
const YAML = require('yamljs');

// 🔧 Carrega o arquivo swagger.yaml corretamente
const swaggerDocs = YAML.load('./users.yaml');

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API de usuários funcionando!");
});

app.use("/users.json", usersRoutes);

// ✅ Configura Swagger com o conteúdo YAML carregado
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(3333, () => {
    console.log("Api rodando no http://localhost:3333");
    console.log("Swagger UI: http://localhost:3333/api-docs");
});

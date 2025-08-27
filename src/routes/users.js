const express = require("express");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { userSchema } = require("../schemas/userSchemas.js");
const { errorMonitor } = require("events");

const router = express.Router();
const filePath = "./data/users.json";

function getUsers() {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function saveUsers(users) {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}

/**
 * @swagger
 * /users:
 * get:
 * summary: Retorna a lista de todos os usuários
 * tags:
 * - Usuários
 * responses:
 * 200:
 * description: Uma lista de usuários.
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * type: object
 * properties:
 * id:
 * type: string
 * description: O ID do usuário.
 * nome:
 * type: string
 * description: O nome do usuário.
 * sobrenome:
 * type: string
 * description: O sobrenome do usuário.
 * idade:
 * type: integer
 * description: A idade do usuário.
 * profissao:
 * type: string
 * description: A profissão do usuário.
 * cidade:
 * type: string
 * description: A cidade do usuário.
 * estado:
 * type: string
 * description: O estado do usuário.
 */
router.get("/", (req, res) => {
    const users = getUsers();
    res.json(users);
});

/**
 * @swagger
 * /users:
 * post:
 * summary: Adiciona um novo usuário
 * tags:
 * - Usuários
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * nome:
 * type: string
 * sobrenome:
 * type: string
 * idade:
 * type: integer
 * profissao:
 * type: string
 * cidade:
 * type: string
 * estado:
 * type: string
 * responses:
 * 201:
 * description: O usuário foi criado com sucesso.
 * 400:
 * description: Dados de entrada inválidos.
 */
router.post("/", (req, res) => {
    const { error } = userSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const users = getUsers();
    const newUser = { id: uuidv4(), ...req.body };
    users.push(newUser);
    saveUsers(users);

    res.status(201).json(newUser);
});

/**
 * @swagger
 * /users/{id}:
 * put:
 * summary: Atualiza um usuário existente pelo ID
 * tags:
 * - Usuários
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * description: O ID do usuário a ser atualizado.
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * nome:
 * type: string
 * sobrenome:
 * type: string
 * idade:
 * type: integer
 * profissao:
 * type: string
 * cidade:
 * type: string
 * estado:
 * type: string
 * responses:
 * 200:
 * description: O usuário foi atualizado com sucesso.
 * 400:
 * description: Dados de entrada inválidos.
 * 404:
 * description: Usuário não encontrado.
 */
router.put("/:id", (req, res) => {
    const { error } = userSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const users = getUsers();
    const index = users.findIndex((u) => u.id === req.params.id);

    if (index === -1) return res.status(404).json({ error: "Usuário não encontrado" });

    users[index] = { id: req.params.id, ...req.body };
    saveUsers(users);

    res.json(users[index]);
});

/**
 * @swagger
 * /users/{id}:
 * delete:
 * summary: Deleta um usuário pelo ID
 * tags:
 * - Usuários
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * description: O ID do usuário a ser deletado.
 * responses:
 * 204:
 * description: O usuário foi deletado com sucesso.
 * 404:
 * description: Usuário não encontrado.
 */
router.delete("/:id", (req, res) => {
    let users = getUsers();
    const filtered = users.filter((u) => u.id !== req.params.id);

    if (users.length === filtered.length) {
        return res.status(404).json({ error: "Usuário não encontrado" });
    }

    saveUsers(filtered);
    res.status(204).send();
});

module.exports = router;
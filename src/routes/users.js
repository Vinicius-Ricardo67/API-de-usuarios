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

router.get("/", (req, res) => {
    const users = getUsers();
    res.json(users);
});

router.post("/", (req, res) => {
    const { error } = userSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const users = getUsers();
    const newUser = {id: uuidv4(), ...req.body};
    users.push(newUser);
    saveUsers(users);

    res.status(201).json(newUser);
});

router.put("/:id", (req, res) => {
    const { error } = userSchema.validate(req.body);
    if ( error ) return res.status(400).json({ error: error.details[0].message });

    const users = getUsers();
    const index = users.findIndex((u) => u.id === req.params.id);

    if (index === -1) return res.status(404).json({ error: "Usuário não encontrado" });

    users[index] = { id: req.params.id, ...req.body };
    saveUsers(users);

    res.json(users[index]);
});

router.delete("/:id", (req, res) => {
    let users = getUsers();
    const filtered = users.filter((u) => u.id !== req.params.id);

    if (users.length = filtered.length)
        return res.status(404).json({ error: "Usuários não encontrado" });

    saveUsers(filtered);
    res.status(204).send();
});

module.exports = router;
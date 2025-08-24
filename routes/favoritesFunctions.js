const express = require('express');
const router = express.Router();
const db = require('../db configs/favoritesDb');

router.post('/addToFavorites', (req, res) => {
    const { serviceName, password, passwordId, username, login } = req.body;

    const stmt = db.prepare('INSERT INTO favorites (serviceName, password, passwordId, username, login) VALUES (?, ?, ?, ?, ?)');

    try {
        stmt.run(serviceName, password, passwordId, username, login);
        console.log("Пароль добавлен в базу данных");
        res.json({ marker: "true", message: "success" });
    } catch (error) {
        console.log(error);
        res.json({ marker: "false", message: "ошибка" });
    }
});

router.post('/deleteFromFavorites', (req, res) => {
    const { passwordId } = req.body;

    const stmt = db.prepare('DELETE FROM favorites WHERE passwordId = ?');

    try {
        stmt.run(passwordId);
        console.log("Пароль удалён из базы данных");
        res.json({ marker: "true", message: "успешно удалено" });
    } catch (error) {
        console.log(error);
        res.json({ marker: "false", message: "ошибка" });
    }
});

router.post('/getFavorites', (req, res) => {
    const { username } = req.body;
    console.log(username);

    try {
        const rows = db.prepare("SELECT login, serviceName, password, passwordId FROM favorites WHERE username = ?").all(username);
        console.log(rows);
        res.json({ marker: "true", favorites: rows });
    } catch (error) {
        console.log(error);
        res.json({ marker: "false" });
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const db = require('../db configs/passwordsDb');

router.post('/createPassword', (req, res) => {
    const { serviceName, password, id, username, login } = req.body;
    console.log(serviceName, password, id, username);

    const stmt = db.prepare('INSERT INTO passwords (serviceName, password, passwordId, username, login) VALUES (?, ?, ?, ?, ?)');

    try {
        stmt.run(serviceName, password, id, username, login);
        console.log("Пароль добавлен в базу данных");
        res.json({ marker: "true", message: "успешно добавлено" });
    } catch (error) {
        console.log(error);
        res.json({ marker: "false", message: "ошибка" });
    }
});

router.post('/getPasswords', (req, res) => {
    const { username } = req.body;
    console.log(username);

    try {
        const rows = db.prepare("SELECT login, serviceName, password, passwordId FROM passwords WHERE username = ?").all(username);
        res.json({ marker: "true", passwords: rows });
    } catch (error) {
        console.log(error);
        res.json({ marker: "false" });
    }
});

router.post('/deletePassword', (req, res) => {
    const { passwordId } = req.body;

    const stmt = db.prepare('DELETE FROM passwords WHERE passwordId = ?');

    try {
        stmt.run(passwordId);
        console.log("Пароль удалён из базы данных");
        res.json({ marker: "true", message: "успешно удалено" });
    } catch (error) {
        console.log(error);
        res.json({ marker: "false", message: "ошибка" });
    }
});

router.post('/changePassword', (req, res) => {
    const { passwordId, newPassword } = req.body;

    const stmt = db.prepare('UPDATE passwords SET password = ? WHERE passwordId = ?');

    try {
        stmt.run(newPassword, passwordId);
        res.json({ marker: "true" });
    } catch (error) {
        console.log(error);
        res.json({ marker: "false", message: "ошибка" });
    }
});

router.post('/changeLogin', (req, res) => {
    const { passwordId, newLogin } = req.body;

    const stmt = db.prepare('UPDATE passwords SET login = ? WHERE passwordId = ?');

    try {
        stmt.run(newLogin, passwordId);
        console.log("Логин обновлён");
        res.json({ marker: "true", message: "успешно обновлено" });
    } catch (error) {
        console.log(error);
        res.json({ marker: "false", message: "ошибка" });
    }
});

module.exports = router;

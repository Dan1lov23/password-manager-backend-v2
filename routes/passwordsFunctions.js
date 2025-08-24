const express = require('express');

const router = express.Router();

const db = require('../db configs/passwordsDb');

router.post('/createPassword', async (req, res) => {

    const { serviceName, password, id, username, login} = req.body;
    console.log(serviceName, password, id, username);
    console.log(`Начался процесс регистрации пользователя`);

    const stmt = db.prepare('INSERT INTO passwords (serviceName, password, passwordId, username, login) VALUES (?, ?, ?, ?, ?)');

    stmt.run(serviceName, password, id, username, login, function(err) {
        if (err) {
            console.log(err);
            res.json({marker: "false", message: "ошибка"});
        } else {
            console.log("Пароль добавлен в базу данных");
            res.json({marker: "false", message: "ошибка"});
        }
    });
});

router.post('/getPasswords', (req, res) => {
    const {username} = req.body;
    console.log(username);
    try {
        db.all("SELECT login, serviceName, password, passwordId FROM passwords WHERE username = ?", [username], (err, rows) => {
            if (err) {
                console.log(err);
                res.json({marker: "false"});
            } else {
                res.json({marker: "true", passwords: rows});
            }
        });
    } catch (error) {
        console.log(error);
    }
})

router.post('/deletePassword', (req, res) => {

    const {passwordId} = req.body;

    const stmt = db.prepare('DELETE FROM passwords WHERE passwordId = ?');

    try {
        stmt.run(passwordId, function(err) {
            if (err) {
                console.log(err);
                res.json({marker: "false", message: "ошибка"});
            } else {
                console.log("Пароль удадён из базы данных");
                res.json({marker: "true", message: "ошибка"});
            }
        });
    } catch (error) {
        console.log(error);
    }
})

router.post('/changePassword', (req, res) => {

    const {passwordId, newPassword, username} = req.body;

    console.log(passwordId, newPassword, username);

    const stmt = db.prepare('UPDATE passwords SET password = ? WHERE passwordId = ?');

    try {
        stmt.run(newPassword, passwordId, function(err) {
            if (err) {
                console.log(err);
                res.json({marker: "false", message: "ошибка"});
            } else {
                res.json({marker: "true"})
            }
        });
    } catch (error) {
        console.log(error);
    }
})

router.post('/changeLogin', (req, res) => {

    const {passwordId, newLogin} = req.body;

    console.log(passwordId, newLogin);

    const stmt = db.prepare('UPDATE passwords SET login = ? WHERE passwordId = ?');

    try {
        stmt.run(newLogin, passwordId, function(err) {
            if (err) {
                console.log(err);
                res.json({marker: "false", message: "ошибка"});
            } else {
                console.log("Логин обновлён пароль");
                res.json({marker: "true", message: "ошибка"});
            }
        });
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;

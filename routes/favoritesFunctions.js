const express = require('express');

const router = express.Router();

const db = require('../db configs/favoritesDb');

router.post('/addToFavorites', (req, res) => {

    const { serviceName, password, passwordId, username, login} = req.body;

    const stmt = db.prepare('INSERT INTO favorites (serviceName, password, passwordId, username, login) VALUES (?, ?, ?, ?, ?)');

    try {
        stmt.run(serviceName, password, passwordId, username, login, function(err) {
            if (err) {
                console.log(err);
                res.json({marker: "false", message: "ошибка"});
            } else {
                console.log("Пароль добавлен в базу данных");
                res.json({marker: "true", message: "success"});
            }
        });
    } catch (error) {
        console.log(error);
    }
})

router.post('/deleteFromFavorites', (req, res) => {

    const {passwordId} = req.body;

    const stmt = db.prepare('DELETE FROM favorites WHERE passwordId = ?');

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

router.post('/getFavorites', (req, res) => {
    const {username} = req.body;
    console.log(username);
    try {
        db.all("SELECT login, serviceName, password, passwordId FROM favorites WHERE username = ?", [username], (err, rows) => {
            if (err) {
                console.log(err);
                res.json({marker: "false"});
            } else {
                console.log(rows);
                res.json({marker: "true", favorites: rows});
            }
        });
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;

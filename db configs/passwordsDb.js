const sqlite3 = require('sqlite3').verbose();

const passwordsDb = new sqlite3.Database('../databases/passwords', (err) => {
    if (err) {
        console.error('Ошибка открытия базы данных ' + err.message);
    } else {
        console.log('Подключение к базе данных паролей успешно установлено.');
    }
});

passwordsDb.serialize(() => {
    passwordsDb.run(`CREATE TABLE IF NOT EXISTS passwords (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        serviceName TEXT,
        login TEXT,
        password TEXT,
        passwordId TEXT,
        username TEXT
    )`);
});

module.exports = passwordsDb;

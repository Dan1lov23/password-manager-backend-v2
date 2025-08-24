const sqlite3 = require('sqlite3').verbose();

const usersDb = new sqlite3.Database('../databases/users.db', (err) => {
    if (err) {
        console.error('Ошибка открытия базы данных ' + err.message);
    } else {
        console.log('Подключение к базе данных пользователей успешно установлено.');
    }
});

usersDb.serialize(() => {
    usersDb.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT,
        userRole TEXT
    )`);
});


module.exports = usersDb;

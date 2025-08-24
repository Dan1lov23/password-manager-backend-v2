const sqlite3 = require('sqlite3').verbose();

const favoritesDb = new sqlite3.Database('../databases/favorites', (err) => {
    if (err) {
        console.error('Ошибка открытия базы данных ' + err.message);
    } else {
        console.log('Подключение к базе данных паролей успешно установлено.');
    }
});

favoritesDb.serialize(() => {
    favoritesDb.run(`CREATE TABLE IF NOT EXISTS favorites (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        serviceName TEXT,
        login TEXT,
        password TEXT,
        passwordId TEXT,
        username TEXT
    )`);
});

module.exports = favoritesDb;

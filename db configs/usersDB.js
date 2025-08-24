const Database = require('better-sqlite3');

// Создание или открытие базы данных
const usersDb = new Database('../databases/users.db', { verbose: console.log });

try {
    // Создание таблицы, если она не существует
    usersDb.exec(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT,
        userRole TEXT
    )`);
    console.log('Подключение к базе данных пользователей успешно установлено.');
} catch (err) {
    console.error('Ошибка открытия базы данных: ' + err.message);
}

// Экспорт базы данных для использования в других модулях
module.exports = usersDb;

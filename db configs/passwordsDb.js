const Database = require('better-sqlite3');

// Создание или открытие базы данных
const passwordsDb = new Database('../databases/passwords.db', { verbose: console.log });

try {
    // Создание таблицы, если она не существует
    passwordsDb.exec(`CREATE TABLE IF NOT EXISTS passwords (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        serviceName TEXT,
        login TEXT,
        password TEXT,
        passwordId TEXT,
        username TEXT
    )`);
    console.log('Подключение к базе данных паролей успешно установлено.');
} catch (err) {
    console.error('Ошибка открытия базы данных: ' + err.message);
}

// Экспорт базы данных для использования в других модулях
module.exports = passwordsDb;

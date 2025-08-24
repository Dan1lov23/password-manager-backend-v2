const express = require('express');
const cors = require('cors');
const app = express();

const authRouter = require('../routes/auth');
const passwordsFunctionsRouter = require('../routes/passwordsFunctions');
const favoritesFunctionsRouter = require('../routes/favoritesFunctions');

app.use(express.json());
app.use(cors());

app.use('/auth', authRouter);
app.use('/passwordsFunctions', passwordsFunctionsRouter);
app.use('/favoritesFunctions', favoritesFunctionsRouter);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});

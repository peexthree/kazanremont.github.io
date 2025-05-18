const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const filePath = './BASA.txt';

app.post('/submit', (req, res) => {
    const { name, phone, service } = req.body;
    const entry = `${new Date().toLocaleString()} | Имя: ${name} | Телефон: ${phone} | Услуга: ${service}\n`;
    fs.appendFileSync(filePath, entry);
    res.sendStatus(200);
});

app.get('/get-leads', (req, res) => {
    if (!fs.existsSync(filePath)) return res.send('Файл ещё не создан.');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Ошибка чтения файла.');
        res.setHeader('Content-Type', 'text/plain');
        res.send(data);
    });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
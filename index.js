const express = require('express');

const PORT = 3000;
const HOST = 'localhost';

const app = express();

app.get('/', (req, res) => {
    res.send("Hello World!!!\nGood");
});

app.listen(PORT, () => console.log("Servidor no Ar!"));

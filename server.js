// Lab DevCoreAI4 - Force Module Detection
const axios = require('axios'); 
const express = require('express');
const { ttdl } = require('btch-downloader');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', { result: null, error: null });
});

app.post('/download', async (req, res) => {
    const { url } = req.body;
    if (!url) return res.render('index', { result: null, error: "Masukkan URL!" });

    try {
        const data = await ttdl(url);
        res.render('index', { result: data, error: null });
    } catch (err) {
        res.render('index', { result: null, error: "Gagal: " + err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`System Active on Port ${PORT}`);
});

module.exports = app;

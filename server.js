// Lab DevCoreAI4 - Force Module Injection
require('axios');
require('cheerio');
require('form-data');
require('qs');

const express = require('express');
const { ttdl } = require('btch-downloader');
const path = require('path');
const app = express();

// Konfigurasi
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.render('index', { result: null, error: null });
});

app.post('/download', async (req, res) => {
    const { url } = req.body;
    if (!url) return res.render('index', { result: null, error: "Link Kosong!" });

    try {
        const data = await ttdl(url);
        // Debugging log untuk tuan di dashboard vercel
        console.log("Data diterima:", JSON.stringify(data));
        
        if (data && (data.video || data.result)) {
            res.render('index', { result: data, error: null });
        } else {
            throw new Error("Format data tidak dikenal oleh DevCoreAI4");
        }
    } catch (err) {
        console.error("Error Log:", err.message);
        res.render('index', { result: null, error: "Gagal: " + err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`System Online | DevCoreAI4`);
});

module.exports = app;

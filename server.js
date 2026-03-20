const express = require('express');
const { ttdl } = require('btch-downloader');
const path = require('path');
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Main Route
app.get('/', (req, res) => {
    res.render('index', { result: null, error: null });
});

// Download API Route
app.post('/download', async (req, res) => {
    const { url } = req.body;
    if (!url) return res.render('index', { result: null, error: "Masukkan URL TikTok!" });

    try {
        const data = await ttdl(url);
        // data biasanya berisi { video: [link], title: "...", author: "..." }
        res.render('index', { result: data, error: null });
    } catch (err) {
        console.error(err);
        res.render('index', { result: null, error: "Gagal mengambil data. Pastikan URL benar." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Lab DevCoreAI4 Aktif di port ${PORT}`);
});

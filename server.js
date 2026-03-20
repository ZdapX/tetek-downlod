const express = require('express');
const { ttdl } = require('btch-downloader');
const path = require('path');
const app = express();

// Konfigurasi View Engine & Static Files
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Main Route
app.get('/', (req, res) => {
    res.render('index', { result: null, error: null });
});

// Download API Route dengan Error Handling Lab DevCoreAI4
app.post('/download', async (req, res) => {
    const { url } = req.body;
    
    if (!url || !url.includes('tiktok.com')) {
        return res.render('index', { 
            result: null, 
            error: "Lab DevCoreAI4 mendeteksi URL tidak valid. Masukkan link TikTok!" 
        });
    }

    try {
        const data = await ttdl(url);
        
        // Memastikan data hasil scraping valid sebelum dikirim ke frontend
        if (data && (data.video || data.result)) {
            res.render('index', { result: data, error: null });
        } else {
            throw new Error("Data tidak ditemukan");
        }
    } catch (err) {
        console.error("Critical Error pada Server:", err.message);
        res.render('index', { 
            result: null, 
            error: "Gagal mengambil video. TikTok mungkin sedang memblokir request atau link salah." 
        });
    }
});

// Port listener untuk Vercel/Local
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Lab DevCoreAI4 Online di Port ${PORT}`);
});

module.exports = app;

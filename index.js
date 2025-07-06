const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <title>استخراج الصور من صفحة</title>
      <style>
        body { font-family: Arial; padding: 40px; text-align: center; background: #f0f0f0; }
        input[type=text] { width: 80%; padding: 10px; font-size: 16px; margin: 20px 0; }
        input[type=submit] { padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer; }
      </style>
    </head>
    <body>
      <h2>📸 أدخل رابط الصفحة</h2>
      <form method="POST" action="/extract">
        <input type="text" name="url" placeholder="https://example.com" required>
        <br>
        <input type="submit" value="استخراج الصور">
      </form>
    </body>
    </html>
  `);
});

app.post('/extract', async (req, res) => {
  const targetUrl = req.body.url;
  if (!targetUrl) return res.send("❌ لم يتم تقديم رابط.");

  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.goto(targetUrl, { waitUntil: 'networkidle2', timeout: 0 });

    const images = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('img')).map(img => img.src || img.getAttribute('data-src'));
    });

    await browser.close();

    res.send(`
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <title>نتائج الصور</title>
        <style>
          body { font-family: Arial; padding: 20px; background: #fff; }
          .img-box { margin: 10px 0; }
          img { max-width: 200px; display: block; margin-bottom: 5px; border: 1px solid #ccc; border-radius: 6px; }
          a { color: #007bff; word-break: break-all; }
        </style>
      </head>
      <body>
        <h2>تم العثور على ${images.length} صورة</h2>
        ${images.map(src => `
          <div class="img-box">
            <img src="${src}" alt="">
            <a href="${src}" target="_blank">${src}</a>
          </div>
        `).join('')}
        <hr>
        <a href="/">🔙 الرجوع</a>
      </body>
      </html>
    `);
  } catch (err) {
    res.send("❌ خطأ أثناء المعالجة: " + err.message);
  }
});

app.listen(PORT, () => {
  console.log(`⚡ التطبيق يعمل على http://localhost:${PORT}`);
});

const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) return res.send("يرجى تمرير الرابط عبر ?url=");

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

    res.json({ images });
  } catch (err) {
    res.status(500).send("حدث خطأ أثناء المعالجة: " + err.message);
  }
});

app.listen(PORT, () => console.log(`⚡ يعمل على http://localhost:${PORT}`));

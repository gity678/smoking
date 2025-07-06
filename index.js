const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    <h2>أدخل رابط صفحة الإنترنت لاستخراج روابط الصور (باستخدام Puppeteer)</h2>
    <form method="POST" action="/extract">
      <input type="url" name="url" placeholder="https://example.com" style="width:300px" required />
      <button type="submit">استخراج الصور</button>
    </form>
  `);
});

app.post('/extract', async (req, res) => {
  const url = req.body.url;
  if (!url) return res.send('الرجاء إدخال رابط صحيح');

  let browser;
  try {
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

    // استخراج روابط الصور من الصفحة بعد تحميلها بالكامل
    const images = await page.$$eval('img', imgs =>
      imgs.map(img => img.src).filter(src => src)
    );

    if (images.length === 0) {
      return res.send('لم يتم العثور على صور في الصفحة.');
    }

    const imagesList = images.map(img => `<li><a href="${img}" target="_blank">${img}</a></li>`).join('');
    res.send(`
      <h2>روابط الصور المستخرجة من ${url}</h2>
      <ul>${imagesList}</ul>
      <a href="/">عودة</a>
    `);

  } catch (error) {
    res.send('حدث خطأ أثناء جلب الصفحة: ' + error.message);
  } finally {
    if (browser) await browser.close();
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

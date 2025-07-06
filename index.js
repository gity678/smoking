const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    <h2>أدخل رابط صفحة الإنترنت لاستخراج روابط الصور</h2>
    <form method="POST" action="/extract">
      <input type="url" name="url" placeholder="https://example.com" style="width:300px" required />
      <button type="submit">استخراج الصور</button>
    </form>
  `);
});

app.post('/extract', async (req, res) => {
  const url = req.body.url;
  if (!url) return res.send('الرجاء إدخال رابط صحيح');

  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const images = [];
    $('img').each((i, el) => {
      let src = $(el).attr('src');
      if (src) {
        if (!src.startsWith('http')) {
          try {
            src = new URL(src, url).href;
          } catch {}
        }
        images.push(src);
      }
    });

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
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

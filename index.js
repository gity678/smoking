const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const PORT = process.env.PORT || 3000;

// مفتاح API مباشرة في الكود (تم إدخاله بناء على طلبك)
const API_KEY = "U7RY8HB4N6Z320ISLPA2RFKZBHVUD9FO8ALZ3DTSAPPJZLCKVX1H5J8KGURJM7UWQJ1TZ3VW1QXDPZLZ";

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    <h2>📸 استخراج روابط الصور من صفحة ويب باستخدام ScrapingBee</h2>
    <form method="POST" action="/extract">
      <input type="url" name="url" placeholder="https://example.com" style="width:300px" required />
      <button type="submit">استخراج</button>
    </form>
  `);
});

app.post('/extract', async (req, res) => {
  const pageUrl = req.body.url;
  if (!API_KEY) return res.send('❌ المفتاح SCRAPINGBEE_API_KEY غير موجود.');
  if (!pageUrl) return res.send('❌ الرجاء إدخال رابط.');

  try {
    const response = await axios.get('https://app.scrapingbee.com/api/v1', {
      params: {
        api_key: API_KEY,
        url: pageUrl,
        render_js: true
      }
    });

    const $ = cheerio.load(response.data);
    const images = [];

    $('img').each((_, el) => {
      let src = $(el).attr('src');
      if (src) {
        try {
          src = new URL(src, pageUrl).href;
          images.push(src);
        } catch {}
      }
    });

    if (images.length === 0) {
      return res.send('🚫 لم يتم العثور على صور.');
    }

    const resultList = images.map(src => `<li><a href="${src}" target="_blank">${src}</a></li>`).join('');
    res.send(`<h3>✅ الصور من ${pageUrl}</h3><ul>${resultList}</ul><a href="/">🔙 رجوع</a>`);

  } catch (error) {
    res.send('❌ خطأ أثناء تحميل الصفحة: ' + error.message);
  }
});

app.listen(PORT, () => {
  console.log(`🚀 يعمل على المنفذ ${PORT}`);
});

const puppeteer = require('puppeteer');

(async () => {
  const url = 'https://example.com'; // يمكن تعديل الرابط هنا
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });
  const images = await page.evaluate(() =>
    Array.from(document.querySelectorAll('img')).map(img => img.src || img.getAttribute('data-src'))
  );
  console.log('روابط الصور:');
  images.forEach(src => console.log(src));
  await browser.close();
})();

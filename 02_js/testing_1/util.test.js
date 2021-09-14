const puppeteer = require('puppeteer');
const { generateText, checkAndGenerate } = require('./util');

// test(description: string, handler, timeout)
test('should output name and age', () => {
  const text = generateText('Max', 29);
  expect(text).toBe('Max (29 years old)');
  const text2 = generateText('Anna', 27);
  expect(text2).toBe('Anna (27 years old)');
});

test('should output data-less text', () => {
  const text = generateText('', null);
  expect(text).toBe(' (null years old)');
});

test('should generate a valid text output', () => {
  const text = checkAndGenerate('Max', 29);
  expect(text).toBe('Max (29 years old)');
});

test('should create an element with text and correct class', async () => {
  const browser = await puppeteer.launch({
    // headless: false,
    // slowMo: 80,
    args: ['--window-size=1920,1080']
  });
  const page = await browser.newPage();
  await page.goto(
    'file://D:/_dev/_examples/misc/02_js/testing_1/index.html'
  );
  await page.click('input#name');
  await page.type('input#name', 'Max');
  await page.click('input#age');
  await page.type('input#age', '29');
  await page.click('button#btnAddUser');
  const finalText = await page.$eval('.user-item', el => el.textContent);
  expect(finalText).toBe('Max (29 years old)');
  await browser.close();
}, 10000);
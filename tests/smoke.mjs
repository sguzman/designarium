import assert from 'node:assert/strict';
import fs from 'node:fs';
import { chromium } from 'playwright';

const base = 'http://127.0.0.1:4173/';
const errors = [];
fs.mkdirSync('qa-artifacts', { recursive: true });
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => {
    if (response.url().startsWith(base) && response.status() >= 400) {
      errors.push(response.status() + ': ' + response.url());
    }
  });
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => document.querySelectorAll('.gallery-card').length === 6);
  assert.equal(await page.locator('.gallery-card').count(), 6, 'Six Ephemeris concepts must be visible');
  assert.match(await page.title(), /Designarium/);
  assert.equal(await page.locator('img[src*="ephemeris"]').count(), 7);
  for (const image of await page.locator('.gallery-card img').all()) {
    assert.equal(await image.evaluate(node => node.complete && node.naturalWidth > 0), true, 'All concept artworks must render');
  }
  await page.screenshot({ path: 'qa-artifacts/gallery-desktop.png', fullPage: true });

  await page.getByRole('button', { name: /Economics/ }).click();
  assert.equal(await page.locator('.gallery-card').count(), 1, 'Economics filter should narrow gallery');
  await page.getByRole('button', { name: /^All / }).click();
  await page.locator('#search').fill('diplomacy');
  assert.equal(await page.locator('.gallery-card').count(), 1, 'Diplomacy search should narrow gallery');
  await page.locator('#search').fill('');

  await page.locator('.gallery-card [data-open]').first().click();
  assert.equal(await page.locator('#lightbox').evaluate(node => node.open), true, 'Artwork must open in modal');
  assert.match(await page.locator('#viewer-title').innerText(), /Week in Focus/);
  await page.screenshot({ path: 'qa-artifacts/concept-viewer.png', fullPage: false });
  await page.locator('#next').click();
  assert.match(await page.locator('#viewer-title').innerText(), /Macro/);
  await page.locator('#close').click();
  assert.equal(await page.locator('#lightbox').evaluate(node => node.open), false);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: 'qa-artifacts/gallery-mobile.png', fullPage: true });
  assert.equal(await page.locator('.gallery-card').count(), 6);
  const horizontalOverflow = await page.evaluate(() =>
    document.documentElement.scrollWidth > window.innerWidth + 2
  );
  assert.equal(horizontalOverflow, false, 'Mobile gallery must not overflow horizontally');
  assert.deepEqual(errors, [], 'No browser exceptions or missing local resources');
  console.log('Designarium QA passed: images, tags, search, lightbox, keyboard surfaces, mobile overflow.');
} finally {
  await browser.close();
}

#!/usr/bin/env node
/**
 * Captures screenshots of a note page at different scroll positions.
 * Usage: node scripts/capture-note-page.mjs
 */

import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';

const URL = 'http://localhost:3000/notes/choose-your-own-adventure-slides';
const OUTPUT_DIR = '/Users/luis/Projects/studio-queral/public/notes/choose-your-own-adventure-slides';

const captures = [
  { name: '1-top', scrollY: 0, desc: 'Top of page (title + embedded slides)' },
  { name: '2-gameplay-image', scrollY: null, selector: 'img[src*="slide-gameplay"]', desc: 'First image (gameplay slide)' },
  { name: '3-ending-image', scrollY: null, selector: 'img[src*="slide-ending"]', desc: 'Ending slide screenshot' },
  { name: '4-bottom', scrollY: 'max', desc: 'Bottom of page' },
];

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  try {
    console.log('Navigating to', URL);
    await page.goto(URL, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(2000); // Let images load

    const body = await page.$('body');
    const html = await page.$('html');
    const totalHeight = await page.evaluate(() => document.documentElement.scrollHeight);

    for (const cap of captures) {
      console.log(`\nCapturing: ${cap.desc}`);

      if (cap.selector) {
        const el = await page.$(cap.selector);
        if (el) {
          await el.scrollIntoViewIfNeeded();
          await page.waitForTimeout(500);
        } else {
          console.warn(`  Element not found: ${cap.selector}`);
        }
      } else if (cap.scrollY === 'max') {
        await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
        await page.waitForTimeout(500);
      } else {
        await page.evaluate((y) => window.scrollTo(0, y), cap.scrollY);
        await page.waitForTimeout(500);
      }

      const path = `${OUTPUT_DIR}/page-${cap.name}.png`;
      await page.screenshot({ path });
      console.log(`  Saved: ${path}`);
    }

    console.log('\nAll captures complete.');
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

main();

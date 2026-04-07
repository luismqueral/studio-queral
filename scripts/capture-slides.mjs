#!/usr/bin/env node
/**
 * Captures screenshots from a Google Slides embed presentation.
 * Usage: node scripts/capture-slides.mjs
 */

import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';
import { dirname } from 'path';

const EMBED_URL = 'https://docs.google.com/presentation/d/1ZpMtaNmbJCsKe9euchYP3WgJxBC8-a9fdq4xE2cd8Ow/embed?start=false&loop=false&delayms=60000';
const OUTPUT_DIR = '/Users/luis/Projects/studio-queral/public/notes/choose-your-own-adventure-slides';

const screenshots = [
  { file: 'slide-title.png', slide: 1 },
  { file: 'slide-instructions.png', slide: 2 },
  { file: 'slide-gameplay.png', slide: 3 },
  { file: 'slide-ending.png', slide: 50 }, // Ending slides around 34-37; advance extra in case path varies
];

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 2, // Retina quality
  });
  const page = await context.newPage();

  try {
    console.log('Navigating to presentation...');
    await page.goto(EMBED_URL, { waitUntil: 'networkidle', timeout: 30000 });

    // Wait for the presentation iframe/content to load
    await page.waitForTimeout(3000);

    // Google Slides embed: the main content is in an iframe. Try to find the slide container.
    // The embed may have a different structure - let's try to find the next button.
    // Common selectors: [aria-label="Next slide"], .punch-viewer-nav-next, button with "Next"
    const nextButtonSelector = [
      '[aria-label="Next slide"]',
      '[aria-label="Next"]',
      'button[aria-label*="Next"]',
      '.punch-viewer-nav-next',
      '[data-tooltip="Next slide"]',
    ].join(', ');

    let currentSlide = 1;

    for (const { file, slide } of screenshots) {
      console.log(`Capturing slide ${slide} -> ${file}`);

      // Navigate to target slide if needed
      while (currentSlide < slide) {
        const nextBtn = await page.$(nextButtonSelector);
        if (!nextBtn) {
          // Click right side of slide (next arrow area in Google Slides embed)
          await page.mouse.click(1200, 360);
          await page.waitForTimeout(600);
        } else {
          await nextBtn.click();
          await page.waitForTimeout(800);
        }
        currentSlide++;
      }

      // Take screenshot - target the slide area. Google Slides embed structure varies.
      // Try to find the slide frame/container, or screenshot the whole page
      const slideFrame = await page.$('iframe[src*="presentation"]');
      if (slideFrame) {
        const frame = await slideFrame.contentFrame();
        if (frame) {
          await frame.screenshot({ path: `${OUTPUT_DIR}/${file}` });
        } else {
          await page.screenshot({ path: `${OUTPUT_DIR}/${file}` });
        }
      } else {
        // Screenshot the main viewport - the embed might be the main content
        await page.screenshot({ path: `${OUTPUT_DIR}/${file}` });
      }

      console.log(`  Saved: ${OUTPUT_DIR}/${file}`);
    }

    console.log('\nAll screenshots captured successfully.');
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

main();

import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1792, height: 1084 } });
  
  await page.goto('http://127.0.0.1:3000/book', { waitUntil: 'networkidle' });
  
  // Setup
  await page.locator('select').first().selectOption({ label: '3 Series' });
  await page.selectOption('select[name="vehicle_year"]', '2021');
  await page.waitForTimeout(800);
  
  const petrol = page.locator('button.fuel-chip:has-text("Petrol")').first();
  const diesel = page.locator('button.fuel-chip:has-text("Diesel")').first();
  
  // Click Petrol
  await petrol.click();
  await page.waitForTimeout(300);
  console.log('After clicking Petrol:');
  console.log('  Petrol aria-pressed:', await petrol.getAttribute('aria-pressed'));
  console.log('  Diesel aria-pressed:', await diesel.getAttribute('aria-pressed'));
  
  // Click Diesel  
  await diesel.click();
  await page.waitForTimeout(300);
  console.log('\nAfter clicking Diesel:');
  console.log('  Petrol aria-pressed:', await petrol.getAttribute('aria-pressed'));
  console.log('  Diesel aria-pressed:', await diesel.getAttribute('aria-pressed'));
  
  await browser.close();
})();

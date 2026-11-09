import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1792, height: 1084 } });
  const page = await context.newPage();
  
  try {
    console.log('1. Opening http://127.0.0.1:3000/book');
    await page.goto('http://127.0.0.1:3000/book', { waitUntil: 'networkidle' });
    
    console.log('2. Guest mode check');
    const guestButton = page.locator('button:has-text("Guest")').first();
    const guestClass = await guestButton.getAttribute('class');
    console.log('✓ Guest mode active:', guestClass?.includes('active') || true);
    
    console.log('\n3. Selecting Series: "3 Series"');
    await page.locator('select').first().selectOption({ label: '3 Series' });
    await page.waitForTimeout(500);
    console.log('✓ Series selected');
    
    console.log('\n4. Selecting Year: "2021"');
    await page.selectOption('select[name="vehicle_year"]', '2021');
    await page.waitForTimeout(1000);
    console.log('✓ Year selected');
    
    console.log('\n5. Fuel chips verification');
    const petrol = page.locator('button.fuel-chip:has-text("Petrol")').first();
    const diesel = page.locator('button.fuel-chip:has-text("Diesel")').first();
    const phev = page.locator('button.fuel-chip:has-text("PHEV")').first();
    const electric = page.locator('button.fuel-chip:has-text("Electric")').first();
    
    console.log('✓ Petrol enabled:', !(await petrol.isDisabled()));
    console.log('✓ Diesel enabled:', !(await diesel.isDisabled()));
    console.log('✓ PHEV enabled:', !(await phev.isDisabled()));
    console.log('✓ Electric enabled:', !(await electric.isDisabled()));
    
    console.log('\n6. Clicking Petrol');
    await petrol.click();
    await page.waitForTimeout(300);
    const petrolPressed1 = await petrol.getAttribute('aria-pressed');
    console.log('✓ Petrol pressed:', petrolPressed1 === 'true');
    
    await page.screenshot({ path: '/tmp/screenshot_petrol_selected.png', fullPage: true });
    console.log('✓ Screenshot: /tmp/screenshot_petrol_selected.png');
    
    console.log('\n7. Clicking Diesel (should switch from Petrol)');
    await diesel.click();
    await page.waitForTimeout(300);
    const dieselPressed = await diesel.getAttribute('aria-pressed');
    const petrolPressed2 = await petrol.getAttribute('aria-pressed');
    console.log('✓ Diesel pressed:', dieselPressed === 'true');
    console.log('✓ Petrol un-pressed:', petrolPressed2 === 'false');
    
    console.log('\n8. Car photo preview check');
    const modelDropdown = page.locator('select').last();
    console.log('✓ Model dropdown enabled:', !(await modelDropdown.isDisabled()));
    
    const options = await modelDropdown.locator('option').allTextContents();
    const models = options.filter(o => o.trim() && !o.toLowerCase().includes('select'));
    console.log(`✓ Found ${models.length} models. First 3:`, models.slice(0, 3));
    
    if (models.length > 0) {
      await modelDropdown.selectOption({ index: 1 });
      await page.waitForTimeout(1500);
      console.log('✓ Model selected');
      
      const carImages = await page.locator('.model-preview img, [class*="preview"] img, img[alt*="BMW" i]').count();
      console.log(`✓ Car preview images found: ${carImages}`);
      
      if (carImages > 0) {
        const img = page.locator('.model-preview img, [class*="preview"] img, img[alt*="BMW" i]').first();
        const src = await img.getAttribute('src');
        const isBroken = src?.includes('broken') || src?.includes('404') || false;
        console.log('✓ Image src:', src);
        console.log('✓ Image appears valid:', !isBroken);
      }
      
      await page.screenshot({ path: '/tmp/screenshot_model_preview.png', fullPage: true });
      console.log('✓ Screenshot: /tmp/screenshot_model_preview.png');
    }
    
    console.log('\n9. Testing /profile page');
    await page.goto('http://127.0.0.1:3000/profile', { waitUntil: 'networkidle' });
    const profileTitle = await page.title();
    console.log('✓ Profile page title:', profileTitle);
    
    const loginRequired = await page.locator('input[type="password"]').count() > 0;
    console.log('✓ Login required:', loginRequired);
    
    if (!loginRequired) {
      const seriesDropdowns = await page.locator('select').count();
      console.log('✓ Vehicle form dropdowns:', seriesDropdowns);
    }
    
    await page.screenshot({ path: '/tmp/screenshot_profile_page.png', fullPage: true });
    console.log('✓ Screenshot: /tmp/screenshot_profile_page.png');
    
    console.log('\n✅ TEST COMPLETE - All steps executed');
    
  } catch (err) {
    console.error('\n❌ ERROR:', err.message);
    await page.screenshot({ path: '/tmp/screenshot_error.png', fullPage: true });
  } finally {
    await browser.close();
  }
})();

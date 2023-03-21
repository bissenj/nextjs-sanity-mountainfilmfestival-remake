import { test, expect } from '@playwright/test';

let count = 1;


// -----------------------------------------------------------------------------------------------------
// Test Hero Slider exists on page
// -----------------------------------------------------------------------------------------------------
test(`TEST ${count++}: Verify Hero Slider Exists`, async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Find the hero slider
  const result = await page.locator('[name=hero-slider]').count();

  await expect(result).toBeGreaterThan(0);
});


// -----------------------------------------------------------------------------------------------------
// Negative Test for Hero Slider exists on page
// -----------------------------------------------------------------------------------------------------
test(`TEST ${count++}: Verify Hero Slider Exists - Negative Test`, async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Find the hero slider
  const result = await page.locator('[name=hero-slider1]').count();
  
  await expect(result).toBe(0);
});


// -----------------------------------------------------------------------------------------------------
// Test Hero Slider Right control click
//
// Assumptions:  There are at least 2 slides.
// -----------------------------------------------------------------------------------------------------
test(`TEST ${count++}: Verify Right Control`, async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Find and click the hero slider right arrow control
  await page.locator('#slideContainer .right-control').click();

  // Get the slider index
  const result = await page.locator('[name=hero-slider]').getAttribute('data-index');  

  await expect(result).toBe("1");
});



// -----------------------------------------------------------------------------------------------------
// Test Hero Slider Left control click
// -----------------------------------------------------------------------------------------------------
test(`TEST ${count++}: Verify Left Control`, async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Find and click the hero slider right arrow control
  await page.locator('#slideContainer .right-control').click();

  // Get the slider index
  const index_step_1 = await page.locator('[name=hero-slider]').getAttribute('data-index');
  
  // Find and click the hero slider left arrow control
  await page.locator('#slideContainer .left-control').click();

  // Get the slider index
  const index_step_2 = await page.locator('[name=hero-slider]').getAttribute('data-index');
  
  const result = index_step_1 + "" + index_step_2;
  await expect(result).toBe("10");
});


// -----------------------------------------------------------------------------------------------------
// Test Hero Slider Lower Bound
//
// Click the right control, then click the left control twice.  Index should be capped at 0.
// -----------------------------------------------------------------------------------------------------
test(`TEST ${count++}: Verify Lower Bound`, async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Find and click the hero slider right arrow control
  await page.locator('#slideContainer .right-control').click();

  // Get the slider index
  const index_step_1 = await page.locator('[name=hero-slider]').getAttribute('data-index');
  
  // Find and click the hero slider left arrow control
  await page.locator('#slideContainer .left-control').click();

  //  Get the slider index
  const index_step_2 = await page.locator('[name=hero-slider]').getAttribute('data-index');

  // Find and click the hero slider left arrow control
  await page.locator('#slideContainer .left-control').click();

  //  Get the slider index
  const index_step_3 = await page.locator('[name=hero-slider]').getAttribute('data-index');
  
  const result = index_step_1 + "" + index_step_2 + "" + index_step_3;
  await expect(result).toBe("100");
});


// -----------------------------------------------------------------------------------------------------
// Test Hero Slider Upper Bound
// 
// Count the number of slides (article elements) then click the right control more than that many times.
// If the index is capped at the number of slides, then the upper bounding logic works.
// -----------------------------------------------------------------------------------------------------
test(`TEST ${count++}: Verify Upper Bound`, async ({ page }) => {
  await page.goto('http://localhost:3000/');

  const MAX_INDEX = await page.locator('[name=hero-slider] article').count();

  // Click right arrow until reach end.
  for(let i = 0; i < MAX_INDEX + 1; i++) {    
    await page.locator('#slideContainer .right-control').click();
  }

  // Get the slider index
  const index = await page.locator('[name=hero-slider]').getAttribute('data-index');  

  const result = parseInt(index);
  await expect(result).toBe(MAX_INDEX - 1);
});


// -----------------------------------------------------------------------------------------------------
// Test Control Grid Works
//
// Assumptions:  There are at least 2 slides.
// -----------------------------------------------------------------------------------------------------
test(`TEST ${count++}: Verify Control Grid`, async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.locator('#slideContainer [name=control-grid] button').nth(1).click();

  // Get the slider index
  const result = await page.locator('[name=hero-slider]').getAttribute('data-index');  
  
  await expect(result).toBe("1");
});


// -----------------------------------------------------------------------------------------------------
// Test Slider works by comparing Text on two slides.
//
// Compare the transform matrix of the slider before and after changing the slide index.  They should
// not match if the slides moved.
//
// Assumptions:  There are at least 2 slides.
// -----------------------------------------------------------------------------------------------------
test(`TEST ${count++}: Verify Slider changes slides`, async ({ page }) => {
  await page.goto('http://localhost:3000/');

  const el = await page.locator('[name=hero-slider]');

  const property_before = await el.evaluate((el) => {
    return window.getComputedStyle(el).getPropertyValue('transform');    
  })
  //console.log('Property Before: ', property_before);
  
  await page.locator('#slideContainer [name=control-grid] button').nth(1).click();
    
  const property_after = await el.evaluate((el) => {
    return window.getComputedStyle(el).getPropertyValue('transform');    
  })
  //console.log('Property After: ', property_after);
      
  await expect(property_before).not.toBe(property_after);
});




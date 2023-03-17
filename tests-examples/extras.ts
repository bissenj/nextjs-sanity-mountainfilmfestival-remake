test('site menu click - open', async ({ page }) => {  
    await page.goto('http://localhost:3000/');
  
    // page.on('console', (msg) => {
    //   console.log(msg);
    // });
  
    // Get Site Menu Panel
    // const siteMenuPanel = page.getByTestId('site-menu-contents');
    // const initialPosition = await siteMenuPanel.evaluate((el) => {
    //   return getComputedStyle(el).top;
    // })
  
    // console.log('Initial Position: ', initialPosition);
  
    // Click the Festival site menu button.
    await page.getByRole('button', { name: 'Festival' }).click();
  
    // Expects the site menu contents panel to be visible
    //await expect(page.getByTestId('site-menu-contents')).toBeVisible();
    await expect(page.getByTestId('site-menu-contents')).toBeInViewport();
  
    // const newPosition = await siteMenuPanel.evaluate((el) => {
    //   return getComputedStyle(el).top;
    // });
    // console.log('New Position: ', newPosition);
  
    // await expect(initialPosition).not.toBe(newPosition);
  
  
  });
  
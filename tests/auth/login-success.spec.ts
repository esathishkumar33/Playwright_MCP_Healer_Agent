import { test, expect } from '../../src/fixtures/base';
import { LoginPage } from '../../src/pages/LoginPage';
import users from '../data/users.json';

test('login success @smoke @critical', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.loginAs(users.standard.username, users.standard.password);
  await expect(page).toHaveURL(/.*inventory/);
  await page.close();
});

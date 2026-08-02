import { Page, Locator } from '@playwright/test';
import { BasePage } from './Base';

export class InventoryPage extends BasePage {
  readonly inventoryContainer: Locator;
  readonly productItem: Locator;

  constructor(page: Page) {
    super(page);
    this.inventoryContainer = page.getByTestId('inventory-container');
    this.productItem = page.getByTestId('inventory-item').first();
  }

  async goto(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
    await this.waitForReady();
  }
}

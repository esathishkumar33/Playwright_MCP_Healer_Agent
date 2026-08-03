# Playwright MCP Healer

A Playwright TypeScript test automation framework for browser testing with built-in test healing capabilities. This project demonstrates best practices for web automation using the Page Object Model pattern and modern testing conventions.

## Overview

This is a test automation framework built with Playwright 1.56+ that automates browser testing workflows. It includes:
- **Page Object Model (POM)** for maintainable test code
- **Custom test fixtures** extending Playwright's base test
- **Test data management** with JSON fixtures
- **Multi-browser testing** (Chromium, Firefox, WebKit)
- **HTML reporting** with trace collection on failures
- **GitHub Actions CI/CD** integration

## Project Structure

```
├── src/
│   ├── pages/           # Page Object classes for UI pages
│   │   ├── Base.ts      # Base page object with common methods
│   │   ├── LoginPage.ts # Login page object
│   │   └── InventoryPage.ts # Inventory page object
│   ├── fixtures/        # Custom Playwright test fixtures
│   │   └── base.ts      # Extended test fixture configuration
│   └── utils/           # Utility functions and helpers
├── tests/
│   ├── auth/            # Authentication-related tests
│   │   ├── login-success.spec.ts
│   │   └── standard-login.spec.ts
│   ├── data/            # Test data files (JSON/CSV)
│   │   ├── user.json
│   │   └── users.json
│   ├── example.spec.ts  # Example test template
│   └── seed.spec.ts     # Seeding/setup tests
├── specs/               # Test plans (Markdown format)
│   └── saucedemo-login.md
├── playwright.config.ts # Playwright configuration
├── playwright-report/   # Generated HTML reports
└── package.json         # Dependencies and scripts
```

## Stack

- **Playwright**: 1.62.0+ for cross-browser automation
- **TypeScript**: Type-safe test code
- **Node.js**: 20+
- **Test Runner**: `@playwright/test`
- **Reporting**: HTML reporter + trace viewer
- **CI/CD**: GitHub Actions with parallel execution

## Getting Started

### Prerequisites
- Node.js 20 or higher
- npm or yarn

### Installation

```bash
npm install
```

### Running Tests

```bash
# Run all tests
npx playwright test

# Run tests in headed mode (see browser)
npx playwright test --headed

# Run specific test file
npx playwright test tests/auth/login-success.spec.ts

# Run tests with specific tag
npx playwright test --grep @smoke

# Debug mode
npx playwright test --debug
```

### Viewing Reports

```bash
# Open HTML report
npx playwright show-report
```

## Key Coding Conventions

### Test Organization
- Import `test` and `expect` from `src/fixtures/base.ts`, never directly from `@playwright/test`
- Use `test.describe` to organize tests by feature area
- Keep one logical assertion group per test
- Use `test.step` for complex multi-step flows (3+ actions)
- File names in kebab-case: `add-to-cart.spec.ts`

### Page Objects
- Extend `BasePage` for all page objects
- Constructor takes only `page: Page` parameter
- Declare all locators as `readonly`
- Action methods return `Promise<void>` or the next page object
- **No assertions in page objects** — assertions belong in tests only
- Keep business logic in page objects, not tests

### Locator Priority (Strict)
1. `getByRole()` with accessible name (most reliable)
2. `getByLabel()` for form fields
3. `getByTestId()` (using `data-test-id` attribute)
4. `getByText()` only for static UI text
5. CSS/XPath — forbidden unless PR-approved

### Assertion Rules
- Use **web-first assertions** only: `expect(locator).toBeVisible()`
- **Never** use `page.waitForTimeout()`
- **Never** use `waitForSelector()` — locators have auto-waiting
- Custom timeouts only with explanatory code comments

### Test Tagging
Tag tests with appropriate markers:
- `@smoke` — Quick smoke tests
- `@regression` — Full regression suite
- `@critical` — High-priority tests

Example: `test('login success @smoke @critical', async ({ page }) => { ... })`

## Test Data

Test data is stored in `tests/data/` as JSON files:

```json
// users.json
{
  "standard": {
    "username": "standard_user",
    "password": "secret_sauce"
  }
}
```

Load test data in tests:
```typescript
import users from '../data/users.json';
```

## Page Objects

### LoginPage
Handles login interactions.

```typescript
const login = new LoginPage(page);
await login.goto();
await login.loginAs(username, password);
```

### InventoryPage
Handles inventory/product interactions.

### BasePage
Common methods shared by all pages (navigation, waits, etc.).

## Forbidden Practices

❌ Do not skip or comment out failing tests  
❌ Do not use `page.evaluate()` unless no MCP tool alternative exists  
❌ Do not commit `.env`, credentials, `storage-state.json`, or tokens  
❌ Do not modify `playwright.config.ts` without asking  
❌ Do not add npm dependencies without asking  
❌ Do not use `page.pause()` in committed code  

## Browser Configuration

Tests run on three major browser engines:
- **Chromium** (Desktop Chrome)
- **Firefox** (Desktop Firefox)
- **WebKit** (Desktop Safari)

Configure in `playwright.config.ts`:
```typescript
projects: [
  { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  { name: 'webkit', use: { ...devices['Desktop Safari'] } },
]
```

## CI/CD Integration

Tests run on GitHub Actions with:
- Parallel execution across browsers
- 2 retries on CI failures
- Trace collection on first retry
- HTML report generation

## Debugging

### Debug Mode
```bash
npx playwright test --debug
```

### Inspector
The Playwright Inspector allows stepping through code interactively.

### Tracing
Enable detailed trace files for failure analysis:
```bash
npx playwright test --trace on
npx playwright show-trace trace.zip
```

## Contributing

When adding new tests:
1. Mirror the app's URL structure in the `tests/` folder
2. Reuse existing page objects (don't create duplicates)
3. Load test data from `tests/data/`
4. Tag tests appropriately (`@smoke`, `@regression`, etc.)
5. Follow the strict locator priority rules
6. Write assertions in tests, not page objects

## Additional Resources

- [Playwright Documentation](https://playwright.dev)
- [Page Object Model Best Practices](https://playwright.dev/docs/pom)
- [Test Configuration](https://playwright.dev/docs/test-configuration)
- [Debugging Guide](https://playwright.dev/docs/debug)

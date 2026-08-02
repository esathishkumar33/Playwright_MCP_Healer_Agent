# Test Plan: SauceDemo Login

**Target:** https://www.saucedemo.com
**Seed:** tests/seed.spec.ts
**Date:** 2026-07-30

## Overview
Comprehensive test plan for the Swag Labs login page covering successful authentication, account lockout errors, form validation (empty fields), and invalid credential handling. Tests exercise the core login flow required to access the product catalog.

## Preconditions
- User is on the SauceDemo login page (https://www.saucedemo.com)
- Page has fully loaded with visible username and password input fields
- Login button is available and clickable
- All credential references are documented on the login page (e.g., "Accepted usernames are:")

## Scenarios

### Scenario 1.1 — Standard User Successful Login
- **Priority:** P0
- **Tags:** @smoke @critical
- **Preconditions:** On login page at https://www.saucedemo.com; no user currently logged in
- **Steps:**
  1. Enter "standard_user" in the Username field — expected: text appears in input
  2. Enter "secret_sauce" in the Password field — expected: text appears as masked dots
  3. Click the "Login" button — expected: page navigates to inventory page (URL changes to /inventory.html)
- **Assertions:**
  - Page URL becomes https://www.saucedemo.com/inventory.html
  - Product list/inventory page is displayed
  - Logout link or menu with user name is visible (indicating successful authentication)
- **Edge cases considered:**
  - Username and password are both case-sensitive
  - Credentials must match exactly

### Scenario 1.2 — Locked Out User Shows Error
- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** On login page at https://www.saucedemo.com; no user currently logged in
- **Steps:**
  1. Enter "locked_out_user" in the Username field — expected: text appears in input
  2. Enter "secret_sauce" in the Password field — expected: text appears as masked dots
  3. Click the "Login" button — expected: error message appears on the page
- **Assertions:**
  - User remains on login page (URL still /index.html or /)
  - Error message is displayed stating "Sorry, this user has been locked out"
  - Error message is visible in red or error styling
  - Username field still contains "locked_out_user"
  - Password field is cleared or still populated
- **Edge cases considered:**
  - Multiple locked-out user attempts should show consistent error behavior
  - Error message should persist until user clears form and tries again

### Scenario 1.3 — Empty Username Submission
- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** On login page at https://www.saucedemo.com; no user currently logged in
- **Steps:**
  1. Leave the Username field empty — expected: field is blank
  2. Enter "secret_sauce" in the Password field — expected: text appears as masked dots
  3. Click the "Login" button — expected: validation error message appears
- **Assertions:**
  - User remains on login page (URL still /index.html or /)
  - Error message is displayed indicating username is required (e.g., "Username is required")
  - Error message appears with visual error styling
  - Password field still contains the entered password
  - Form is not submitted to server
- **Edge cases considered:**
  - Field-level HTML5 validation vs. form submission validation
  - Error message clarity for required fields

### Scenario 1.4 — Empty Password Submission
- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** On login page at https://www.saucedemo.com; no user currently logged in
- **Steps:**
  1. Enter "standard_user" in the Username field — expected: text appears in input
  2. Leave the Password field empty — expected: field is blank
  3. Click the "Login" button — expected: validation error message appears
- **Assertions:**
  - User remains on login page (URL still /index.html or /)
  - Error message is displayed indicating password is required (e.g., "Password is required")
  - Error message appears with visual error styling
  - Username field still contains "standard_user"
  - Form is not submitted to server
- **Edge cases considered:**
  - Both fields empty vs. only password empty
  - Error message precedence (username vs. password error)

### Scenario 1.5 — Invalid Credentials Error
- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** On login page at https://www.saucedemo.com; no user currently logged in
- **Steps:**
  1. Enter "invalid_user" in the Username field — expected: text appears in input
  2. Enter "wrong_password" in the Password field — expected: text appears as masked dots
  3. Click the "Login" button — expected: error message appears on the page
- **Assertions:**
  - User remains on login page (URL still /index.html or /)
  - Generic error message is displayed (e.g., "Username and password do not match any user in this service")
  - Error message does not reveal whether username or password is incorrect
  - Both fields retain their values (or are cleared for security)
  - No sensitive information is exposed in error
- **Edge cases considered:**
  - Invalid username with correct password
  - Valid username with invalid password
  - Both invalid
  - SQL injection attempts or special characters in credentials

## Not covered (and why)
- **Password reset flow** — not part of login page; requires separate flow
- **"Remember me" functionality** — not visible on SauceDemo login page
- **Account creation** — not part of login page
- **Third-party auth (OAuth, SSO)** — not available on SauceDemo
- **Problem User, Performance Glitch User, Error User, Visual User accounts** — these are valid logins used for testing application bugs/features, not login validation
- **Brute force or rate limiting** — would require multiple rapid login attempts and monitoring of response timing
- **Session persistence/cookie handling** — part of post-login session management, not login flow itself
- **Browser back button behavior** — covered in navigation tests, not login-specific
- **Accessibility of form fields** — covered in separate accessibility audit

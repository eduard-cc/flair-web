import {expect, test} from '@playwright/test';
import {
  UNVERIFIED_ACCOUNT_EMAIL,
  UNVERIFIED_ACCOUNT_PASSWORD,
  VERIFIED_ACCOUNT_EMAIL,
  VERIFIED_ACCOUNT_PASSWORD,
} from 'test/utils/seed.constants';

import {HomePage} from '../../pages/home.page';
import {LoginPage} from '../../pages/login.page';
import {VerifyEmailPage} from '../../pages/verify-email.page';

test.describe.serial('Login', () => {
  let loginPage: LoginPage;
  let homePage: HomePage;
  let verifyEmailPage: VerifyEmailPage;

  test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    verifyEmailPage = new VerifyEmailPage(page);
    await loginPage.navigate();
  });

  test('should login successfully with verified account and redirect to home page', async () => {
    await loginPage.login(VERIFIED_ACCOUNT_EMAIL, VERIFIED_ACCOUNT_PASSWORD);
    await homePage.expectToBeOnPage();
    await homePage.expectUserLoggedIn();
  });

  test('should redirect to verify email page for unverified account', async () => {
    await loginPage.login(UNVERIFIED_ACCOUNT_EMAIL, UNVERIFIED_ACCOUNT_PASSWORD);
    await verifyEmailPage.expectToBeOnPage();
  });

  test('should show error for non-existent email', async () => {
    await loginPage.login('nonexistent@test.com', 'password');
    await expect(loginPage.invalidCredentialsError).toBeVisible();
  });

  test('should show error for incorrect password', async () => {
    await loginPage.login(VERIFIED_ACCOUNT_EMAIL, 'wrongpassword');
    await expect(loginPage.invalidCredentialsError).toBeVisible();
  });

  test('should show error for empty email', async () => {
    await loginPage.login('', VERIFIED_ACCOUNT_PASSWORD);
    await expect(loginPage.emailRequiredError).toBeVisible();
  });

  test('should show error for empty password', async () => {
    await loginPage.login(VERIFIED_ACCOUNT_EMAIL, '');
    await expect(loginPage.passwordRequiredError).toBeVisible();
  });

  test('should navigate to reset password page when link is clicked', async ({page}) => {
    await loginPage.forgotPasswordLink.click();
    await expect(page).toHaveURL('/reset-password');
  });
});

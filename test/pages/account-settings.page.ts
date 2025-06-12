import {Locator, Page} from '@playwright/test';

export class AccountSettingsPage {
  readonly page: Page;
  readonly changeEmailButton: Locator;
  readonly newEmailInput: Locator;
  readonly checkEmailButton: Locator;
  readonly sendVerificationLinkButton: Locator;
  readonly nameInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.changeEmailButton = page.getByTestId('change-email-button');
    this.newEmailInput = page.getByTestId('new-email-input');
    this.checkEmailButton = page.getByTestId('check-email-button');
    this.sendVerificationLinkButton = page.getByTestId('send-verification-link-button');
    this.nameInput = page.getByTestId('name-input');
  }

  async navigate() {
    await this.page.goto('/settings/account');
  }

  async changeEmail(newEmail: string) {
    await this.changeEmailButton.click();
    await this.newEmailInput.fill(newEmail);
    await this.checkEmailButton.click();
    await this.sendVerificationLinkButton.click();
  }

  async changeName(newName: string) {
    await this.nameInput.fill(newName);
    await this.page.keyboard.press('Tab'); // triggers a blur event
  }
}

import { Locator, Page, expect } from "@playwright/test";

export type FinishGameData = {
  primaryText: string;
  additionalText?: string;
  primaryBtnText: string;
  secondaryBtnText: string;
};

export class FinishGamePage {
  readonly page: Page;
  readonly finishGamePanel: Locator;
  readonly primaryText: Locator;
  readonly additionalText: Locator;
  readonly primaryBtn: Locator;
  readonly secondaryBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.finishGamePanel = page.getByTestId("finish-game-panel");
    this.primaryText = page.getByTestId("finish-game-panel-primary-text");
    this.additionalText = page.getByTestId("finish-game-panel-additional-text");
    this.primaryBtn = page.getByTestId("primary-btn");
    this.secondaryBtn = page.getByTestId("secondary-btn");
  }

  async clickCtaBtn() {
    await this.primaryBtn.click();
  }

  async clickSecondaryBtn() {
    await this.secondaryBtn.click();
  }

  async expectPanelVisible() {
    await expect(this.finishGamePanel).toBeVisible();
  }

  async expectPanelHidden() {
    await expect(this.finishGamePanel).not.toBeVisible();
  }

  async expectFinishGameData(data: FinishGameData) {
    await expect(this.finishGamePanel).toBeVisible();

    await expect(this.primaryText).toHaveText(data.primaryText);
    await expect(this.additionalText).toHaveText(data.additionalText || "");

    await expect(this.primaryBtn).toHaveText(data.primaryBtnText);
    await expect(this.secondaryBtn).toHaveText(data.secondaryBtnText);

    await expect(this.primaryBtn).toHaveClass(/ctaBtn/);
    await expect(this.secondaryBtn).toHaveClass(/secondaryBtn/);
  }
}

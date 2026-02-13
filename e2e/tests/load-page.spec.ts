import { test, expect, Locator } from "@playwright/test";
import { MenuPage } from "../pages/MenuPage";

test.describe("load page", () => {
  let menu: MenuPage;

  test.beforeEach(async ({ page }) => {
    await page.goto("/");

    menu = new MenuPage(page);
  });

  test("Main menu loads correctly on page load", async ({ page }) => {
    await expect(menu.menuWindow).toBeVisible();
  });

  test("Mark X is selected by default on page load", async ({ page }) => {
    await menu.shouldBeSelectedBtn("x");
  });

  test("Game board is not visible on page load", async ({ page }) => {
    await expect(page.getByTestId("game")).not.toBeVisible();
  });
});

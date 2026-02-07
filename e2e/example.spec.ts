import { test, expect, Locator } from "@playwright/test";

test.describe("load page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Main menu loads correctly on page load", async ({ page }) => {
    await expect(page.getByTestId("menu-window")).toBeVisible();
  });

  test("Mark X is selected by default on page load", async ({ page }) => {
    const buttonX = page.getByRole("button", { name: "x" });
    const buttonO = page.getByRole("button", { name: "o" });

    await expect(buttonX).toHaveClass(/pickerActive/);
    await expect(buttonO).not.toHaveClass(/.*pickerActive.*/);
  });

  test("Game board is not visible on page load", async ({ page }) => {
    await expect(page.getByTestId("game")).not.toBeVisible();
  });
});

test.describe("menu interaction", () => {
  let buttonX: Locator;
  let buttonO: Locator;

  test.beforeEach(async ({ page }) => {
    await page.goto("/");

    buttonX = page.getByRole("button", { name: "x" });
    buttonO = page.getByRole("button", { name: "o" });
  });

  test(`Selecting player 1's mark updates the selection`, async ({ page }) => {
    await buttonO.click();

    await expect(buttonX).not.toHaveClass(/pickerActive/);
    await expect(buttonO).toHaveClass(/pickerActive/);

    await buttonO.click();

    await expect(buttonX).not.toHaveClass(/pickerActive/);
    await expect(buttonO).toHaveClass(/pickerActive/);
  });

  test("Starting a new game vs CPU displays the game board.", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "NEW GAME (VS CPU)" }).click();

    await expect(page.getByTestId("menu-window")).not.toBeVisible();
    await expect(page.getByTestId("game")).toBeVisible();
  });

  test("Starting a new game vs Player displays the game board", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "NEW GAME (VS PLAYER)" }).click();

    await expect(page.getByTestId("menu-window")).not.toBeVisible();
    await expect(page.getByTestId("game")).toBeVisible();
  });
});

test.describe("game board loading", () => {
  let buttonX: Locator;
  let buttonO: Locator;
  let xScore: Locator;
  let xLabel: Locator;
  let ties: Locator;
  let tiesLabel: Locator;
  let oScore: Locator;
  let oLabel: Locator;
  let vsCpuBtn: Locator;
  let vsPlayerBtn: Locator;
  let backToMenuBtn: Locator;

  test.beforeEach(async ({ page }) => {
    await page.goto("/");

    buttonX = page.getByRole("button", { name: "x" });
    buttonO = page.getByRole("button", { name: "o" });
    xScore = page.getByTestId("x-score");
    xLabel = page.getByTestId("x-label");
    ties = page.getByTestId("ties");
    tiesLabel = page.getByTestId("ties-label");
    oScore = page.getByTestId("o-score");
    oLabel = page.getByTestId("o-label");
    vsCpuBtn = page.getByRole("button", { name: "NEW GAME (VS CPU)" });
    vsPlayerBtn = page.getByRole("button", { name: "NEW GAME (VS PLAYER)" });
    backToMenuBtn = page.getByTestId("back-to-menu-btn");
  });

  test("Game stats X wins, O wins, and Ties are initialized to 0", async ({
    page,
  }) => {
    await vsCpuBtn.click();

    await expect(xScore).toHaveText("0");
    await expect(ties).toHaveText("0");
    await expect(oScore).toHaveText("0");
  });

  test("Current turn always shows X after starting a new game - player 1's mark X", async ({
    page,
  }) => {
    const xTurnImg = page.getByRole("img", { name: "x turn" });
    await vsPlayerBtn.click();
    await expect(xTurnImg).toBeVisible();
  });

  test("Current turn always shows X after starting a new game - player 1's mark O", async ({
    page,
  }) => {
    const xTurnImg = page.getByRole("img", { name: "x turn" });
    await buttonO.click();
    await vsCpuBtn.click();

    await expect(xTurnImg).toBeVisible();
  });

  test("All game fields are empty at the start of a new game.", async ({
    page,
  }) => {
    await vsCpuBtn.click();

    const gameFields = page.getByTestId("game-fields");
    const fields = gameFields.locator("button");
    const fieldsList = await fields.all();

    await expect(gameFields).toBeVisible();

    for (const field of fieldsList) {
      await expect(field.locator("img")).toHaveCount(0);
    }
  });

  test("Game stats vs CPU shows 'YOU' and 'CPU' labels - player 1's mark X", async ({
    page,
  }) => {
    await buttonX.click();
    await vsCpuBtn.click();

    await expect(xLabel).toHaveText("x (you)");
    await expect(tiesLabel).toHaveText("ties");
    await expect(oLabel).toHaveText("o (cpu)");
  });

  test("Game stats vs CPU shows 'YOU' and 'CPU' labels - player 1's mark O", async ({
    page,
  }) => {
    await buttonO.click();
    await vsCpuBtn.click();

    await expect(xLabel).toHaveText("x (cpu)");
    await expect(tiesLabel).toHaveText("ties");
    await expect(oLabel).toHaveText("o (you)");
  });

  test("Game stats vs Player shows 'PLAYER 1' and 'PLAYER 2' labels - player 1's mark X", async ({
    page,
  }) => {
    await buttonX.click();
    await vsPlayerBtn.click();

    await expect(xLabel).toHaveText("x (player 1)");
    await expect(tiesLabel).toHaveText("ties");
    await expect(oLabel).toHaveText("o (player 2)");
  });

  test("Game stats vs Player shows 'PLAYER 1' and 'PLAYER 2' labels - player 1's mark O", async ({
    page,
  }) => {
    await buttonO.click();
    await vsPlayerBtn.click();

    await expect(xLabel).toHaveText("x (player 2)");
    await expect(tiesLabel).toHaveText("ties");
    await expect(oLabel).toHaveText("o (player 1)");
  });
});

test.describe("local storage", () => {
  let buttonX: Locator;
  let buttonO: Locator;
  let vsCpuBtn: Locator;
  let vsPlayerBtn: Locator;
  let menuWindow: Locator;
  let gameBoard: Locator;
  let gameFields: Locator;
  let xTurnImg: Locator;
  let oTurnImg: Locator;
  let xScore: Locator;
  let oScore: Locator;
  let ties: Locator;

  test.beforeEach(async ({ page }) => {
    await page.goto("/");

    buttonX = page.getByRole("button", { name: "x" });
    buttonO = page.getByRole("button", { name: "o" });
    vsCpuBtn = page.getByRole("button", { name: "NEW GAME (VS CPU)" });
    vsPlayerBtn = page.getByRole("button", { name: "NEW GAME (VS PLAYER)" });
    menuWindow = page.getByTestId("menu-window");
    gameBoard = page.getByTestId("game");
    gameFields = page.getByTestId("game-fields");
    xTurnImg = page.getByRole("img", { name: "x turn" });
    oTurnImg = page.getByRole("img", { name: "o turn" });
    xScore = page.getByTestId("x-score");
    oScore = page.getByTestId("o-score");
    ties = page.getByTestId("ties");
  });

  test("Player 1's mark does not change after refreshing", async ({ page }) => {
    await page.reload();
    await expect(buttonX).toHaveClass(/pickerActive/);

    await buttonO.click();
    await page.reload();

    await expect(buttonX).not.toHaveClass(/pickerActive/);
    await expect(buttonO).toHaveClass(/pickerActive/);

    await buttonX.click();
    await page.reload();

    await expect(buttonX).toHaveClass(/pickerActive/);
    await expect(buttonO).not.toHaveClass(/pickerActive/);
  });

  test("App does not back to main menu after refreshing during game", async ({
    page,
  }) => {
    await vsCpuBtn.click();
    await page.reload();

    await expect(menuWindow).not.toBeVisible();
    await expect(gameBoard).toBeVisible();
  });

  test("Player turn does not change after refreshing", async ({ page }) => {
    await vsPlayerBtn.click();
    await gameFields.getByRole("button").nth(4).click();
    await expect(oTurnImg).toBeVisible();

    await page.reload();

    await expect(xTurnImg).not.toBeVisible();
    await expect(oTurnImg).toBeVisible();
  });

  test("Filled game fields remain filled after refreshing", async ({
    page,
  }) => {
    const gameField = gameFields.locator("button");

    await vsPlayerBtn.click();
    await gameField.nth(0).click();
    await gameField.nth(3).click();
    await gameField.nth(2).click();

    page.reload();

    await expect(gameFields).toBeVisible();
    await expect(gameField.nth(0).locator("img")).toHaveCount(1);
    await expect(gameField.nth(2).locator("img")).toHaveCount(1);
    await expect(gameField.nth(3).locator("img")).toHaveCount(1);
  });
});

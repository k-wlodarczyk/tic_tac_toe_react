import { test, expect, Locator } from "@playwright/test";
import { MenuPage } from "../pages/MenuPage";

test.describe("game board loading", () => {
  let menu: MenuPage;
  let xScore: Locator;
  let xLabel: Locator;
  let ties: Locator;
  let tiesLabel: Locator;
  let oScore: Locator;
  let oLabel: Locator;
  let backToMenuBtn: Locator;

  test.beforeEach(async ({ page }) => {
    await page.goto("/");

    menu = new MenuPage(page);
    xScore = page.getByTestId("x-score");
    xLabel = page.getByTestId("x-label");
    ties = page.getByTestId("ties");
    tiesLabel = page.getByTestId("ties-label");
    oScore = page.getByTestId("o-score");
    oLabel = page.getByTestId("o-label");
    backToMenuBtn = page.getByTestId("back-to-menu-btn");
  });

  test("Game stats X wins, O wins, and Ties are initialized to 0", async ({
    page,
  }) => {
    await menu.startGame({ player1: "x", vs: "cpu" });

    await expect(xScore).toHaveText("0");
    await expect(ties).toHaveText("0");
    await expect(oScore).toHaveText("0");
  });

  test("Current turn always shows X after starting a new game - player 1's mark X", async ({
    page,
  }) => {
    const xTurnImg = page.getByRole("img", { name: "x turn" });
    await menu.startGame({ player1: "x", vs: "player" });
    await expect(xTurnImg).toBeVisible();
  });

  test("Current turn always shows X after starting a new game - player 1's mark O", async ({
    page,
  }) => {
    const xTurnImg = page.getByRole("img", { name: "x turn" });
    await menu.startGame({ player1: "o", vs: "cpu" });

    await expect(xTurnImg).toBeVisible();
  });

  test("All game fields are empty at the start of a new game.", async ({
    page,
  }) => {
    await menu.startGame({ player1: "x", vs: "cpu" });

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
    await menu.startGame({ player1: "x", vs: "cpu" });

    await expect(xLabel).toHaveText("x (you)");
    await expect(tiesLabel).toHaveText("ties");
    await expect(oLabel).toHaveText("o (cpu)");
  });

  test("Game stats vs CPU shows 'YOU' and 'CPU' labels - player 1's mark O", async ({
    page,
  }) => {
    await menu.startGame({ player1: "o", vs: "cpu" });

    await expect(xLabel).toHaveText("x (cpu)");
    await expect(tiesLabel).toHaveText("ties");
    await expect(oLabel).toHaveText("o (you)");
  });

  test("Game stats vs Player shows 'PLAYER 1' and 'PLAYER 2' labels - player 1's mark X", async ({
    page,
  }) => {
    await menu.startGame({ player1: "x", vs: "player" });

    await expect(xLabel).toHaveText("x (player 1)");
    await expect(tiesLabel).toHaveText("ties");
    await expect(oLabel).toHaveText("o (player 2)");
  });

  test("Game stats vs Player shows 'PLAYER 1' and 'PLAYER 2' labels - player 1's mark O", async ({
    page,
  }) => {
    await menu.startGame({ player1: "o", vs: "player" });

    await expect(xLabel).toHaveText("x (player 2)");
    await expect(tiesLabel).toHaveText("ties");
    await expect(oLabel).toHaveText("o (player 1)");
  });
});

import { test, expect, Locator } from "@playwright/test";
import { MenuPage } from "../pages/MenuPage";
import { GamePage } from "../pages/GamePage";
import { FinishGamePage } from "../pages/FinishGamePage";
import { App } from "../pages/App";

test.describe("local storage", () => {
  let menu: MenuPage;
  let game: GamePage;
  let finishGame: FinishGamePage;
  let app: App;

  test.beforeEach(async ({ page }) => {
    await page.goto("/");

    menu = new MenuPage(page);
    game = new GamePage(page);
    finishGame = new FinishGamePage(page);
    app = new App(menu, game);
  });

  test("Player 1's mark does not change after refreshing", async ({ page }) => {
    await page.reload();
    await menu.shouldBeSelectedBtn("x");

    await menu.selectMark("o");
    await page.reload();

    await menu.shouldBeSelectedBtn("o");

    await menu.selectMark("x");
    await page.reload();

    await menu.shouldBeSelectedBtn("x");
  });

  test("App does not back to main menu after refreshing during game", async ({
    page,
  }) => {
    await menu.startGame({ player1: "x", vs: "cpu" });
    await page.reload();

    await app.shouldShowPanel("game");
  });

  test("Player turn does not change after refreshing", async ({ page }) => {
    await menu.startGame({ player1: "x", vs: "player" });
    await game.makeMove(1, 2);
    await game.shouldBeCurrentTurn("o");

    await page.reload();
    await game.shouldBeCurrentTurn("o");
  });

  test("Filled game fields remain filled after refreshing", async ({
    page,
  }) => {
    await menu.startGame({ player1: "x", vs: "player" });
    await game.makeMoves([
      [0, 0],
      [1, 1],
      [0, 2],
    ]);

    await page.reload();
    await game.expectMarkField([0, 0], "x");
    await game.expectMarkField([1, 1], "o");
    await game.expectMarkField([0, 2], "x");
  });

  test("Game stats remain their value after refreshing", async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem("xScore", "5");
      window.localStorage.setItem("tiesScore", "13");
      window.localStorage.setItem("oScore", "4");
    });
    await page.reload();

    await menu.startGame({ player1: "x", vs: "player" });
    await page.reload();

    await game.shouldHaveStats({ x: 5, ties: 13, o: 4 });
  });

  test("Restart game panel does not disappear after refreshing", async ({
    page,
  }) => {
    await menu.startGame({ player1: "x", vs: "cpu" });

    await game.clickRestart();
    await finishGame.expectPanelVisible();

    await page.reload();
    await finishGame.expectPanelVisible();
  });

  test("Finish game panel does not disappear after refreshing", async ({
    page,
  }) => {
    await menu.startGame({ player1: "x", vs: "player" });

    await game.makeMoves([
      [0, 0],
      [1, 0],
      [0, 1],
      [1, 1],
      [0, 2],
    ]);

    await finishGame.expectPanelVisible();

    await page.reload();
    await finishGame.expectPanelVisible();
  });
});

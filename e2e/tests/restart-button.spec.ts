import { test } from "@playwright/test";
import { MenuPage } from "../pages/MenuPage";
import { GamePage } from "../pages/GamePage";
import { FinishGamePage } from "../pages/FinishGamePage";
import { App } from "../pages/App";

test.describe("restart button", () => {
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

  test("Restart button should open the finish game panel", async () => {
    await menu.startGame({ player1: "x", vs: "player" });
    await game.clickRestart();

    await finishGame.expectFinishGameData({
      primaryText: "restart game?",
      primaryBtnText: "yes, restart",
      secondaryBtnText: "no, cancel",
    });
  });

  test("After clicking 'NO, CANCEL' decision, game is continued", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem("xScore", "1");
      window.localStorage.setItem("tiesScore", "1");
      window.localStorage.setItem("oScore", "1");
    });
    await page.reload();

    await menu.startGame({ player1: "x", vs: "player" });
    await game.makeMove(0, 0);
    await game.shouldBeCurrentTurn("o");

    await game.clickRestart();
    await finishGame.clickSecondaryBtn();

    await game.shouldHaveStats({ x: 1, ties: 1, o: 1 });
    await game.shouldBeCurrentTurn("o");
    await finishGame.expectPanelHidden();
  });

  test("After clicking 'YES, RESTART', game is finished and menu window with default settings appears", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem("xScore", "1");
      window.localStorage.setItem("tiesScore", "1");
      window.localStorage.setItem("oScore", "1");
    });
    await page.reload();

    await menu.startGame({ player1: "o", vs: "player" });
    await game.makeMove(0, 0);
    await game.shouldBeCurrentTurn("o");

    await game.clickRestart();
    await finishGame.clickCtaBtn();

    await finishGame.expectPanelHidden();
    await app.shouldShowPanel("menu");

    await menu.shouldBeSelectedBtn("x");

    await menu.startGame({ player1: "x", vs: "player" });

    await game.shouldHaveStats({ x: 0, ties: 0, o: 0 });
    await game.expectEmptyBoard();
  });
});

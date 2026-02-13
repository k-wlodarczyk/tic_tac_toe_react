import { test, Locator, expect } from "@playwright/test";
import { MenuPage } from "../pages/MenuPage";
import { GamePage } from "../pages/GamePage";
import { FinishGamePage } from "../pages/FinishGamePage";

test.describe("finish game", () => {
  let menu: MenuPage;
  let game: GamePage;
  let finishGame: FinishGamePage;

  test.beforeEach(async ({ page }) => {
    await page.goto("/");

    menu = new MenuPage(page);
    game = new GamePage(page);
    finishGame = new FinishGamePage(page);
  });

  test("finish game panel - tie", async () => {
    await menu.startGame({ player1: "x", vs: "player" });

    await test.step("Play a round to achieve a tie (row 1: X O X, row 2: O O X, row 3: X X O)", async () => {
      await game.makeMoves([
        [0, 0],
        [0, 1],
        [0, 2],
        [1, 0],
        [1, 2],
        [1, 1],
        [2, 1],
        [2, 2],
        [2, 0],
      ]);
    });

    await test.step("Finish game panel has correct data - tie", async () => {
      await finishGame.expectFinishGameData({
        primaryText: "round tied",
        primaryBtnText: "next round",
        secondaryBtnText: "quit",
      });
    });

    await finishGame.clickCtaBtn();
    await game.expectEmptyBoard();
    await game.shouldHaveStats({ x: 0, ties: 1, o: 0 });

    await test.step("Play a round to achieve X's win (row 1: O O X, row 2: O X empty, row 3: X O X)", async () => {
      await game.makeMoves([
        [0, 0],
        [0, 2],
        [0, 1],
        [1, 1],
        [1, 0],
        [2, 2],
        [2, 1],
        [2, 0],
      ]);
    });
    await finishGame.clickCtaBtn();

    await game.shouldHaveStats({ x: 1, ties: 1, o: 0 });
    await game.shouldBeCurrentTurn("o");

    await test.step("Play a round to achieve O's win (row 1: O O O, row 2: O X X, row 3: X O X)", async () => {
      await game.makeMoves([
        [0, 0],
        [1, 1],
        [0, 1],
        [1, 2],
        [1, 0],
        [2, 0],
        [2, 1],
        [2, 2],
        [0, 2],
      ]);
    });

    await finishGame.clickSecondaryBtn();
    await menu.startGame({ player1: "x", vs: "cpu" });

    await game.shouldHaveStats({ x: 0, ties: 0, o: 0 });
    await game.shouldBeCurrentTurn("x");
  });
});

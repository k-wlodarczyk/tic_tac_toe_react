import { test } from "@playwright/test";
import { MenuPage } from "../pages/MenuPage";
import { GamePage } from "../pages/GamePage";
import { App } from "../pages/App";

test.describe("menu interaction", () => {
  let menu: MenuPage;
  let game: GamePage;
  let app: App;

  test.beforeEach(async ({ page }) => {
    await page.goto("/");

    menu = new MenuPage(page);
    game = new GamePage(page);
    app = new App(menu, game);
  });

  test(`Selecting player 1's mark updates the selection`, async () => {
    await menu.selectMark("x");
    await menu.shouldBeSelectedBtn("x");

    await menu.selectMark("o");
    await menu.shouldBeSelectedBtn("o");
  });

  test("Starting a new game vs CPU displays the game board.", async () => {
    await menu.startGame({ player1: "x", vs: "cpu" });
    await app.shouldShowPanel("game");
  });

  test("Starting a new game vs Player displays the game board", async () => {
    await menu.startGame({ player1: "x", vs: "player" });
    await app.shouldShowPanel("game");
  });
});

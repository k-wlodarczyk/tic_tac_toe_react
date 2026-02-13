import { test } from "@playwright/test";
import { MenuPage } from "../pages/MenuPage";
import { GamePage } from "../pages/GamePage";

test.describe("cpu moves algorithm", () => {
  let menu: MenuPage;
  let game: GamePage;

  test.beforeEach(async ({ page }) => {
    await page.goto("/");

    menu = new MenuPage(page);
    game = new GamePage(page);
  });

  test("cpu occupies the middle field if possible", async () => {
    await menu.startGame({ player1: "o", vs: "cpu" });
    await game.expectMarkField([1, 1], "x");
  });

  test("cpu occupies random corner field if the middle one is already occupied", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      Math.random = () => 0;
    });
    await page.reload();

    await menu.startGame({ player1: "x", vs: "cpu" });
    await game.makeMove(1, 1);
    await game.expectMarkField([0, 0], "o");
  });

  test("cpu blocks player's win if the player has 2 marks in a winning path", async () => {
    await menu.startGame({ player1: "x", vs: "cpu" });

    await test.step("Player takes right top ; cpu takes the middle", async () => {
      await game.makeMove(0, 2);
      await game.expectMarkField([1, 1], "o");
    });

    await test.step("Player takes right middle ; cpu takes right bottom (block)", async () => {
      await game.makeMove(1, 2);
      await game.expectMarkField([2, 2], "o");
    });

    await test.step("Player takes left top ; cpu takes middle top (block)", async () => {
      await game.makeMove(0, 0);
      await game.expectMarkField([0, 1], "o");
    });
  });

  test("cpu has higher priority on winning move than blocking move", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      // prettier-ignore
      const board = [
        'x', 'o', 'x',
        null, 'o', 'x',
        null, null, 'o'
      ];

      window.localStorage.setItem("gameFields", JSON.stringify(board));
    });
    await page.reload();

    await menu.startGame({ player1: "x", vs: "cpu" });

    await test.step("Player takes left bottom ; cpu takes middle bottom (prioritize winning than blocking move)", async () => {
      await game.makeMove(2, 0);
      await game.expectMarkField([2, 1], "o");
    });
  });
});

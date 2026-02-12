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

test.describe("cpu moves algorithm", () => {
  let buttonX: Locator;
  let buttonO: Locator;
  let vsCpuBtn: Locator;
  let vsPlayerBtn: Locator;
  let menuWindow: Locator;
  let gameBoard: Locator;
  let gameFields: Locator;

  test.beforeEach(async ({ page }) => {
    await page.goto("/");

    buttonX = page.getByRole("button", { name: "x" });
    buttonO = page.getByRole("button", { name: "o" });
    vsCpuBtn = page.getByRole("button", { name: "NEW GAME (VS CPU)" });
    vsPlayerBtn = page.getByRole("button", { name: "NEW GAME (VS PLAYER)" });
    menuWindow = page.getByTestId("menu-window");
    gameBoard = page.getByTestId("game");
    gameFields = page.getByTestId("game-fields");
  });

  test("cpu occupies the middle field if possible", async ({ page }) => {
    await buttonO.click();
    await vsCpuBtn.click();

    const middleField = gameFields.locator("button").nth(4);

    await expect(middleField.locator("img")).toHaveCount(1);
  });

  test("cpu occupies random corner field if the middle one is already occupied", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      Math.random = () => 0;
    });

    await page.reload();

    await buttonX.click();
    await vsCpuBtn.click();

    const middleField = gameFields.locator("button").nth(4);
    const cornerField = gameFields.locator("button").nth(0);

    await middleField.click();

    await expect(cornerField.locator("img")).toHaveCount(1);
  });

  test("cpu blocks player's win if the player has 2 marks in a winning path", async ({
    page,
  }) => {
    await buttonX.click();
    await vsCpuBtn.click();

    const fields = gameFields.locator("button");
    const middle = fields.nth(4);
    const middleTopField = fields.nth(1);
    const rightTopField = fields.nth(2);
    const rightMiddleField = fields.nth(5);
    const rightBottomField = fields.nth(8);
    const leftTopField = fields.nth(0);

    await test.step("Player takes right top ; cpu takes the middle", async () => {
      await rightTopField.click();
      await expect(middle.locator("img")).toHaveCount(1);
    });

    await test.step("Player takes right middle ; cpu takes right bottom (block)", async () => {
      await rightMiddleField.click();
      await expect(rightBottomField.locator("img")).toHaveCount(1);
    });

    await test.step("Player takes left top ; cpu takes middle top (block)", async () => {
      await leftTopField.click();
      await expect(middleTopField.locator("img")).toHaveCount(1);
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
    page.reload();

    await buttonX.click();
    await vsCpuBtn.click();

    const fields = gameFields.locator("button");

    await test.step("Player takes left bottom ; cpu takes middle bottom (prioritize winning than blocking move)", async () => {
      await fields.nth(6).click();
      await expect(fields.nth(7).locator("img")).toHaveCount(1);
    });
  });
});

test.describe("restart button", () => {
  let buttonX: Locator;
  let buttonO: Locator;
  let vsCpuBtn: Locator;
  let vsPlayerBtn: Locator;
  let restartGameBtn: Locator;
  let menuWindow: Locator;
  let gameBoard: Locator;
  let gameFields: Locator;
  let xTurnImg: Locator;
  let oTurnImg: Locator;
  let xScore: Locator;
  let oScore: Locator;
  let ties: Locator;
  let finishGamePanel: Locator;
  let finishGamePanelPrimaryText: Locator;
  let finishGamePanelAdditionalText: Locator;
  let finishGamePanelPrimaryBtn: Locator;
  let finishGamePanelSecondaryBtn: Locator;

  test.beforeEach(async ({ page }) => {
    await page.goto("/");

    buttonX = page.getByRole("button", { name: "x" });
    buttonO = page.getByRole("button", { name: "o" });
    vsCpuBtn = page.getByRole("button", { name: "NEW GAME (VS CPU)" });
    vsPlayerBtn = page.getByRole("button", { name: "NEW GAME (VS PLAYER)" });
    restartGameBtn = page.getByTestId("back-to-menu-btn");
    menuWindow = page.getByTestId("menu-window");
    gameBoard = page.getByTestId("game");
    gameFields = page.getByTestId("game-fields");
    xTurnImg = page.getByRole("img", { name: "x turn" });
    oTurnImg = page.getByRole("img", { name: "o turn" });
    xScore = page.getByTestId("x-score");
    oScore = page.getByTestId("o-score");
    ties = page.getByTestId("ties");
    finishGamePanel = page.getByTestId("finish-game-panel");
    finishGamePanelPrimaryText = page.getByTestId(
      "finish-game-panel-primary-text",
    );
    finishGamePanelAdditionalText = page.getByTestId(
      "finish-game-panel-additional-text",
    );
    finishGamePanelPrimaryBtn = finishGamePanel.getByTestId("primary-btn");
    finishGamePanelSecondaryBtn = finishGamePanel.getByTestId("secondary-btn");
  });

  test("Restart button should open the finish game panel", async ({ page }) => {
    await buttonX.click();
    await vsPlayerBtn.click();

    await restartGameBtn.click();

    await expect(finishGamePanel).toBeVisible();
    await expect(finishGamePanelPrimaryText).toHaveText("restart game?");
    await expect(finishGamePanelAdditionalText).toHaveText("");

    await expect(finishGamePanelSecondaryBtn).toHaveText("no, cancel");
    await expect(finishGamePanelSecondaryBtn).toHaveClass(/secondaryBtn/);

    await expect(finishGamePanelPrimaryBtn).toHaveText("yes, restart");
    await expect(finishGamePanelPrimaryBtn).toHaveClass(/ctaBtn/);
  });

  test("After clicking 'NO, CANCEL' decision, game is continued", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem("xScore", "1");
      window.localStorage.setItem("tiesScore", "1");
      window.localStorage.setItem("oScore", "1");
    });
    page.reload();

    await buttonX.click();
    await vsPlayerBtn.click();

    await test.step("Make a move to set O's turn ", async () => {
      await expect(xTurnImg).toBeVisible();
      await gameFields.locator("button").nth(0).click();
    });

    await restartGameBtn.click();
    await finishGamePanelSecondaryBtn.click();

    await expect(finishGamePanel).not.toBeVisible();
    await expect(oTurnImg).toBeVisible();
    await expect(xScore).toHaveText("1");
    await expect(ties).toHaveText("1");
    await expect(oScore).toHaveText("1");
  });

  test("After clicking 'YES, RESTART', game is finished and menu window with default settings appears", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem("xScore", "1");
      window.localStorage.setItem("tiesScore", "1");
      window.localStorage.setItem("oScore", "1");
    });
    page.reload();

    await buttonO.click();
    await vsPlayerBtn.click();

    await test.step("Make a move to set O's turn ", async () => {
      await expect(xTurnImg).toBeVisible();
      await gameFields.locator("button").nth(0).click();
    });

    await restartGameBtn.click();
    await finishGamePanelPrimaryBtn.click();

    await expect(finishGamePanel).not.toBeVisible();
    await expect(gameBoard).not.toBeVisible();
    await expect(menuWindow).toBeVisible();
    await expect(buttonX).toHaveClass(/pickerActive/);

    await vsPlayerBtn.click();

    await expect(xScore).toHaveText("0");
    await expect(ties).toHaveText("0");
    await expect(oScore).toHaveText("0");
    await expect(xTurnImg).toBeVisible();

    const fields = await gameFields.locator("button").all();

    await test.step("All game fields are empty", async () => {
      for (const field of fields) {
        await expect(field.locator("img")).not.toBeVisible();
      }
    });
  });
});

test.describe("finish game", () => {
  let buttonX: Locator;
  let buttonO: Locator;
  let vsCpuBtn: Locator;
  let vsPlayerBtn: Locator;
  let restartGameBtn: Locator;
  let menuWindow: Locator;
  let gameBoard: Locator;
  let gameFields: Locator;
  let xTurnImg: Locator;
  let oTurnImg: Locator;
  let xScore: Locator;
  let oScore: Locator;
  let ties: Locator;
  let finishGamePanel: Locator;
  let finishGamePanelPrimaryText: Locator;
  let finishGamePanelAdditionalText: Locator;
  let finishGamePanelPrimaryBtn: Locator;
  let finishGamePanelSecondaryBtn: Locator;

  test.beforeEach(async ({ page }) => {
    await page.goto("/");

    buttonX = page.getByRole("button", { name: "x" });
    buttonO = page.getByRole("button", { name: "o" });
    vsCpuBtn = page.getByRole("button", { name: "NEW GAME (VS CPU)" });
    vsPlayerBtn = page.getByRole("button", { name: "NEW GAME (VS PLAYER)" });
    restartGameBtn = page.getByTestId("back-to-menu-btn");
    menuWindow = page.getByTestId("menu-window");
    gameBoard = page.getByTestId("game");
    gameFields = page.getByTestId("game-fields");
    xTurnImg = page.getByRole("img", { name: "x turn" });
    oTurnImg = page.getByRole("img", { name: "o turn" });
    xScore = page.getByTestId("x-score");
    oScore = page.getByTestId("o-score");
    ties = page.getByTestId("ties");
    finishGamePanel = page.getByTestId("finish-game-panel");
    finishGamePanelPrimaryText = page.getByTestId(
      "finish-game-panel-primary-text",
    );
    finishGamePanelAdditionalText = page.getByTestId(
      "finish-game-panel-additional-text",
    );
    finishGamePanelPrimaryBtn = finishGamePanel.getByTestId("primary-btn");
    finishGamePanelSecondaryBtn = finishGamePanel.getByTestId("secondary-btn");
  });

  test("finish game panel - tie", async ({ page }) => {
    await buttonX.click();
    await vsPlayerBtn.click();

    const field = gameFields.locator("button");

    await test.step("Play a round to achieve a tie (row 1: X O X, row 2: O O X, row 3: X X O)", async () => {
      await field.nth(0).click();
      await field.nth(1).click();
      await field.nth(2).click();
      await field.nth(3).click();
      await field.nth(5).click();
      await field.nth(4).click();
      await field.nth(7).click();
      await field.nth(8).click();
      await field.nth(6).click();
    });

    await test.step("Finish game panel has correct data - tie", async () => {
      await expect(finishGamePanel).toBeVisible();

      await expect(finishGamePanelPrimaryText).toHaveText("round tied");
      await expect(finishGamePanelAdditionalText).toHaveText("");

      await expect(finishGamePanelSecondaryBtn).toHaveText("quit");
      await expect(finishGamePanelSecondaryBtn).toHaveClass(/secondaryBtn/);

      await expect(finishGamePanelPrimaryBtn).toHaveText("next round");
      await expect(finishGamePanelPrimaryBtn).toHaveClass(/ctaBtn/);
    });

    await finishGamePanelPrimaryBtn.click();

    const fields = await gameFields.locator("button").all();

    await test.step("All game fields are empty", async () => {
      for (const field of fields) {
        await expect(field.locator("img")).not.toBeVisible();
      }
    });

    await expect(xScore).toHaveText("0");
    await expect(ties).toHaveText("1");
    await expect(oScore).toHaveText("0");
    await expect(oTurnImg).toBeVisible();

    await test.step("Play a round to achieve X's win (row 1: O O X, row 2: O X empty, row 3: X O X)", async () => {
      await field.nth(0).click();
      await field.nth(2).click();
      await field.nth(1).click();
      await field.nth(4).click();
      await field.nth(3).click();
      await field.nth(8).click();
      await field.nth(7).click();
      await field.nth(6).click();
      // (0, 2), (1,1), (2,0)
    });
    await finishGamePanelPrimaryBtn.click();

    await expect(xScore).toHaveText("1");
    await expect(ties).toHaveText("1");
    await expect(oScore).toHaveText("0");
    await expect(oTurnImg).toBeVisible();

    await test.step("Play a round to achieve O's win (row 1: O O O, row 2: O X X, row 3: X O X)", async () => {
      await field.nth(0).click();
      await field.nth(4).click();
      await field.nth(1).click();
      await field.nth(5).click();
      await field.nth(3).click();
      await field.nth(6).click();
      await field.nth(7).click();
      await field.nth(8).click();
      await field.nth(2).click();
    });

    await finishGamePanelSecondaryBtn.click();
    await vsPlayerBtn.click();

    await expect(xScore).toHaveText("0");
    await expect(ties).toHaveText("0");
    await expect(oScore).toHaveText("0");
    await expect(xTurnImg).toBeVisible();
  });

  test("finish game panel - x win", async ({ page }) => {
    await buttonO.click();
    await vsPlayerBtn.click();

    const field = gameFields.locator("button");

    await test.step("Play a round to achieve x's win (row 1: O O X, row 2: O X empty, row 3: X O X)", async () => {});
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

    await page.reload();

    await expect(gameFields).toBeVisible();
    await expect(gameField.nth(0).locator("img")).toHaveCount(1);
    await expect(gameField.nth(2).locator("img")).toHaveCount(1);
    await expect(gameField.nth(3).locator("img")).toHaveCount(1);
  });

  test("Game stats remain their value after refreshing", async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem("xScore", "5");
      window.localStorage.setItem("tiesScore", "13");
      window.localStorage.setItem("oScore", "4");
    });
    await page.reload();

    await vsPlayerBtn.click();
    await page.reload();

    await expect(xScore).toHaveText("5");
    await expect(ties).toHaveText("13");
    await expect(oScore).toHaveText("4");
  });

  test("Restart game panel does not disappear after refreshing", async ({
    page,
  }) => {
    await vsCpuBtn.click();

    const restartGameBtn = page.getByTestId("back-to-menu-btn");
    const finishGamePanel = page.getByTestId("finish-game-panel");

    await restartGameBtn.click();
    await expect(finishGamePanel).toBeVisible();

    await page.reload();
    await expect(finishGamePanel).toBeVisible();
  });

  test("Finish game panel does not disappear after refreshing", async ({
    page,
  }) => {
    await vsPlayerBtn.click();

    const finishGamePanel = page.getByTestId("finish-game-panel");
    await gameFields.locator("button").nth(0).click();
    await gameFields.locator("button").nth(3).click();
    await gameFields.locator("button").nth(1).click();
    await gameFields.locator("button").nth(4).click();
    await gameFields.locator("button").nth(2).click();

    await expect(finishGamePanel).toBeVisible();

    page.reload();
    await expect(finishGamePanel).toBeVisible();
  });
});

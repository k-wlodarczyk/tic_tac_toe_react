import { Locator, Page, expect } from "@playwright/test";

export class GamePage {
  readonly page: Page;
  readonly gameBoard: Locator;
  readonly gameFields: Locator;
  readonly xTurnImg: Locator;
  readonly oTurnImg: Locator;
  readonly restartGameBtn: Locator;
  readonly xScore: Locator;
  readonly oScore: Locator;
  readonly ties: Locator;

  constructor(page: Page) {
    this.page = page;
    this.gameBoard = page.getByTestId("game");
    this.gameFields = page.getByTestId("game-fields");
    this.xTurnImg = page.getByRole("img", { name: "x turn" });
    this.oTurnImg = page.getByRole("img", { name: "o turn" });
    this.restartGameBtn = page.getByTestId("back-to-menu-btn");
    this.xScore = page.getByTestId("x-score");
    this.oScore = page.getByTestId("o-score");
    this.ties = page.getByTestId("ties");
  }

  async makeMove(row: number, column: number) {
    const index = 3 * row + column;
    const field = this.gameFields.locator("button");
    await field.nth(index).click();
  }

  async makeMoves(moves: [number, number][]) {
    for (const [row, column] of moves) {
      await this.makeMove(row, column);
    }
  }

  async clickRestart() {
    await this.restartGameBtn.click();
  }

  async expectEmptyBoard() {
    await expect(this.gameFields.locator("img")).not.toBeVisible();
  }

  async expectMarkField(field: [number, number], mark: "x" | "o") {
    const [row, column] = field;
    const index = 3 * row + column;
    const gameField = this.gameFields.locator("button").nth(index);
    await expect(gameField.getByRole("img", { name: mark })).toBeVisible();
  }

  async shouldHaveStats(stats: { x: Number; ties: Number; o: Number }) {
    await expect(this.xScore).toHaveText(stats.x.toString());
    await expect(this.oScore).toHaveText(stats.o.toString());
    await expect(this.ties).toHaveText(stats.ties.toString());
  }

  async shouldBeCurrentTurn(turn: "x" | "o") {
    const activeTurn = turn === "x" ? this.xTurnImg : this.oTurnImg;
    const inactiveTurn = turn === "x" ? this.oTurnImg : this.xTurnImg;

    await expect(activeTurn).toBeVisible();
    await expect(inactiveTurn).not.toBeVisible();
  }
}

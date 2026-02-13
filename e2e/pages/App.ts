import { expect, Page, Locator } from "@playwright/test";
import { MenuPage } from "./MenuPage";
import { GamePage } from "./GamePage";

export class App {
  constructor(
    private menu: MenuPage,
    private game: GamePage,
  ) {}

  async shouldShowPanel(panel: "menu" | "game") {
    const show = panel === "menu" ? this.menu.menuWindow : this.game.gameBoard;
    const hide = panel === "menu" ? this.game.gameBoard : this.menu.menuWindow;

    await expect(show).toBeVisible();
    await expect(hide).not.toBeVisible();
  }
}

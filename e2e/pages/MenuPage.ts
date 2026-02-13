import { Locator, Page, expect } from "@playwright/test";

export class MenuPage {
  readonly page: Page;
  readonly menuWindow: Locator;
  readonly buttonX: Locator;
  readonly buttonO: Locator;
  readonly vsCpuBtn: Locator;
  readonly vsPlayerBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menuWindow = page.getByTestId("menu-window");
    this.buttonX = page.getByRole("button", { name: "x" });
    this.buttonO = page.getByRole("button", { name: "o" });
    this.vsCpuBtn = page.getByRole("button", { name: "NEW GAME (VS CPU)" });
    this.vsPlayerBtn = page.getByRole("button", {
      name: "NEW GAME (VS PLAYER)",
    });
  }

  async startGame(config: { player1: "x" | "o"; vs: "cpu" | "player" }) {
    const { player1, vs } = config;

    await this.selectMark(player1);
    await this.selectMode(vs);
  }

  async selectMark(mark: "x" | "o") {
    await (mark === "x" ? this.buttonX : this.buttonO).click();
  }

  async selectMode(mode: "cpu" | "player") {
    await (mode === "cpu" ? this.vsCpuBtn : this.vsPlayerBtn).click();
  }

  async shouldBeSelectedBtn(button: "x" | "o") {
    const active = button === "x" ? this.buttonX : this.buttonO;
    const inactive = button === "x" ? this.buttonO : this.buttonX;

    await expect(active).toHaveClass(/.*pickerActive.*/);
    await expect(inactive).not.toHaveClass(/pickerActive/);
  }
}

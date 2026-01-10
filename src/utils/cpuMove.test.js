import { expect, test, describe, vi } from "vitest";
import { getIndexMove } from "./cpuMove";

const EMPTY_BOARD = Array(9).fill(null);

describe("getIndexMove logic", () => {
  test("Occupy the middle if the board is empty", () => {
    // prettier-ignore
    const board = [...EMPTY_BOARD]

    expect(getIndexMove(board, "x")).toBe(4);
  });

  test("Occupy some corner if the middle is occupied", () => {
    // prettier-ignore
    const board = [
      null, null, null,
      null, 'x', null,
      null, null, null
    ]

    vi.spyOn(Math, "random").mockReturnValue(0);

    expect(getIndexMove(board, "x")).toBe(0);

    vi.restoreAllMocks();
  });

  test("Prioritize defending than occuping the middle", () => {
    // prettier-ignore
    const board = [
      "x", null, null,
       null, null, "o",
        "x", null, null];

    const playerFigure = "x";

    expect(getIndexMove(board, playerFigure)).toBe(3);
  });

  test("Prioritize finishing than defending", () => {
    // prettier-ignore
    const board = [
      'x', 'o', null,
      'x', 'o', null,
      null, null, null
    ];

    const playerFigure = "o";

    expect(getIndexMove(board, playerFigure)).toBe(6);
  });
});

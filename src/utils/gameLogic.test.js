import { expect, test, describe } from "vitest";
import { checkWinner } from "./gameLogic";

const EMPTY_BOARD = Array(9).fill(null);

describe("Check winner", () => {
  test("null when board is empty", () => {
    expect(checkWinner(EMPTY_BOARD)).toBe(null);
  });

  test("null after inserting first figure", () => {
    // prettier-ignore
    const board = [
      null, null, null,
      null, 'x', null,
      null, null, null
    ]

    expect(checkWinner(board)).toBe(null);
  });

  test("null after fullfilling the whole board and there is no winner", () => {
    // prettier-ignore
    const board = [
      'x', 'o', 'x',
      'x', 'o', 'x',
      'o', 'x', 'o'
    ];

    expect(checkWinner(board)).toBe(null);
  });

  test("winner in the first row", () => {
    // prettier-ignore
    const board = [
      "x", "x", "x",
      'x', 'o', null,
      'o', 'o', null
    ];

    expect(checkWinner(board)).toEqual({ winner: "x", path: [0, 1, 2] });
  });

  test("winner in the second row", () => {
    // prettier-ignore
    const board = [
      "x", "x", "o",
      'o', 'o', 'o',
      'x', null, 'x'
    ];

    expect(checkWinner(board)).toEqual({ winner: "o", path: [3, 4, 5] });
  });

  test("winner in the third row", () => {
    // prettier-ignore
    const board = [
      null, 'o', null,
      'o', 'x', 'o',
      'x', 'x', 'x'
    ];

    expect(checkWinner(board)).toEqual({ winner: "x", path: [6, 7, 8] });
  });

  test("winner in the first column", () => {
    // prettier-ignore
    const board = [
      'o', 'x', 'x',
      'o', null, 'x',
      'o', 'x', 'o'
    ];

    expect(checkWinner(board)).toEqual({ winner: "o", path: [0, 3, 6] });
  });

  test("winner in the second column", () => {
    // prettier-ignore
    const board = [
      'x', 'x', 'o',
      null, 'x', 'o',
      'o', 'x', null
    ];

    expect(checkWinner(board)).toEqual({ winner: "x", path: [1, 4, 7] });
  });

  test("winner in the third column", () => {
    // prettier-ignore
    const board = [
      'o', 'x', 'o',
      "x", 'x', 'o',
      'x', null, 'o'
    ];

    expect(checkWinner(board)).toEqual({ winner: "o", path: [2, 5, 8] });
  });

  test("winner in main diagonal", () => {
    // prettier-ignore
    const board = [
      'x', 'o', 'x',
      null, 'x', 'o',
      'o', null, 'x'
    ];

    expect(checkWinner(board)).toEqual({ winner: "x", path: [0, 4, 8] });
  });

  test("winner in anti diagonal", () => {
    // prettier-ignore
    const board = [
      'x', 'x', 'o',
      'x', 'o', 'x',
      'o', 'o', null
    ];

    expect(checkWinner(board)).toEqual({ winner: "o", path: [2, 4, 6] });
  });

  test("winner in last move", () => {
    // prettier-ignore
    const board = [
      'x', 'x', 'o',
      'o', 'x', 'o',
      'x', 'o', 'x'
    ];

    expect(checkWinner(board)).toEqual({ winner: "x", path: [0, 4, 8] });
  });
});

describe("Check winner - validation", () => {
  test("Game board with not enough fields", () => {
    const board = ["x", "x", "x"];

    expect(checkWinner(board)).toBe(null);
  });

  test("Game board with too many fields", () => {
    // prettier-ignore
    const board = [
      'x', 'x', 'o',
      'o', 'o', 'o',
      'x', 'x', 'o',
      'x'
    ]

    expect(checkWinner(board)).toBe(null);
  });

  test("Game board accept only lower case figures", () => {
    const board = ["X", "X", "O", "O", "O", "O", "X", null, "X"];

    expect(checkWinner(board)).toBe(null);
  });

  test("should ignore invalid symbols on board", () => {
    // prettier-ignore
    const boardWithNoise = [
      'X', 'X', 'X',
      null, null, null,
      null, null, null
    ];

    expect(checkWinner(boardWithNoise)).toBe(null);
  });
});

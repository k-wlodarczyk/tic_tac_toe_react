export const WINNING_PATHS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const checkWinner = function (fields) {
  for (const [a, b, c] of WINNING_PATHS) {
    if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
      return fields[a];
    }
  }
  return null;
};

export const isDraw = function (fields) {
  return !checkWinner(fields) && fields.every((field) => field !== null);
};

export const getLabel = function (figure, player1Figure, vsCpu) {
  return vsCpu
    ? player1Figure === figure
      ? "you"
      : "cpu"
    : player1Figure === figure
    ? "player 1"
    : "player 2";
};

export const getEndGameProps = function (
  winner,
  draw,
  vsCpu,
  player1Figure,
  playerXLabel,
  playerOLabel
) {
  if (draw) {
    return { primaryText: "round tied", additionalText: "" };
  }
  if (winner && vsCpu && player1Figure === winner) {
    return { primaryText: "takes the round", additionalText: "you won!" };
  }

  if (winner && vsCpu && player1Figure !== winner) {
    return {
      primaryText: "takes the round",
      additionalText: "oh no, you lost...",
    };
  }

  if (winner && !vsCpu && winner === "x") {
    return {
      primaryText: "takes the round",
      additionalText: `${playerXLabel} wins!`,
    };
  }

  if (winner && !vsCpu && winner === "o") {
    return {
      primaryText: "takes the round",
      additionalText: `${playerOLabel} wins!`,
    };
  }

  return null;
};

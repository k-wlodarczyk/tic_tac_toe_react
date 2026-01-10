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

const BOARD_SIZE = 9;

export const checkWinner = function (fields) {
  if (fields.length !== BOARD_SIZE || !areCorrectFields(fields)) return null;

  for (const [a, b, c] of WINNING_PATHS) {
    if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
      return { winner: fields[a], path: [a, b, c] };
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

  if (!winner) {
    return null;
  }

  let additionalText = "";

  if (vsCpu) {
    additionalText =
      player1Figure === winner ? "you won!" : "oh no, you lost...";
  } else {
    additionalText =
      winner === "x" ? `${playerXLabel} wins!` : `${playerOLabel} wins!`;
  }

  return { primaryText: "takes the round", additionalText };
};

const areCorrectFields = function (fields) {
  const allCorrectFields = fields.every(
    (field) => field === "x" || field === "o" || field === null
  );
  return allCorrectFields;
};

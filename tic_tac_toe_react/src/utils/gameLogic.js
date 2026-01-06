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

import { WINNING_PATHS } from "./gameLogic";

const CORNERS = [0, 2, 6, 8];
const MIDDLE = 4;

const checkWinOpportunities = function (availableFields, cpuFields) {
  for (const path of WINNING_PATHS) {
    const occupiedByCpu = path.filter((index) => cpuFields.includes(index));
    if (occupiedByCpu.length === 2) {
      const remainingElementIndex = path.find(
        (pathElement) => !cpuFields.includes(pathElement)
      );

      if (availableFields.includes(remainingElementIndex))
        return remainingElementIndex;
    }
  }

  return null;
};

const getFields = function (fields, condition) {
  const calculatedFields = fields.reduce((acc, field, index) => {
    if (field === condition) acc.push(index);
    return acc;
  }, []);

  return calculatedFields;
};

export const getIndexMove = function (fields, player1Figure) {
  const cpuFigure = player1Figure === "x" ? "o" : "x";

  const playerFields = getFields(fields, player1Figure);
  const cpuFields = getFields(fields, cpuFigure);

  const availableFields = getFields(fields, null);

  const winningMoveIndex = checkWinOpportunities(availableFields, cpuFields);
  const defenseMoveIndex = checkWinOpportunities(availableFields, playerFields);

  if (winningMoveIndex) {
    return winningMoveIndex;
  } else if (defenseMoveIndex) {
    return defenseMoveIndex;
  }

  if (availableFields.includes(MIDDLE)) {
    return MIDDLE;
  }

  const availableCorners = CORNERS.filter((cornerIndex) =>
    availableFields.includes(cornerIndex)
  );

  if (availableCorners.length > 0) {
    const randomCornerIndex = Math.floor(
      Math.random() * availableCorners.length
    );
    return availableCorners[randomCornerIndex];
  }

  if (fields.every((field) => field === null)) {
    return Math.floor(Math.random() * fields.length);
  } else {
    const randomIndex = Math.floor(Math.random() * availableFields.length);
    return availableFields[randomIndex];
  }
};

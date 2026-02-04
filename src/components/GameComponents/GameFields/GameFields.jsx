import GameField from "../GameField/GameField";
import styles from "./GameFields.module.css";

export default function GameFields({
  activePlayer,
  gameFields,
  winningPath,
  isCpuTurn,
  onFieldClick,
}) {
  return (
    <div className={styles.gameFields} data-testid="game-fields">
      {gameFields.map((gameField, index) => (
        <GameField
          key={index}
          value={gameField}
          onSelect={() => onFieldClick(index)}
          activePlayer={activePlayer}
          isCpuTurn={isCpuTurn}
          isWinningPathField={winningPath.includes(index)}
        />
      ))}
    </div>
  );
}

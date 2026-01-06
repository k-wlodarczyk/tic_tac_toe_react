import GameField from "../GameField/GameField";
import styles from "./GameFields.module.css";
import { useState } from "react";

export default function GameFields({
  activePlayer,
  gameFields,
  winningPath,
  onFieldClick,
}) {
  // const [gameFields, setGameFields] = useState(Array(9).fill(null));
  // const [activePlayer, setActivePlayer] = useState("x");

  return (
    <div className={styles.gameFields}>
      {gameFields.map((gameField, index) => (
        <GameField
          key={index}
          value={gameField}
          onSelect={() => onFieldClick(index)}
          activePlayer={activePlayer}
          isWinningPathField={winningPath.includes(index)}
        />
      ))}
    </div>
  );
}

import GameField from "../GameField/GameField";
import styles from "./GameFields.module.css";
import { useState } from "react";

export default function GameFields() {
  const [gameFields, setGameFields] = useState(Array(9).fill(null));

  return (
    <div className={styles.gameFields}>
      {gameFields.map((gameField, index) => (
        <GameField key={index} value={gameField} />
      ))}
    </div>
  );
}

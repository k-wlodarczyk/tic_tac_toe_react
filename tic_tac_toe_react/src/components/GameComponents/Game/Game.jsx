import GameBoard from "../GameBoard/GameBoard";
import styles from "./Game.module.css";
import GameHeader from "../GameHeader/GameHeader";
import { useState } from "react";

export default function Game() {
  const [activePlayer, setActivePlayer] = useState("x");
  const [gameFields, setGameFields] = useState(Array(9).fill(null));

  function handleFieldClick(index) {
    if (gameFields[index]) return;
    const nextFields = [...gameFields];
    nextFields[index] = activePlayer;
    setGameFields(nextFields);

    activePlayer === "x" ? setActivePlayer("o") : setActivePlayer("x");
  }

  return (
    <section className={styles.game} data-cy="game">
      <GameHeader activePlayer={activePlayer} />
      <GameBoard
        activePlayer={activePlayer}
        gameFields={gameFields}
        onFieldClick={handleFieldClick}
      />
    </section>
  );
}

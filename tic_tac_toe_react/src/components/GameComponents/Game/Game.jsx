import GameBoard from "../GameBoard/GameBoard";
import styles from "./Game.module.css";
import GameHeader from "../GameHeader/GameHeader";
import { use, useState } from "react";

export default function Game({
  onReset,
  gameFields,
  activePlayer,
  onFieldClick,
  children,
}) {
  return (
    <section className={styles.game} data-cy="game">
      <GameHeader activePlayer={activePlayer} onReset={onReset} />
      <GameBoard
        activePlayer={activePlayer}
        gameFields={gameFields}
        onFieldClick={onFieldClick}
      />
      {children}
    </section>
  );
}

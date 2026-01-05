import GameBoard from "../GameBoard/GameBoard";

import styles from "./Game.module.css";

import GameHeader from "../GameHeader/GameHeader";

export default function Game() {
  return (
    <section className={styles.game} data-cy="game">
      <GameHeader />
      <GameBoard />
    </section>
  );
}

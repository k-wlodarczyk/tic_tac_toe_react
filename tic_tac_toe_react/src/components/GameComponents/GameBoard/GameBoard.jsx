import GameFields from "../GameFields/GameFields";
import GameStats from "../GameStats/GameStats";
import styles from "./GameBoard.module.css";

export default function GameBoard({ activePlayer, gameFields, onFieldClick }) {
  return (
    <section className={styles.gameBoard}>
      <GameFields
        activePlayer={activePlayer}
        gameFields={gameFields}
        onFieldClick={onFieldClick}
      />
      <GameStats />
    </section>
  );
}

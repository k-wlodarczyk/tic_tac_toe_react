import GameFields from "../GameFields/GameFields";
import GameStats from "../GameStats/GameStats";
import styles from "./GameBoard.module.css";

export default function GameBoard({
  activePlayer,
  gameFields,
  player1Figure,
  playerXLabel,
  playerOLabel,
  xScore,
  oScore,
  tiesScore,
  onFieldClick,
}) {
  return (
    <section className={styles.gameBoard}>
      <GameFields
        activePlayer={activePlayer}
        gameFields={gameFields}
        onFieldClick={onFieldClick}
      />
      <GameStats
        player1Figure={player1Figure}
        playerXLabel={playerXLabel}
        playerOLabel={playerOLabel}
        xScore={xScore}
        oScore={oScore}
        tiesScore={tiesScore}
      />
    </section>
  );
}

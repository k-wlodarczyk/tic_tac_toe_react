import GameBoard from "../GameBoard/GameBoard";
import styles from "./Game.module.css";
import GameHeader from "../GameHeader/GameHeader";

export default function Game({
  onReset,
  gameFields,
  activePlayer,
  player1Figure,
  playerXLabel,
  playerOLabel,
  xScore,
  oScore,
  tiesScore,
  onFieldClick,
  children,
}) {
  return (
    <section className={styles.game} data-cy="game">
      <GameHeader activePlayer={activePlayer} onReset={onReset} />
      <GameBoard
        activePlayer={activePlayer}
        gameFields={gameFields}
        player1Figure={player1Figure}
        playerXLabel={playerXLabel}
        playerOLabel={playerOLabel}
        xScore={xScore}
        oScore={oScore}
        tiesScore={tiesScore}
        onFieldClick={onFieldClick}
      />
      {children}
    </section>
  );
}

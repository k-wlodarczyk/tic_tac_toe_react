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
      {/* <section className="end-game-panel">
        <div className="end-decision-btns">
          <button className="end-decision-btn heading-xs end-decision-btn-quit">
            QUIT
          </button>
          <button className="end-decision-btn heading-xs end-decision-btn-next-round">
            NEXT ROUND
          </button>
        </div>
      </section>
      <section className="reset-game-panel">
        <div className="reset-game-btns">
          <button className="reset-game-btn-decision heading-xs reset-game-btn-decision-no">
            NO, CANCEL
          </button>
          <button className="reset-game-btn-decision heading-xs reset-game-btn-decision-yes">
            YES, RESTART
          </button>
        </div>
      </section> */}
    </section>
  );
}

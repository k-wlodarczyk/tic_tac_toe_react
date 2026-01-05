import NewGameButton from "../NewGameButton/NewGameButton";
import styles from "./NewGameButtons.module.css";

export default function NewGameButtons({ onGameStart }) {
  return (
    <div className={styles.btnsNewGameSection} data-cy="btns-new-game-section">
      <NewGameButton onGameStart={onGameStart} vsCpu={true}>
        NEW GAME (VS CPU)
      </NewGameButton>
      <NewGameButton onGameStart={onGameStart} vsCpu={false}>
        NEW GAME (VS PLAYER)
      </NewGameButton>
    </div>
  );
}

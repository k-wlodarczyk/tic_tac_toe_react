import NewGameButton from "../NewGameButton/NewGameButton";
import styles from "./NewGameButtons.module.css";

export default function NewGameButtons({
  onGameStartVsCpu,
  onGameStartVsPlayer,
}) {
  return (
    <div className={styles.btnsNewGameSection}>
      <NewGameButton onClick={onGameStartVsCpu} vsCpu={true}>
        NEW GAME (VS CPU)
      </NewGameButton>
      <NewGameButton onClick={onGameStartVsPlayer} vsCpu={false}>
        NEW GAME (VS PLAYER)
      </NewGameButton>
    </div>
  );
}

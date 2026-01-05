import NewGameButton from "../NewGameButton/NewGameButton";
import styles from "./NewGameButtons.module.css";

export default function NewGameButtons() {
  return (
    <div className={styles.btnsNewGameSection} data-cy="btns-new-game-section">
      <NewGameButton vsCpu={true}>NEW GAME (VS CPU)</NewGameButton>
      <NewGameButton vsCpu={false}>NEW GAME (VS PLAYER)</NewGameButton>
    </div>
  );
}

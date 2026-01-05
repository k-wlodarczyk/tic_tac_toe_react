import NewGameButtons from "../NewGameButtons/NewGameButtons";
import PickPlayerWindow from "../PickPlayerWindow/PickPlayerWindow";
import styles from "./MenuWindow.module.css";
import logo from "../../../assets/logo.svg";

export default function MenuWindow({
  player1Figure,
  onPlayer1FigureChange,
  onGameStart,
}) {
  return (
    <section className={styles.menuWindow} data-cy="menu-window">
      <div className={styles.logoSection}>
        <img src={logo} alt="Tic Tac Toe logo" className="logo-img" />
      </div>
      <PickPlayerWindow
        player1Figure={player1Figure}
        onPlayer1FigureChange={onPlayer1FigureChange}
      />
      <NewGameButtons onGameStart={onGameStart} />
    </section>
  );
}

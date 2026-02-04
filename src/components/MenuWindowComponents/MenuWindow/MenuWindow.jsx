import NewGameButtons from "../NewGameButtons/NewGameButtons";
import PickPlayerWindow from "../PickPlayerWindow/PickPlayerWindow";
import styles from "./MenuWindow.module.css";
import logo from "../../../assets/logo.svg";

export default function MenuWindow({
  player1Figure,
  onPlayer1setX,
  onPlayer1setO,
  onGameStartVsCpu,
  onGameStartVsPlayer,
}) {
  return (
    <section className={styles.menuWindow} data-testid="menu-window">
      <div className={styles.logoSection}>
        <img src={logo} alt="Tic Tac Toe logo" className="logo-img" />
      </div>
      <PickPlayerWindow
        player1Figure={player1Figure}
        onPlayer1setX={onPlayer1setX}
        onPlayer1setO={onPlayer1setO}
      />
      <NewGameButtons
        onGameStartVsCpu={onGameStartVsCpu}
        onGameStartVsPlayer={onGameStartVsPlayer}
      />
    </section>
  );
}

import CurrentTurn from "../CurrentTurn/CurrentTurn";
import ResetGameBtn from "../ResetGameBtn/ResetGameBtn";
import logo from "../../../assets/logo.svg";
import styles from "./GameHeader.module.css";

export default function GameHeader({ activePlayer, onReset }) {
  return (
    <section className={styles.gameHeaderSection}>
      <img src={logo} alt="" className={styles.logo} />
      <CurrentTurn activePlayer={activePlayer} />
      <ResetGameBtn onReset={onReset} />
    </section>
  );
}

import NewGameButtons from "../NewGameButtons/NewGameButtons";
import PickPlayerWindow from "../PickPlayerWindow/PickPlayerWindow";
import styles from "./MenuWindow.module.css";
import logo from "../../../assets/logo.svg";

export default function MenuWindow() {
  return (
    <section className={styles.menuWindow} data-cy="menu-window">
      <div className={styles.logoSection}>
        <img src={logo} alt="Tic Tac Toe logo" className="logo-img" />
      </div>
      <PickPlayerWindow />
      <NewGameButtons />
    </section>
  );
}

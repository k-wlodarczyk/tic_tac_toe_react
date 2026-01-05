import XOPicker from "../XOPicker/XOPicker";
import styles from "./PickPlayerWindow.module.css";

export default function PickPlayerWindow() {
  return (
    <div className={styles.pickPlayerWindow} data-cy="pick-player-window">
      <p className={`heading-xs ${styles.menuText}`}>PICK PLAYER 1'S MARK</p>
      <XOPicker />

      <p className="paragraph-text menuText menuTextReminder">
        REMEMBER : X GOES FIRST
      </p>
    </div>
  );
}
